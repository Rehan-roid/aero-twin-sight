# Aero Twin Insight

Build ONLY the FRONTEND of my SIH26054 project:

“AI-Enabled Real-Time Digital Twin System for Health Monitoring, Fault Prediction and Mission Reliability Enhancement of Twin-Piston Aero Engines used in MALE UAVs.”

IMPORTANT — FRONTEND ONLY

Do NOT build, modify, replace, or implement:

- backend

- database

- ML models

- ML pipeline

- dataset

- authentication

- LangGraph

- APIs

- backend services

- telemetry ingestion

Backend and ML are being developed separately by other teammates.

Use MOCK DATA ONLY wherever engine/ML data is needed. Structure the frontend cleanly so real APIs can be connected later without redesigning the UI.

I have uploaded a GLB twin-piston aircraft engine model. Use it as the primary 3D reference/asset. Do not replace it with a generic AI-generated engine.

==================================================

CORE EXPERIENCE

==================================================

The centerpiece of the application must be a HIGH-QUALITY INTERACTIVE 3D DIGITAL TWIN of the twin-piston aircraft engine.

This must NOT look like a normal dashboard with a small 3D model.

The ENGINE must be the hero element.

The first impression should immediately communicate:

AEROSPACE ENGINEERING + DIGITAL TWIN + AI-BASED HEALTH MONITORING.

==================================================

3D ENGINE VIEWER

==================================================

Build a proper Three.js / React Three Fiber based 3D viewer.

The engine must support:

- smooth 360° rotation

- smooth orbit controls

- smooth zoom

- smooth pan

- reset camera

- auto rotation ON/OFF

- fullscreen

- front view

- side view

- top view

- smooth camera transitions

- responsive interaction

- mouse and touch interaction where appropriate

Rotation must feel smooth and controlled, NOT jerky.

The engine should remain visually prominent on desktop screens.

==================================================

EXPLODED ENGINE

==================================================

Create a premium engineering-style exploded-view experience.

Initial state:

COMPLETE ASSEMBLED ENGINE

Add a prominent but elegant:

“EXPLORE ENGINE”

or

“EXPLODE VIEW”

interaction.

When activated, the engine should smoothly separate into its major components.

The explosion must look mechanically logical and cinematic.

DO NOT make parts randomly fly in different directions.

Provide:

- Explode

- Assemble

- Reset

- Exploded-view slider

The user should be able to rotate and inspect the engine even while exploded.

If the current GLB is a combined mesh and cannot support true individual component explosion, do NOT fake technical accuracy. Build the viewer architecture so the final Blender-prepared component-separated GLB can be dropped in later.

==================================================

CLICKABLE COMPONENTS

==================================================

Make major engine components individually selectable whenever the supplied model structure allows it.

Target components include:

- Cylinder 1

- Cylinder 2

- Piston 1

- Piston 2

- Connecting Rod 1

- Connecting Rod 2

- Crankshaft

- Crankcase

- Cylinder Heads

- Valves

- Intake System

- Exhaust System

- Fuel System

- Ignition System

- Cooling System

- Oil System

- Sensors

- ECU / FADEC representation

On hover:

- subtle highlight

- component name tooltip

On click:

- highlight selected component

- smoothly focus camera on the component

- open component information panel

Do NOT claim that every component is individually selectable if the current GLB does not actually contain separate objects.

Keep the architecture ready for the improved Blender-separated GLB.

==================================================

COMPONENT INFORMATION

==================================================

When a component is selected, show a clean engineering information panel.

Example:

CYLINDER 1

Function

Combustion chamber and piston housing

Parameters

CHT          178 °C

EGT          642 °C

Vibration    NORMAL

Health       94%

Status       NORMAL

Use MOCK DATA ONLY.

Clearly organize the code so these mock values can later be replaced by backend/ML values.

==================================================

ENGINE PARAMETERS

==================================================

Create a professional telemetry area using mock values for:

RPM

EGT

CHT

Oil Temperature

Oil Pressure

Vibration

Fuel Flow

Altitude

Also display:

Engine Health

Anomaly Score

Fault Probability

Degradation Rate

RUL

Mission Risk

Use realistic demo values but clearly treat them as mock/demo values.

==================================================

DIGITAL TWIN HEALTH

==================================================

Create a strong visual relationship between engine condition and the 3D model.

Example:

If Cylinder 2 has an abnormal condition in mock data:

- Cylinder 2 becomes visually highlighted

- component panel opens

- abnormal parameters are shown

- fault probability is shown

- health decreases

- warning status appears

This interaction should make it obvious that the 3D engine represents the digital twin.

==================================================

MISSION RELIABILITY

==================================================

Include a compact mission reliability section showing:

Engine Health

Fault Probability

RUL

Mission Risk

Overall Status

Possible status:

SAFE

CAUTION

UNSAFE

Do not overcrowd the screen.

==================================================

TELEMETRY VISUALIZATION

==================================================

Add professional lightweight charts for:

- RPM trend

- EGT trend

- CHT trend

- Vibration trend

- Oil temperature

- Fuel flow

Use mock historical data.

Charts should be compact and engineering-oriented.

==================================================

VISUAL DESIGN — VERY IMPORTANT

==================================================

DO NOT use the typical AI-generated website appearance.

I specifically do NOT want:

- generic black AI dashboard

- purple/blue AI gradients everywhere

- excessive neon

- excessive glassmorphism

- huge rounded cards

- oversized headings

- generic Inter-everywhere appearance

- repetitive AI-generated font hierarchy

- excessive glowing borders

- random decorative blobs

- unnecessary futuristic effects

- clutter

The interface should feel:

PREMIUM

AEROSPACE

ENGINEERING

CONFIDENT

CLEAN

POSITIVE

MODERN

ORIGINAL

Use a SOFT, LIGHT, POSITIVE base environment rather than an almost-black background.

The background should give the 3D engine enough contrast to SHINE and become the visual focus.

Use a sophisticated light/soft palette with carefully chosen engineering accents.

Do not make every element colorful.

Create contrast through:

- typography

- spacing

- subtle surfaces

- borders

- shadows

- restrained accent colors

- the metallic 3D engine itself

The engine should visually stand out from the interface.

==================================================

TYPOGRAPHY

==================================================

Do NOT use the standard AI-generated typography hierarchy.

Avoid:

- enormous title

- tiny unreadable labels

- everything in bold

- excessive uppercase text

Create a distinctive professional typography system with:

- elegant display heading

- highly readable body text

- compact technical labels

- clear numeric typography for telemetry

- meaningful differences in weight and size

Typography should feel like a premium aerospace engineering product, not a generated SaaS template.

==================================================

LAYOUT

==================================================

Create a polished application structure.

LEFT:

Compact navigation:

- Overview

- Engine Twin

- Telemetry

- Fault Analysis

- RUL

- Mission Reliability

CENTER:

Large interactive 3D engine viewer

RIGHT:

Dynamic component / engine health panel

BOTTOM:

Telemetry and trend information

The 3D viewer must receive the majority of the visual attention.

Do not fill the screen with cards.

==================================================

3D CONTROLS

==================================================

Controls should be elegant and minimal.

Include:

Rotate

Zoom

Pan

Reset

Auto Rotate

Explode

Assemble

Fullscreen

View presets

Do not use huge floating buttons covering the engine.

==================================================

LOADING EXPERIENCE

==================================================

Create a premium 3D loading state while the GLB loads.

Show:

Loading Twin-Piston Engine

Preparing Digital Twin...

Use subtle animation.

Do not use a generic spinning loader if a better engineering-style loading treatment can be created.

==================================================

RESPONSIVENESS

==================================================

Desktop is the primary target because this will be demonstrated at SIH.

Still make the interface responsive for smaller screens.

The 3D viewer must remain usable.

==================================================

PERFORMANCE

==================================================

Optimize for smooth 3D interaction.

- lazy-load the GLB

- avoid unnecessary React rerenders

- use efficient Three.js rendering

- dispose unused resources

- avoid excessive post-processing

- avoid heavy shadows

- avoid unnecessary particles

- maintain smooth rotation

- keep UI responsive

==================================================

CODE ARCHITECTURE

==================================================

Create reusable frontend components such as:

EngineViewer

EngineControls

ExplodedViewController

ComponentSelector

ComponentInfoPanel

EngineHealth

TelemetryPanel

TelemetryCharts

MissionReliability

StatusIndicator

Navigation

Create a clean frontend data structure for:

component ID

component name

description

function

parameters

health

status

fault probability

Keep mock data isolated from UI components.

Make future API replacement easy.

==================================================

IMPORTANT — EXISTING PROJECT

==================================================

If an existing frontend already exists:

DO NOT rebuild the application from scratch.

First inspect the existing frontend.

Preserve useful existing functionality and architecture.

Improve and extend it.

Do not unnecessarily rewrite working components.

Do not touch backend or ML code.

==================================================

FINAL EXPERIENCE

==================================================

The finished frontend should provide this complete experience:

OPEN APPLICATION

        ↓

Beautiful aerospace interface

        ↓

Large assembled twin-piston 3D engine

        ↓

EXPLORE ENGINE

        ↓

Smooth exploded-view animation

        ↓

Rotate / Zoom / Pan

        ↓

Click a component

        ↓

Component highlights

        ↓

Camera focuses on component

        ↓

Component details appear

        ↓

Telemetry + health displayed

        ↓

Fault / anomaly / RUL information

        ↓

Mission reliability status

The final result should feel like a REAL aerospace engineering Digital Twin demonstrator suitable for an SIH final presentation.

Make it visually memorable and distinctive.

DO NOT make it look like a generic AI-generated dashboard.

The goal is not “more effects”.

The goal is a polished, technically convincing, original frontend where the 3D twin-piston engine is the hero.    make sure u simultaneously update the work on my github repo https://github.com/Rehan-roid/Twin-Piston-Frontend

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/00ed57f1-7d06-444e-8ad1-34eac90fa326).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
