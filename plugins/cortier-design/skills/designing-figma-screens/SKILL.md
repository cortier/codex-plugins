---
name: designing-figma-screens
description: Build and maintain Cortier product screens in Figma from canonical design-system instances. Use for screen composition, responsive layout, interaction states, and designer-only structural review.
---

# Designing Figma Screens

Load `using-figma` before changing a screen and `using-ui-tool` for structural validation.

Start from the product-screens file and use published components from the canonical design system. Search for an existing component or pattern before drawing a one-off replacement. Preserve instances, component properties, variable bindings, semantic color modes, auto layout, constraints, and naming conventions.

Compose complete states, including loading, empty, validation, error, disabled, and success states when relevant. Check hierarchy, scan order, focus order, readable contrast, touch-target size, localization growth, and realistic content. Keep descendants contained, aligned, and free of unintended overlaps.

Run `screen_structural_audit` on each changed screen. Review the proposed checks before applying them in Figma, then visually verify the inspected frame.
