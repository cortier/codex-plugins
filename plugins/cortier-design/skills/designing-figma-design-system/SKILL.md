---
name: designing-figma-design-system
description: Create and maintain Cortier's Figma design-system foundations, components, variants, and documentation. Use when editing, auditing, or reflowing the design-system file.
---

# Designing the Figma Design System

Load `using-figma` for all Figma operations and `using-ui-tool` for deterministic audits or reflow.

## Foundations first

Build in this order: variables and modes, text/effect styles, primitives, composed components, variant sets, then documentation. Bind properties to native variables instead of copying raw values. Preserve inherited `Semantic Colors` modes on documentation sections and their descendants.

Components must use auto layout where content can change, expose only useful properties, include expected interaction states, and remain usable as instances. Prefer updating a canonical component over patching many instances, but inspect the blast radius first.

## Documentation layout

- Use 40 px horizontal gaps between documentation items.
- Use 192 px vertical gaps between sections.
- Keep documentation frames at or below 4004 px wide.
- Keep all descendants within their intended section and documentation bounds.
- Maintain deliberate alignment and prevent overlaps.

After changes, run `design_system_layout_audit` and `design_system_structural_audit`. Use `design_system_layout_reflow` only when the user requests a fix or reflow; review its proposed changes before applying them.
