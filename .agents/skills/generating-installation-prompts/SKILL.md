---
name: generating-installation-prompts
description: Regenerate Cortier plugin installation prompts and README links whenever installation templates, plugin installation metadata, authentication guidance, dependency notes, or other setup instructions change.
---

# Generate Installation Prompts

Installation guidance is generated from `templates/INSTALL.md`, each marketplace plugin's `installation.json`, and its manifest metadata.

Whenever a task changes installation guidance or any input that affects it, run this command from the repository root after making the source edit:

```text
npm run generate
```

Treat these as generator inputs:

- `templates/INSTALL.md`
- `plugins/*/installation.json`
- Plugin display names in `.codex-plugin/plugin.json`
- Marketplace plugin entries or source paths
- Any authentication, dependency, account, or user-facing setup guidance

Review the resulting `plugins/*/INSTALL.md` and `README.md` changes and include them with the source change. Do not edit generated installation prompts or README installation links directly; update their source inputs and regenerate them.
