#!/usr/bin/env node
import { App, DefaultStackSynthesizer, RemovalPolicy, Stack, Tags } from 'aws-cdk-lib';
import { Certificate, CertificateValidation } from 'aws-cdk-lib/aws-certificatemanager';
import { DomainName, HttpApi } from 'aws-cdk-lib/aws-apigatewayv2';
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import { Architecture, LoggingFormat, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { ApiGatewayv2DomainProperties } from 'aws-cdk-lib/aws-route53-targets';

class PluginsLauncherStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const logGroup = new LogGroup(this, 'Logs', {
      logGroupName: '/aws/lambda/cortier-plugins-launcher',
      retention: RetentionDays.ONE_MONTH,
      removalPolicy: RemovalPolicy.DESTROY,
    });
    const launcher = new NodejsFunction(this, 'Launcher', {
      functionName: 'cortier-plugins-launcher',
      entry: 'launcher/handler.ts',
      runtime: Runtime.NODEJS_22_X,
      architecture: Architecture.ARM_64,
      memorySize: 128,
      loggingFormat: LoggingFormat.JSON,
      logGroup,
    });

    const zone = HostedZone.fromHostedZoneAttributes(this, 'ExistingZone', {
      hostedZoneId: 'Z08239453D3DDLT8ZQEWN',
      zoneName: 'cortier.com',
    });
    const certificate = new Certificate(this, 'Certificate', {
      domainName: 'plugins.cortier.com',
      validation: CertificateValidation.fromDns(zone),
    });
    const domain = new DomainName(this, 'Domain', {
      domainName: 'plugins.cortier.com',
      certificate,
    });
    new HttpApi(this, 'Api', {
      apiName: 'cortier-plugins-launcher',
      defaultIntegration: new HttpLambdaIntegration('Integration', launcher),
      defaultDomainMapping: { domainName: domain },
    });
    new ARecord(this, 'Dns', {
      zone,
      recordName: 'plugins',
      target: RecordTarget.fromAlias(new ApiGatewayv2DomainProperties(domain.regionalDomainName, domain.regionalHostedZoneId)),
    });
  }
}

const app = new App();
const stack = new PluginsLauncherStack(app, 'cortier-plugins-launcher', {
  env: { account: '428692811555', region: 'us-west-1' },
  synthesizer: new DefaultStackSynthesizer({ qualifier: 'ctrplug01' }),
  terminationProtection: true,
});
Tags.of(stack).add('project', 'cobrofacil');
