# AGENTS.md

Instructions, architectural guidelines, and strict rules for AI agents and developers working on this codebase.

---

## 1. Project Overview & Architecture

- **Deployment Target**: Static GitHub Pages portfolio (`https://m-shahzan.github.io`).
- **Core Stack**: Vanilla HTML5, Vanilla CSS3, and Vanilla JavaScript (ES6+).
- **No Bundlers / No Frameworks**: Zero build tools, bundlers (Webpack/Vite), or transpilers. All files must run directly in standard modern browsers.
- **Scene-Driven Viewport Engine**: Each scene occupies full viewport height (`100svh`) without dead scroll space:
  ```
  HOME (0) → ABOUT (1) → RETINAXAI (2) → SIGHTLITE (3) → ARCHIVE (4) → EXPERIMENTS (5) → CONTACT/EXIT (6)
  ```
- **Animation & Motion System**:
  - **Lenis**: Natural fluid smooth scrolling.
  - **GSAP & ScrollTrigger**: Drives scene parallax, exit/entrance transitions, and stage interactions.
  - **Single DOM Morphing Container (`#scroll-pill-morph`)**: Transforms continuously from a bottom-center scroll indicator arrow with dynamic SVG arc tracing into a top-center floating navigation pill header.

---

## 2. Important Home Scene Behavior

- **Typographic Identity**:
  - Name text consists of two editorial rows: `Mohammed` (line 1) and `Shahzan Armar` (line 2).
  - Home name font uses **Allura** (with Alex Brush / cursive fallback via `--font-script`).
  - Letter spacing on the script name must remain `0` to prevent breaking cursive ligatures.
- **Editorial Composition**:
  - Vertically centered within the viewport (`50svh`) with symmetric vertical clearance.
  - Horizontally left-aligned with a rhythmic calligraphic indent on the second line (`Shahzan Armar`).
  - Secondary metadata: architectural coordinate system above the name and minimal editorial descriptor rule below the name, spaced with generous breathing room.
- **Arrow → Pill Header Morph**:
  - Driven entirely by Home scroll progress (`updateHeaderMorphFromProgress` in `main.js`).
  - Dual SVG arcs trace around the arrow as the user scrolls.
  - The arrow ascends to the top after home texts fade out, morphing seamlessly into the glass pill header before Scene 02 (About) reaches 100%.
- **Display Constraints**:
  - **No page or scene numbers**: Scene counters or total page counts must NOT be displayed anywhere on the interface.
  - **Site-wide snap scrolling**: Directional snapping between the major scenes is intentional and must remain active.

---

## 3. Strict Rules for AI-Assisted Edits

1. **Preserve Existing Architecture**:
   - Maintain the static Vanilla HTML/CSS/JS architecture unless explicitly instructed otherwise.
   - Do not introduce build tools, package managers, or unnecessary external dependencies.

2. **Make Targeted, Minimal Edits**:
   - Perform surgical changes only to the relevant lines or blocks. Never rewrite entire files.
   - Maintain documentation integrity and preserve unrelated comments.

3. **Isolate Scene Edits**:
   - Never modify unrelated scenes when assigned to work on a specific scene.
   - Each scene's markup, styles, and animation timeline must remain contained.

4. **Preserve Existing Animations & Motion**:
   - Preserve existing GSAP, ScrollTrigger, and CSS transitions unless explicitly instructed to change them.
   - Do not modify Lenis, GSAP, or ScrollTrigger configurations unless the task explicitly concerns scrolling logic.
   - When modifying an animation, inspect the existing timeline/implementation first and adapt it; do NOT build a competing or duplicate animation loop.

5. **Maintain Snap Scrolling Model**:
   - Site-wide snapping operates strictly between major scenes (`#home`, `#about`, `#retinaxai`, `#sightlite`, `#archive`, `#experiments`, `#exit`).
   - Do not introduce arbitrary or nested snap points within individual scenes.

6. **Respect the Visual Language**:
   - Adhere to the established computational editorial aesthetic (sleek dark palette, restrained typography, subtle ambient lighting).
   - Do NOT redesign the visual style, layout structure, or component tokens without explicit user direction.
   - Avoid generic AI clichés, cyberpunk tropes, glitch effects, or floating particle fields unless explicitly requested.

7. **Responsive & Mobile Integrity**:
   - Maintain responsive behavior across desktop, tablet, and mobile screens.
   - Test and verify mobile layouts (`@media (max-width: 768px)`) after making visual or layout adjustments.

8. **Rigorous Verification Before Reporting**:
   - Never report a feature or fix as implemented without verifying it first (e.g. syntax checks with `node -c`, checking server responses, reviewing rendered code).
