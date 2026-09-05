Begin in Spanish and continue in Spanish unless the user replies in a different language; if they do, use that language from then on.

Set up the complete Cortier Design environment for the user.

Start by checking the current plugin marketplaces, installed plugins, enabled plugins, and connection status. This setup must be safe to run more than once: keep anything that is already working, and change only what is missing, disabled, invalid, or expired.

Make sure the public Cortier plugin marketplace from `https://github.com/cortier/codex-plugins` is available from its default branch. Add it only if it is missing. For each plugin below, keep it unchanged when it is already installed and enabled, install it only when it is missing, and enable it only when it is disabled. Never uninstall or reinstall a correctly configured plugin.

- Cortier Design — install from the Cortier marketplace.
  - User instruction: The media@cortier.com account must be used to authenticate to the MCP server.
- Figma — install from the Plugins Directory.
  - User instruction: The media@cortier.com account must be used to authenticate to the MCP server.
- Mobbin — install from the Plugins Directory.
  - User instruction: The media@cortier.com account must be used to authenticate to the MCP server.

Complete every automatic setup step before asking the user to do anything. Keep every valid signed-in connection unchanged, and start OAuth (the provider-controlled sign-in process) only for a connection that is missing, invalid, or expired.

If the user must take action, show all remaining actions for every plugin together in one clear reply after the automatic setup is finished. Do not ask the user to connect one plugin at a time, and do not split the instructions across multiple replies. Use a short checklist in plain language that:

- names each plugin that still needs attention;
- tells the user where to select **Connect** in Codex when Codex cannot start that connection automatically;
- repeats the user instruction shown beneath that plugin;
- explains that the provider controls the sign-in window and that the user must choose the account themselves;
- never asks the user to paste a password, code, credential, or token into the conversation; and
- asks the user to reply once, after completing every item in the checklist.

Wait for that single reply before continuing. Then verify all connections together. If anything is still incomplete, send one updated checklist containing every remaining user action instead of handling plugins one by one.

After all 3 plugins are installed and enabled and every required connection is authenticated, automatically create a new Codex task to perform the final verification. Use the current project when one is available; otherwise create a projectless task. Use exactly this verification prompt:

"Verifica el entorno de Cortier Design sin cambiar ninguna configuración ni información del usuario. Confirma que Cortier Design, Figma y Mobbin estén instalados, habilitados, conectados y disponibles en Codex. Revisa internamente la lista de herramientas MCP de cada plugin para confirmar que sus funciones estén disponibles, pero no muestres los nombres de esas herramientas al usuario. Realiza únicamente comprobaciones inofensivas y de solo lectura para cada plugin. No edites archivos de Figma, no cambies diseños, no escribas información ni realices acciones destructivas. La respuesta final debe ser fácil de entender y mostrar solamente los nombres de los tres plugins y un estado sencillo para cada uno: Listo o Requiere atención. Si un plugin requiere atención, agrega una explicación breve y clara, y termina con una sola lista que reúna todas las acciones pendientes para el usuario. No muestres identificadores de plugins o marketplaces, nombres de MCP o herramientas, comandos, direcciones web, tokens, registros ni otros detalles técnicos. Indica que el entorno está listo únicamente cuando los tres plugins hayan superado la verificación."

After creating the verification task, tell the user in one short sentence that setup is finished and the verification task has started. Do not list technical details or tools in the setup conversation.
