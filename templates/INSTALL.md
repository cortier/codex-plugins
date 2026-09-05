Configura el entorno completo de {{PRIMARY_PLUGIN_NAME}} para el usuario.

Primero revisa los marketplaces de plugins disponibles, los plugins instalados y habilitados, y el estado de las conexiones. Esta configuración debe poder ejecutarse varias veces de forma segura: conserva todo lo que ya funcione correctamente y cambia únicamente lo que falte, esté deshabilitado, sea inválido o haya vencido.

Asegúrate de que el marketplace público de Cortier ubicado en `https://github.com/cortier/codex-plugins` esté disponible desde su rama predeterminada. Agrégalo solo si falta. Para cada plugin de la siguiente lista, no hagas cambios si ya está instalado y habilitado; instálalo solo si falta y habilítalo solo si está deshabilitado. Nunca desinstales ni vuelvas a instalar un plugin que ya esté configurado correctamente.

{{PLUGIN_LIST}}

Completa todos los pasos automáticos posibles antes de pedirle al usuario que haga algo. Conserva todas las conexiones válidas que ya tengan una sesión iniciada e inicia OAuth (el proceso de inicio de sesión controlado por el proveedor) únicamente cuando una conexión falte, sea inválida o haya vencido.

Si el usuario debe realizar alguna acción, muestra todas las acciones pendientes para todos los plugins juntas en una sola respuesta clara después de terminar la configuración automática. No le pidas al usuario que conecte los plugins uno por uno y no dividas las instrucciones en varias respuestas. Usa una lista breve y fácil de entender que:

- indique el nombre de cada plugin que requiera atención;
- explique dónde seleccionar **Conectar** en Codex cuando Codex no pueda iniciar esa conexión automáticamente;
- repita la instrucción para el usuario que aparece debajo de ese plugin;
- explique que el proveedor controla la ventana de inicio de sesión y que el usuario debe elegir la cuenta por sí mismo;
- nunca le pida al usuario que pegue una contraseña, código, credencial o token en la conversación; y
- le pida al usuario que responda una sola vez después de completar todos los elementos de la lista.

Espera esa única respuesta antes de continuar. Después, verifica todas las conexiones juntas. Si algo sigue incompleto, envía una sola lista actualizada con todas las acciones pendientes en lugar de atender los plugins uno por uno.

Cuando los {{PLUGIN_COUNT}} plugins estén instalados y habilitados y todas las conexiones necesarias estén autenticadas, crea automáticamente una nueva tarea de Codex para realizar la verificación final. Usa el proyecto actual cuando esté disponible; de lo contrario, crea una tarea sin proyecto. Usa exactamente este prompt de verificación:

"Verifica el entorno de Cortier Design sin cambiar ninguna configuración ni información del usuario. Confirma que Cortier Design, Figma y Mobbin estén instalados, habilitados, conectados y disponibles en Codex. Revisa internamente la lista de herramientas MCP de cada plugin para confirmar que sus funciones estén disponibles, pero no muestres los nombres de esas herramientas al usuario. Realiza únicamente comprobaciones inofensivas y de solo lectura para cada plugin. No edites archivos de Figma, no cambies diseños, no escribas información ni realices acciones destructivas. La respuesta final debe ser fácil de entender y mostrar solamente los nombres de los tres plugins y un estado sencillo para cada uno: Listo o Requiere atención. Si un plugin requiere atención, agrega una explicación breve y clara, y termina con una sola lista que reúna todas las acciones pendientes para el usuario. No muestres identificadores de plugins o marketplaces, nombres de MCP o herramientas, comandos, direcciones web, tokens, registros ni otros detalles técnicos. Indica que el entorno está listo únicamente cuando los tres plugins hayan superado la verificación."

Después de crear la tarea de verificación, dile al usuario en una sola frase breve que la configuración terminó y que la tarea de verificación comenzó. No muestres detalles técnicos ni herramientas en la conversación de configuración.
