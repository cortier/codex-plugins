Set up the complete Cortier Design environment.

Add the public Cortier plugin marketplace from `https://github.com/cortier/codex-plugins` using its default branch. Install and enable every plugin in this list:

- Cortier Design — install from the Cortier marketplace.
  - User instruction: The media@cortier.com account must be used to authenticate to the MCP server.
- Figma — install from the Plugins Directory.
  - User instruction: The media@cortier.com account must be used to authenticate to the MCP server.
- Mobbin — install from the Plugins Directory.
  - User instruction: The media@cortier.com account must be used to authenticate to the MCP server.

The instructions beneath each plugin are requirements to communicate to the user at the relevant point in setup. Explain them in clear, simple language. Do not present technical implementation details, select an account for the user, or treat the user's account as an account the agent controls.

Initiate every required OAuth flow and wait for the user to complete each provider-controlled authorization interaction before continuing. After each OAuth flow returns control, verify the connection before proceeding. When authentication is complete, list the MCP tools of every installed plugin. Report installation complete only if all 3 plugins are installed and enabled, every required connection is authenticated, and all tools have been listed. Otherwise, identify the incomplete plugin and continue its setup.
