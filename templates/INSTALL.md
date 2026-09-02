Set up the complete {{PRIMARY_PLUGIN_NAME}} environment.

First inspect the current plugin marketplaces, installed and enabled plugins, and connection status. Treat this setup as idempotent: preserve anything that is already correctly configured and change only what is missing, disabled, invalid, or expired.

Ensure the public Cortier plugin marketplace from `https://github.com/cortier/codex-plugins` is available from its default branch. Add it only if it is missing. For every plugin in this list, keep an installed and enabled plugin unchanged, install it only if missing, and enable it only if disabled. Do not uninstall or reinstall a correctly installed plugin:

{{PLUGIN_LIST}}

The instructions beneath each plugin are requirements to communicate to the user at the relevant point in setup. Explain them in clear, simple language. Do not present technical implementation details, select an account for the user, or treat the user's account as an account the agent controls.

Keep every valid authenticated connection unchanged. Initiate OAuth only for a connection that is missing, invalid, or expired, and wait for the user to complete each provider-controlled authorization interaction before continuing. After each OAuth flow returns control, verify the connection before proceeding. When authentication is complete, list the MCP tools of every installed plugin. Report installation complete only if all {{PLUGIN_COUNT}} plugins are installed and enabled, every required connection is authenticated, and all tools have been listed. Otherwise, identify the incomplete plugin and continue its setup.
