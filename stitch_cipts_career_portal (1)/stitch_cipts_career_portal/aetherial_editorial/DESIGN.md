---
name: Aetherial Editorial
colors:
  surface: '#f9f9fd'
  surface-dim: '#d9dade'
  surface-bright: '#f9f9fd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f7'
  surface-container: '#ededf2'
  surface-container-high: '#e8e8ec'
  surface-container-highest: '#e2e2e6'
  on-surface: '#1a1c1f'
  on-surface-variant: '#464555'
  inverse-surface: '#2f3034'
  inverse-on-surface: '#f0f0f4'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#40636f'
  on-secondary: '#ffffff'
  secondary-container: '#c3e8f7'
  on-secondary-container: '#466976'
  tertiary: '#4c483e'
  on-tertiary: '#ffffff'
  tertiary-container: '#646055'
  on-tertiary-container: '#e1dbcc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#c3e8f7'
  secondary-fixed-dim: '#a8ccda'
  on-secondary-fixed: '#001f27'
  on-secondary-fixed-variant: '#284c57'
  tertiary-fixed: '#e8e2d3'
  tertiary-fixed-dim: '#ccc6b8'
  on-tertiary-fixed: '#1e1c13'
  on-tertiary-fixed-variant: '#4a473c'
  background: '#f9f9fd'
  on-background: '#1a1c1f'
  surface-variant: '#e2e2e6'
typography:
  display-lg:
    fontFamily: DM Serif Display
    fontSize: 64px
    fontWeight: '400'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-md:
    fontFamily: DM Serif Display
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: DM Serif Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: DM Serif Display
    fontSize: 28px
    fontWeight: '400'
    lineHeight: 36px
  title-lg:
    fontFamily: Manrope
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  section-gap: 120px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The design system is defined by an **Airy Editorial** aesthetic that balances academic prestige with modern career fluidity. It avoids the cold, industrial feel of traditional CRM platforms in favor of a soft, human-centric atmosphere that feels like a premium digital publication.

The visual narrative is built on **Glassmorphism** and **Minimalism**. It uses wide-open layouts, significant negative space, and translucent layering to evoke a sense of clarity and "room to breathe." This approach reduces the cognitive load associated with complex data tracking, making the internship and placement journey feel intentional and prestigious rather than bureaucratic.

**Key Visual Pillars:**
- **Luminosity:** Interfaces should feel backlit and glowing, utilizing soft gradients and frosted surfaces.
- **Human Connection:** Selective use of high-end editorial photography featuring students in natural, bright settings.
- **Quiet Authority:** Premium typography and generous margins signal quality and institutional trust.

## Colors

The palette is anchored by a warm, academic foundation and energized by clear, technical accents. 

- **Primary Indigo (#4F46E5):** Used sparingly for high-intent actions, primary buttons, and critical data points. It provides the "professional anchor" to the softer palette.
- **Sky Tones:** Sky Blue and Soft Sky are used for large background washes, decorative elements, and glassmorphic containers. These colors promote calm and focus.
- **Ivory & Cream:** These replace pure white to provide a tactile, paper-like quality. Use Warm Ivory for the primary background surface and Cream for secondary containers or subtle section breaks.
- **Ink (#17191C):** Reserved strictly for text and iconography to ensure high legibility and a sharp editorial finish.

## Typography

This design system employs a sophisticated dual-type strategy:

- **DM Serif Display:** Used for large "Display" and "Headline" roles. It conveys an editorial, storytelling quality. It should be used for page titles, hero sections, and featured quotes. Use it selectively—never for functional UI text or long-form body copy.
- **Manrope:** The workhorse font. It is used for all "Title," "Body," and "Label" roles. Its modern, geometric construction ensures high readability in data-heavy tracking tables and application forms.

**Usage Note:** Maintain high contrast between Serif headlines and Sans-serif sub-headlines to emphasize the platform's "Editorial Education" identity.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid with Asymmetric Accents**. While the core content lives within a 12-column grid, decorative elements and photography should frequently break the grid or overlap container boundaries to create a modern, "scrolled-zine" feel.

- **Whitespace:** Use aggressive vertical spacing (`section-gap`) to separate major modules. 
- **Margins:** Desktop margins are generous (64px) to keep content centered and focused.
- **Responsive Behavior:** On mobile, reduce the `section-gap` to 64px and collapse the 12-column grid into a single column. Maintain the 20px safe area for touch targets.

## Elevation & Depth

Hierarchy is established through **Backdrop Blurs** and **Tonal Layering** rather than traditional heavy shadows.

- **Base Layer:** Warm Ivory (#FFF8E9) or Soft Sky (#D8EEF4) gradient washes.
- **Floating Containers:** White (#FFFFFF) surfaces with 60-80% opacity and a 16px to 32px `backdrop-filter: blur()`. 
- **Borders:** All glass containers must have a 1px solid border using a very low-opacity Ink (#17191C at 10%) or a brighter Primary Indigo (at 15%) to define the edges.
- **Shadows:** Use only one type of shadow—a very soft "Ambient Glow." It should be large, diffused, and tinted with the primary color (e.g., `box-shadow: 0 20px 40px rgba(79, 70, 229, 0.05)`).

## Shapes

The shape language is extremely soft and approachable. 

- **Global Radius:** Use `24px` (radius-xl) for standard cards, input fields, and primary buttons.
- **Featured Containers:** Large editorial sections and hero images use a `40px` (radius-2xl) corner radius to emphasize the "Airy" aesthetic.
- **Interactive Elements:** Small UI components like chips or tags should be fully pill-shaped.

## Components

### Buttons
- **Primary:** Solid Indigo (#4F46E5) with white Manrope text. High roundedness (24px).
- **Secondary:** Glassmorphic (white 20% opacity) with a thin Indigo border and Indigo text.
- **Ghost:** Text-only with a slight Ivory background hover state.

### Cards
Cards should feel like floating sheets of paper. Use a 1px translucent border and a very subtle ambient glow. Content inside should have generous padding (min 32px).

### Input Fields
Inputs should be large and clean. Use the Cream (#F7F0DE) color for the background with a 24px radius. On focus, the border transitions to Primary Indigo with a soft outer glow.

### Chips & Tags
Use for status tracking (e.g., "Internship Active," "Application Pending"). These should be pill-shaped with low-saturation backgrounds (e.g., Soft Sky) and slightly darker text for contrast.

### Placement Trackers
Use a horizontal timeline component with soft rounded nodes and thin Indigo connecting lines. Avoid industrial progress bars; use a "stepper" style that feels more like a journey.

### Editorial Callouts
Combine a Serif headline with an asymmetric layout and a human-centric photo. These are used for "Success Stories" or "Career Advice" modules.