# Engine Presentation Correction Plan

## Goal
Correct the existing frontend so the uploaded twin-piston GLB reads as one professional engine when assembled and as a controlled digital-twin cutaway when exploded, while preserving the current light aerospace interface and mock-data architecture.

## Engine and Interaction
- Keep the uploaded GLB and remove only its baked backdrop geometry.
- Preserve every retained shell at its exact imported position in assembled mode.
- Replace radial per-shell scattering with grouped mechanical motion: left/right cylinder banks move laterally, top induction parts lift slightly, exhaust parts move outward/downward, and the central crankcase stays anchored.
- Limit travel so full explosion remains visually connected and inside the viewer.
- Add pointer hover highlighting and an anchored component tooltip.
- Map the GLB’s disconnected shells into honest spatial monitor zones for Cylinder 1, Cylinder 2, crankcase, intake, and exhaust; clicking a zone selects its mock record, highlights it, and smoothly focuses the camera.

## Controls and Presentation
- Keep orbit, zoom, pan, reset, auto-rotate, fullscreen, and front/side/top presets.
- Make Assemble, Explode, Reset, and the explosion slider explicit and usable without covering the engine.
- Improve the viewer proportions and control spacing so the engine remains the largest visual element.
- Keep mock/demo labels and the existing right-side health and telemetry panels.

## Technical Details
- Extend the existing split geometry metadata with bounds and deterministic zone/group assignment; do not introduce backend or API work.
- Animate camera targets and grouped part offsets with delta-time damping.
- Use separate shared materials for default, hovered, selected, and caution states rather than cloning a material per shell.
- Preserve reduced-motion behavior and mobile usability.

## Validation
- Verify assembled and fully exploded states in the live browser at desktop and mobile sizes.
- Verify hover tooltip, component selection, right-panel updates, camera presets, reset, auto-rotate, zoom, and pan.
- Confirm the engine remains framed and the browser console is clean.
