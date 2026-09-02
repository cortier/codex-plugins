---
name: designing-figma-screens
description: Build and maintain Cortier product screens in Figma from canonical design-system instances. Use for screen composition, responsive layout, interaction states, and designer-only structural review.
---

# Designing Figma Screens

Load `using-figma` before changing a screen and `using-ui-tool` for structural validation.

Start from the product-screens file and use published components from the canonical design system. Search for an existing component or pattern before drawing a one-off replacement. Preserve instances, component properties, variable bindings, semantic color modes, auto layout, constraints, and naming conventions.

## Maintain Pantallas and review Prototipos

- Create designer-led screens and changes directly in the matching Spanish page under `Pantallas`.
- Never create pages or initiate screens in `Prototipos`; development owns proposal creation there.
- During an active UX/UI review, designers may modify the developer's existing prototype to reach the agreed result.
- Require prototype pages to use the same name, internal layout, frame positions, and team-facing logical screen identifiers as their matching canonical pages. Unchanged screens remain omitted.
- Integrate every accepted result into `Pantallas`. Update an existing canonical frame in place so its Figma node identity and mappings survive. Move a genuinely new approved frame into the canonical page and register it through the developer contract workflow when applicable.
- Resolve or reject every screen on a prototype page, then delete the entire prototype page. Do not archive it, leave a partially reviewed page behind, or create a replacement until a later proposal needs one.
- Only `Pantallas` is canonical. Never reconcile or issue a canonical verification receipt from `Prototipos`.

Compose complete states, including loading, empty, validation, error, disabled, and success states when relevant. Check hierarchy, scan order, focus order, readable contrast, touch-target size, localization growth, and realistic content. Keep descendants contained, aligned, and free of unintended overlaps.

Run `screen_structural_audit` on each changed screen. Require unambiguous group membership, unique logical identifiers within each group, exact `1512 x 982` geometry, a complete App Shell, canonical non-detached design-system instances, and the matching page layout and frame position. Review the proposed checks before applying them in Figma, then visually verify the inspected frame.
