import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const pluginRoot = join(root, 'plugins', 'cortier-design');
const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));
const fail = (message) => { throw new Error(message); };

const marketplace = readJson(join(root, '.agents', 'plugins', 'marketplace.json'));
if (marketplace.name !== 'cortier') fail('Marketplace name must be cortier');
const entry = marketplace.plugins?.find((plugin) => plugin.name === 'cortier-design');
if (!entry || entry.source?.source !== 'local' || entry.source?.path !== './plugins/cortier-design') fail('Invalid Cortier Design marketplace entry');

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

const install = readFileSync(join(root, 'INSTALL.md'), 'utf8').trim();
if (install.includes('\n\n') || install.startsWith('#')) fail('INSTALL.md must contain only one installation prompt');
for (const required of ['cortier/codex-plugins', 'Cortier Design', 'Figma', 'Mobbin', 'authentication', 'read-only', 'all three']) {
  if (!install.includes(required)) fail(`INSTALL.md is missing: ${required}`);
}

console.log('Marketplace, plugin, designer-only skills, and installation prompt are valid.');
