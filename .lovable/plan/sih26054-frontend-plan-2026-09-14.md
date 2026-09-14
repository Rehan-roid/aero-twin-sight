# SIH26054 Frontend Plan

## Goal
Build a desktop-first aerospace digital-twin demonstrator around the supplied twin-piston engine GLB, using mock data only and leaving all backend, ML, authentication, and ingestion work untouched.

## Experience
- Replace the placeholder with a light, premium engineering workspace.
- Keep the interactive engine as the dominant center surface, with compact navigation, health details, and telemetry arranged around it.
- Add smooth orbit, zoom, pan, camera reset, auto-rotation, fullscreen, and front/side/top view presets.
- Add an engineering loading state and restrained motion with reduced-motion support.

## Engine Model
- Store the uploaded GLB through the project asset system and lazy-load it inside the 3D scene.
- Normalize and light the metallic model for inspection without heavy post-processing or shadows.
- The supplied GLB contains one combined mesh, so the first version will accurately present whole-engine selection and focus rather than falsely claiming individual part selection.
- Expose an explode architecture and slider in a disabled/ready state, clearly indicating that a component-separated Blender export is required for accurate exploded motion.

## Mock Monitoring UI
- Isolate engine, component, health, fault, RUL, mission, and historical telemetry mock data from presentation components.
- Build reusable navigation, viewer, controls, component information, health, telemetry, chart, mission reliability, and status components.
- Demonstrate the digital-twin link with a Cylinder 2 caution scenario in the health panel and telemetry, while labeling values as demo data.

## Technical Details
- Add React Three Fiber, Three.js, Drei, and type support compatible with React 19.
- Use a client-only home route for WebGL and semantic design tokens in the global stylesheet.
- Use compact inline SVG charts to avoid heavy chart rendering overhead.
- Add route-specific title, description, Open Graph, and Twitter metadata.
- Validate the live page at desktop and mobile widths, including camera controls, model loading, and clean console output.

## Repository Sync
- Changes will update this Lovable project repository automatically. The requested GitHub repository must be linked through Lovable’s GitHub project connection for two-way synchronization; no Git credentials will be embedded in the frontend.
