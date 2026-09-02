import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const marketplacePath = join(root, '.agents', 'plugins', 'marketplace.json');
const templatePath = join(root, 'templates', 'INSTALL.md');
const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));
const fail = (message) => { throw new Error(message); };
const assertKeys = (value, allowed, label) => {
  for (const key of Object.keys(value)) if (!allowed.includes(key)) fail(`${label} contains unknown field: ${key}`);
};
const assertUserInstructions = (value, label) => {
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string' || item.trim() === '')) fail(`${label}.userInstructions must contain only nonempty strings`);
};

const marketplace = readJson(marketplacePath);
const template = readFileSync(templatePath, 'utf8').trim();
const generated = [];

for (const entry of marketplace.plugins ?? []) {
  if (entry.source?.source !== 'local' || typeof entry.source.path !== 'string') fail(`Plugin ${entry.name} must use a local marketplace source`);
  const pluginRoot = join(root, entry.source.path);
  const manifest = readJson(join(pluginRoot, '.codex-plugin', 'plugin.json'));
  const installationPath = join(pluginRoot, 'installation.json');
  if (!existsSync(installationPath)) fail(`Missing installation metadata for ${entry.name}`);
  const installation = readJson(installationPath);
  assertKeys(installation, ['primary', 'dependencies'], `${entry.name} installation metadata`);
  if (!installation.primary || typeof installation.primary !== 'object' || Array.isArray(installation.primary)) fail(`${entry.name}.primary must be an object`);
  assertKeys(installation.primary, ['userInstructions'], `${entry.name}.primary`);
  assertUserInstructions(installation.primary.userInstructions, `${entry.name}.primary`);
  if (!Array.isArray(installation.dependencies)) fail(`${entry.name}.dependencies must be an array`);

  const primaryName = manifest.interface?.displayName;
  if (typeof primaryName !== 'string' || primaryName.trim() === '') fail(`${entry.name} manifest must define interface.displayName`);
  const plugins = [{ name: primaryName, source: 'the Cortier marketplace', ...installation.primary }];
  for (const [index, dependency] of installation.dependencies.entries()) {
    if (!dependency || typeof dependency !== 'object' || Array.isArray(dependency)) fail(`${entry.name}.dependencies[${index}] must be an object`);
    assertKeys(dependency, ['name', 'userInstructions'], `${entry.name}.dependencies[${index}]`);
    if (typeof dependency.name !== 'string' || dependency.name.trim() === '') fail(`${entry.name}.dependencies[${index}].name must be a nonempty string`);
    assertUserInstructions(dependency.userInstructions, `${entry.name}.dependencies[${index}]`);
    plugins.push({ name: dependency.name.trim(), source: 'the Plugins Directory', userInstructions: dependency.userInstructions });
  }

  const pluginList = plugins.map((plugin) => [
    `- ${plugin.name} — install from ${plugin.source}.`,
    ...plugin.userInstructions.map((instruction) => `  - User instruction: ${instruction.trim()}`),
  ].join('\n')).join('\n');
  const prompt = template
    .replaceAll('{{PRIMARY_PLUGIN_NAME}}', primaryName.trim())
    .replaceAll('{{PLUGIN_LIST}}', pluginList)
    .replaceAll('{{PLUGIN_COUNT}}', String(plugins.length));
  if (/{{[A-Z0-9_]+}}/.test(prompt)) fail(`Unresolved template placeholder for ${entry.name}`);

  const installPath = join(pluginRoot, 'INSTALL.md');
  writeFileSync(installPath, `${prompt}\n`);
  const url = new URL('codex://new');
  url.searchParams.set('prompt', prompt);
  const launchUrl = `https://cortier.github.io/codex-plugins/launch.html#${encodeURIComponent(url.toString())}`;
  if (launchUrl.length > 4000) fail(`Installation link for ${entry.name} exceeds 4000 characters`);
  generated.push({ displayName: primaryName.trim(), installPath: `plugins/${entry.name}/INSTALL.md`, url: launchUrl });
}

const beginMarker = '<!-- BEGIN GENERATED INSTALLATION -->';
const endMarker = '<!-- END GENERATED INSTALLATION -->';
const installationSection = [
  beginMarker,
  '## Install',
  '',
  ...generated.flatMap((plugin) => [
    `[Install ${plugin.displayName}](${plugin.url})`,
    '',
    `If the button does not open Codex, copy the prompt from [${plugin.displayName} installation instructions](./${plugin.installPath}) into a new Codex conversation.`,
    '',
  ]),
  endMarker,
].join('\n').trimEnd();

const readmePath = join(root, 'README.md');
const initialReadme = `# Cortier Codex Plugins\n\nPublic marketplace for Cortier plugins.\n\n${beginMarker}\n${endMarker}\n`;
const currentReadme = existsSync(readmePath) ? readFileSync(readmePath, 'utf8') : initialReadme;
const beginIndex = currentReadme.indexOf(beginMarker);
const endIndex = currentReadme.indexOf(endMarker);
if (beginIndex === -1 || endIndex === -1 || endIndex < beginIndex) fail('README.md must contain one valid generated installation marker pair');
if (currentReadme.indexOf(beginMarker, beginIndex + beginMarker.length) !== -1 || currentReadme.indexOf(endMarker, endIndex + endMarker.length) !== -1) fail('README.md contains duplicate generated installation markers');
const readme = `${currentReadme.slice(0, beginIndex)}${installationSection}${currentReadme.slice(endIndex + endMarker.length)}`.trimEnd();

mkdirSync(dirname(readmePath), { recursive: true });
writeFileSync(readmePath, `${readme}\n`);
console.log(`Generated ${generated.length} installation prompt${generated.length === 1 ? '' : 's'} and README link${generated.length === 1 ? '' : 's'}.`);
