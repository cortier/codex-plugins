import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));
const fail = (message) => { throw new Error(message); };

const marketplace = readJson(join(root, '.agents', 'plugins', 'marketplace.json'));
if (marketplace.name !== 'cortier') fail('Marketplace name must be cortier');
if (!Array.isArray(marketplace.plugins) || marketplace.plugins.length === 0) fail('Marketplace must contain plugins');
const readme = readFileSync(join(root, 'README.md'), 'utf8');
if (/BEGIN GENERATED INSTALLATION|## Install|plugins\.cortier\.com\/design/.test(readme)) fail('README must not contain installation guidance');
for (const plugin of marketplace.plugins) {
  if (plugin.source?.source !== 'local' || typeof plugin.source.path !== 'string') fail(`Invalid marketplace entry: ${plugin.name}`);
  const pluginDirectory = join(process.cwd(), plugin.source.path);
  const pluginManifest = readJson(join(pluginDirectory, '.codex-plugin', 'plugin.json'));
  if (pluginManifest.name !== plugin.name) fail(`Manifest name does not match marketplace entry: ${plugin.name}`);
  if (!existsSync(join(pluginDirectory, 'installation.json')) || !existsSync(join(pluginDirectory, 'INSTALL.md'))) fail(`Installation guidance is missing: ${plugin.name}`);
  if (!existsSync(join(root, 'launcher', 'generated', `${plugin.name}.ts`))) fail(`Generated launcher prompt is missing: ${plugin.name}`);
}
const entry = marketplace.plugins?.find((plugin) => plugin.name === 'cortier-design');
if (!entry || entry.source?.source !== 'local' || entry.source?.path !== './plugins/cortier-design') fail('Invalid Cortier Design marketplace entry');
const pluginRoot = join(root, entry.source.path);

const manifest = readJson(join(pluginRoot, '.codex-plugin', 'plugin.json'));
if (manifest.name !== 'cortier-design' || manifest.mcpServers !== './.mcp.json') fail('Invalid plugin manifest');
if ('apps' in manifest || existsSync(join(pluginRoot, '.app.json'))) fail('Third-party app assets must not be bundled');

const mcp = readJson(join(pluginRoot, '.mcp.json'));
if (JSON.stringify(mcp) !== JSON.stringify({ mcpServers: { 'cortier-design': { url: 'https://mcp.cortier.com/mcp/design' } } })) fail('Only the Cortier Design MCP may be bundled');
if (!existsSync(join(pluginRoot, 'assets', 'cortier.jpeg'))) fail('Cortier logo is missing');

const files = (directory) => readdirSync(directory).flatMap((name) => {
  const path = join(directory, name);
  return statSync(path).isDirectory() ? files(path) : [path];
});
const forbidden = /\b(?:react|storybook|ddev|git|repository|code|engineering|implementation|route|ui-contract|script)\b/i;
for (const path of files(join(pluginRoot, 'skills'))) {
  if (path.endsWith('.md') && forbidden.test(readFileSync(path, 'utf8'))) fail(`Engineering terminology found in ${path}`);
}

const install = readFileSync(join(pluginRoot, 'INSTALL.md'), 'utf8').trim();
for (const required of ['cortier/codex-plugins', 'Cortier Design', 'Figma', 'Mobbin', 'media@cortier.com', 'OAuth', 'lista de herramientas MCP']) {
  if (!install.includes(required)) fail(`INSTALL.md is missing: ${required}`);
}
const installation = readJson(join(pluginRoot, 'installation.json'));
if (!Array.isArray(installation.dependencies) || installation.dependencies.length !== 2) fail('Invalid Cortier Design installation metadata');
const launcherPrompt = readFileSync(join(root, 'launcher', 'generated', 'cortier-design.ts'), 'utf8');
if (!launcherPrompt.includes('codex://new?prompt=Begin+in+Spanish') || !launcherPrompt.includes('Set+up+the+complete+Cortier+Design+environment')) fail('Launcher installation prompt is invalid');

console.log('Marketplace, plugin, designer-only skills, installation metadata, and generated guidance are valid.');
