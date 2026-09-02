---
name: using-figma
description: Work safely in Cortier Figma files using the official Figma plugin. Use for inspecting or changing Figma nodes, variables, components, design-system documentation, or product screens.
---

# Using Figma at Cortier

Use the separately installed official Figma plugin. Ask the user to install or connect Figma if its capabilities are unavailable; installing Cortier Design does not install Figma or grant access to files, teams, libraries, or paid Figma features.

## Canonical files

- Design system: `https://www.figma.com/design/zO6W6pxDoGX2REuZVJKRWS/Cobrof%C3%A1cil---DS`
- Product screens: `https://www.figma.com/design/lZA3NZAo1keN5ZDHET8nd5/Cobrof%C3%A1cil---Screens`

Treat components, variables, styles, and modes in the design-system file as authoritative. Use published instances in product screens whenever a matching component exists. Never detach instances merely to make editing easier.

## Workflow

1. Confirm the target file, page, and frame before writing.
2. Inspect the relevant hierarchy, variables, styles, and nearby examples.
3. Make the smallest coherent change and preserve names, component structure, bindings, constraints, and auto layout.
4. Run the appropriate Cortier Design MCP audit after meaningful layout or structural changes.
5. Visually inspect the result in Figma and repair any reported containment, overlap, spacing, or semantic-mode issue.
