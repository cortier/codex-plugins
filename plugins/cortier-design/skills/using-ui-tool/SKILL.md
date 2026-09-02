---
name: using-ui-tool
description: Run deterministic Figma audits and reflow operations with the authenticated Cortier Design MCP. Use to check documentation spacing, containment, alignment, overlap, section bounds, semantic modes, or screen and component structure.
---

# Using the Cortier UI Tool

The Cortier Design MCP operates on the current Figma file. Connect with a `cortier.com` Google Workspace account when prompted.

## Choose a tool

- `design_system_layout_audit`: read-only checks for 40 px item gaps, 192 px section gaps, the 4004 px maximum documentation width, containment, alignment, overlap, and section bounds.
- `design_system_layout_reflow`: arranges documentation using those rules while preserving inherited `Semantic Colors` modes.
- `design_system_structural_audit`: verifies expected component or documentation structures supplied as targets.
- `screen_structural_audit`: verifies a screen's hierarchy and supplied component targets.

## Safe execution

1. Inspect the current Figma selection and identify the intended root node.
2. Call the narrowest MCP tool with explicit node IDs or target descriptors.
3. Read the returned summary. Audit operations should not mutate nodes.
4. For reflow, explain the intended movement and obtain a clear user request before applying it.
5. Apply the operation through Figma, inspect the result, and report failures with node names and IDs.

Never paste access tokens into prompts or logs. Never send full file contents when node IDs and compact structural targets are sufficient.

Screen audits are group-aware. Read-only audits may inspect both `Pantallas` and `Prototipos`, but only `Pantallas` can be treated as canonical. Fail closed when group membership is ambiguous, a screen sits outside both groups, or a logical screen identifier repeats within one group. Prototype checks are review evidence only and must never create canonical reconciliation evidence.
