---
name: Precision Industrial MES
colors:
  surface: '#f8f9ff'
  surface-dim: '#ccdbf3'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d5e3fc'
  on-surface: '#0d1c2e'
  on-surface-variant: '#414751'
  inverse-surface: '#233144'
  inverse-on-surface: '#eaf1ff'
  outline: '#717783'
  outline-variant: '#c1c7d3'
  surface-tint: '#0060ab'
  primary: '#005396'
  on-primary: '#ffffff'
  primary-container: '#0f6cbd'
  on-primary-container: '#e3ecff'
  inverse-primary: '#a3c9ff'
  secondary: '#006a63'
  on-secondary: '#ffffff'
  secondary-container: '#99efe5'
  on-secondary-container: '#006f67'
  tertiary: '#7f4300'
  on-tertiary: '#ffffff'
  tertiary-container: '#a25700'
  on-tertiary-container: '#ffe8d8'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d3e3ff'
  primary-fixed-dim: '#a3c9ff'
  on-primary-fixed: '#001c39'
  on-primary-fixed-variant: '#004883'
  secondary-fixed: '#9cf2e8'
  secondary-fixed-dim: '#80d5cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#00504a'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#f8f9ff'
  on-background: '#0d1c2e'
  surface-variant: '#d5e3fc'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: IBM Plex Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-md:
    fontFamily: IBM Plex Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  body-sm:
    fontFamily: IBM Plex Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-numeric-lg:
    fontFamily: JetBrains Mono
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.02em
  label-numeric-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0em
  label-numeric-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: IBM Plex Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-compact: 0.5rem
  margin: 1.5rem
  margin-mobile: 0.75rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 1.75rem
---

## Brand & Style

This design system is engineered for mission-critical industrial manufacturing operations, high-speed shop floor telemetry, and quality process audits. Designed for plant operators, shift supervisors, metallurgy engineers, and quality assurance directors, the interface prioritizes extreme clarity, zero latency in visual parsing, and high-density situational awareness.

The aesthetic balances an architectural, clean engineering visual tone with shop-floor utility:
- **Tone:** Methodical, unyielding, precise, and authoritative. It strips away ornamental distractions in favor of structural grid integrity, mechanical data density, and distinct state legibility even under harsh factory floor glare.
- **Physicality:** Crisp dividers, engineered borders, subtle metallic micro-surfaces, and tactile status indicators that emulate physical DIN-rail telemetry modules, precision gauges, and hardware switchboards.
- **Structure:** A hybrid visual balance featuring a deep slate control console navigation frame docked against a high-contrast, low-glare off-white engineering workspace canvas.

## Colors

The color system is rooted in functional industrial signaling standards (ISO/DIN/IEC ergonomics) while maintaining modern digital interface ergonomics:

- **Primary (`#0F6CBD` - Tech Blue):** Primary actions, telemetry selections, active data streams, and active focus rings.
- **Secondary (`#0F766E` - Deep Cyan / Muted Teal):** Process parameters, metallurgy spec tolerances, and batch tracking references.
- **Neutral Palette (`Slate` series):**
  - Navigation Sidebar & Structural Shell: `#0F172A` (Slate 900) with `#1E293B` (Slate 800) container surfaces.
  - Workspace Canvas: `#F8FAFC` (Slate 50), with panel cards set at `#FFFFFF`.
  - Borders & Hairline Dividers: `#E2E8F0` (Slate 200) for high legibility without visual clutter.
  - Body Text: `#0F172A` (Slate 900) for primary copy, `#475569` (Slate 600) for secondary metrics.

### Industrial Status Indicators
Status colors are never decorative; they represent literal plant-floor machine states:
- **Running / Pass / Cleared (`#059669` - Industrial Emerald):** Line active, dimensions within tolerance, SPC within control bounds.
- **Warning / Out-of-Spec Alert (`#D97706` - Amber / Warning Orange):** Feed rate deviation, tool wear threshold reached, pending verification.
- **Breakdown / Critical Scrap / Emergency Stop (`#E11D48` - Ruby / Crimson):** Line halt, tensile failure, interlock trip, metallurgical defect.
- **Idle / Unscheduled / Offline (`#64748B` - Mechanical Slate):** Tool changeover, shift handover, power-down.
- **Telemetry / In-Cycle Metrology (`#0284C7` - Process Sky):** Real-time probe readouts, torque curves, and sensor streaming.

## Typography

The typographic hierarchy uses a triad of specialized typefaces:
- **Display & Section Headers (`Space Grotesk`):** Provides a clean, technical, geometric rigor suited for industrial titles, workstation designations, and major module titles.
- **Interface & Operational Copy (`IBM Plex Sans`):** Provides extreme clarity in dense process tables, work orders, toolpath notes, and modal forms.
- **Data, Metrology & Telemetry (`JetBrains Mono`):** Used across all tabular figures, engineering tolerances (e.g., `±0.02 mm`), part serial numbers, heat lot IDs, cycle timers, and feed rates. Always render with `font-variant-numeric: tabular-nums` to eliminate layout jitter during high-frequency live data updates.

## Layout & Spacing

The layout is built for high information density across industrial workstation monitors (1080p to 4K widescreen) and ruggedized floor tablets:
- **Layout Model:** High-density 12-column fluid grid. Screen real estate is treated as operational equipment: empty whitespace is intentionally compact (`0.5rem` to `1.25rem`) to ensure critical metrics remain above the fold.
- **Sidebar & Workspace Structure:** Fixed-width persistent dark telemetry sidebar (`260px` collapsed to `64px` icon-rail mode), paired with an edge-to-edge, multi-card responsive dashboard canvas.
- **Breakpoints:**
  - `Desktop (>= 1280px)`: Full multi-pane workflow (telemetry sidebar + machine state lane + active work order detail + live SPC run-charts).
  - `Tablet / Floor Terminal (768px - 1279px)`: Sidebar collapses to icon navigation; tables allow horizontal freeze-pane scrolling for critical batch columns.
  - `Mobile / Handheld Scanner (< 768px)`: Single-column vertical stack with sticky bottom batch execution bar.

## Elevation & Depth

To maximize contrast and prevent visual fatigue in high-ambient-light factory settings, elevation uses **crisp, low-contrast mechanical outlines** rather than heavy blurred drop shadows:

- **Level 0 (Floor Canvas):** Flat `#F8FAFC` background.
- **Level 1 (Panels & Industrial Tiles):** `#FFFFFF` solid fill bounded by a sharp `1px solid #E2E8F0` border.
- **Level 2 (Active Toolbars & Flyouts):** `#FFFFFF` background with a subtle technical drop: `0px 2px 4px rgba(15, 23, 42, 0.06), 0px 0px 0px 1px #CBD5E1`.
- **Level 3 (Modal Overlays & Calibration Dialogs):** `#FFFFFF` surface bordered with `1px solid #94A3B8`, cast over an industrial dimmed scrim `rgba(15, 23, 42, 0.6)`.
- **State Embellishment:** Active running equipment cards display a flush `3px` left-edge accent in the corresponding status token (Emerald for operational, Amber for maintenance due, Ruby for stoppage).

## Shapes

The interface embraces a **machined, geometric industrial profile** (`roundedness: 1`):
- All standard interactive cards, input inputs, buttons, and telemetry blocks feature a tight `4px` (`0.25rem`) corner radius.
- Status badges, micro pills, and tags maintain a uniform `3px` or `4px` radius to feel like laser-etched physical machinery plates.
- Completely circular geometries (`50%` radius) are restricted to status LEDs and stepped line process node indicators.

## Components

### Buttons & Machine Trigger Actions
- **Primary Operational Action:** Deep `#0F6CBD` background, high-contrast white text, `4px` radius, `0.5rem 1rem` padding, bold `13px` weight. Hover state triggers a crisp 10% darkening (`#0B4F8A`).
- **Emergency / Line-Stop Action:** Bright Ruby `#E11D48` background with tactile outer ring (`ring-2 ring-rose-200`).
- **Secondary Tooling Action:** `#FFFFFF` background with `1px solid #CBD5E1`, `#0F172A` text, flat feedback.

### Manufacturing KPI Badges & Machine State Indicators
- **Tactile State Badges:** Composed of an etched micro-border (`1px solid`), tinted status background (`10% opacity`), uppercase `11px` monospace tracking, and a live pulsatile `6px` status dot.
  - *Pass / Running:* `#ECFDF5` bg, `#047857` text, `#A7F3D0` border.
  - *Critical Stoppage:* `#FFF1F2` bg, `#BE123C` text, `#FECDD3` border.
  - *Warning:* `#FFFBEB` bg, `#B45309` text, `#FDE68A` border.

### High-Density Data Tables (Work Orders, Coils & SPC Logs)
- Headers: Rigid `#F1F5F9` background, `11px` uppercase tracking, `#475569` text, `0.5rem` vertical cell padding, `1px solid #E2E8F0` horizontal divider.
- Rows: `#FFFFFF` alternate with `#F8FAFC` zebra striping on dense telemetry logs. Cell height is fixed at `36px` for standard inspection records, with all dimensions, counts, and times set in `JetBrains Mono`.
- Row Selection: Left `3px` bar in `#0F6CBD` with a `#F0F7FF` row background.

### Step Indicators (Multi-Stage Coil Manufacturing Process)
- Progress tracking uses an industrial pipeline stepper: completed steps show an Emerald circle with a check icon; the active process station shows a Tech Blue ring with a rotating pulse dot; upcoming stages remain muted slate rings linked by a solid `2px` connector rail.

### Input Fields & Shop-Floor Controls
- Text inputs and parameter overrides feature `1px solid #CBD5E1` borders, pure white backgrounds, and monospace input values for precise decimal entry. Focused inputs receive a crisp `2px solid #0F6CBD` outline with zero fuzzy glow.