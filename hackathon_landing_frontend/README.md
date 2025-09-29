# Hackathon Landing Frontend

## Introduction

### Project Overview
Hackathon Landing Frontend is a modern, responsive React application for showcasing hackathon information with a left-aligned sidebar and a dynamic main content area. It implements a clean “Ocean Professional” theme with blue and amber accents, supports dark mode, and adapts its layout for both desktop and mobile. Users can explore the Home, Calendar, Upcoming, and About views, and interact with Log in and Join event flows via accessible modals.

### Scope
This project covers the public landing experience for a hackathon hub:
- Navigation between main sections (Home, Calendar, Upcoming, About).
- Viewing featured content, stats, and simple calendar and event lists.
- Triggering Log in and Join event modals.
- Persisting dark mode preference and rendering responsive background imagery.

## Getting Started

### Prerequisites
- Node.js 16+ (recommended) and npm.
- No additional services are required; the app runs fully client-side.

### Installation
1. Navigate to the frontend container directory:
   - `cd hackathon-hub-145054-145063/hackathon_landing_frontend`
2. Install dependencies:
   - `npm install`

### Commands
- Development server: `npm start`
  - Runs on http://localhost:3000
- Tests: `npm test`
  - Runs Jest with React Testing Library. A sample test asserts HackthonWave branding is present.
- Production build: `npm run build`
  - Outputs an optimized bundle to the `build` directory.
- Eject configuration: `npm run eject`
  - Permanently exposes CRA configuration (not reversible).

## Architecture

### High-Level Structure
- Entry point: `src/index.js` renders `<App />` to `#root`.
- Root component: `src/App.js` contains:
  - Themed token system (`THEME` object with `light` and `dark` variants).
  - UI composition (Sidebar, HeaderBar for mobile, main content views).
  - State for active view, dark mode, modal visibility, and responsive mobile drawer.
  - Views: HomeView, CalendarView, UpcomingView, AboutView.
  - Shared building blocks: Card and Modal components.
- Styles:
  - `src/index.css`: Base reset and typography.
  - `src/App.css`: Minimal responsive utilities for grid and visibility, and breakpoints that switch between mobile header and desktop sidebar.
  - Most component styles are inline to leverage theme tokens.

### Component Responsibilities
- useTheme hook
  - Manages current theme ("light" or "dark"), persists to localStorage, sets `document.documentElement` attribute, and keeps the tab title branded as “HackthonWave”.
  - Exposes `{ theme, toggle, tokens }`.
- Sidebar
  - Renders app branding, nav items (Home, Calendar, Upcoming, About), and primary actions (Log in, Join an event).
  - Active nav item visually indicated via token-driven border and text color.
- HeaderBar (mobile only)
  - Sticky top bar with menu toggle and theme toggle.
  - Appears when viewport ≤ 900px (controlled by CSS in `App.css`).
- Card
  - A simple surface container using token-driven background, border, shadow, and radius.
- Modal
  - Accessible overlay with `role="dialog"` and `aria-modal="true"`, closes on overlay click, and contains a header with a close button.
- Views
  - HomeView: “Hero” intro, Featured Event, and Quick Stats within responsive grid.
  - CalendarView: Minimal monthly mock grid (7 columns) with occasional highlighted days.
  - UpcomingView: List of sample upcoming events with Join buttons.
  - AboutView: About text and a simple responsive image gallery with placeholder Unsplash images.

### Layout and Responsiveness
- Desktop:
  - Persistent left sidebar, main content to the right with max width constraint around 1400px.
- Mobile:
  - Sidebar replaced by a HeaderBar and a slide-in drawer menu when toggled.
  - Grid collapses via `App.css` media queries (`.grid-responsive` helpers).
- Background:
  - Adaptive radial gradient background based on theme tokens.
  - Main `<main>` section uses a responsive background image (Unsplash) set to cover and center.

## Technology Stack

### Core Libraries
- React 18 (functional components and hooks)
- Create React App tooling (react-scripts)
- React Testing Library + Jest for tests

### Linting
- eslint (configured via `eslint.config.mjs` at the repo root for ESLint v9-style flat config)
- Rules disable the old React in-JSX-scope requirement and ensure JSX symbol usage is tracked.

### Dependencies
See `package.json`:
- `react`, `react-dom`, `react-scripts`
- Dev: `cross-env` (not essential for local development unless cross-platform env vars needed)

## Implemented Features

### Sidebar Navigation
The sidebar contains four nav items: Home, Calendar, Upcoming, and About. Selecting a nav item updates the `active` state in `App` and renders the corresponding view. The active item styling reacts to theme tokens for clear affordance.

### Responsive Design
Responsive behavior is split between minimal CSS utilities (`src/App.css`) and inline styles. At widths ≤ 900px, `.headerbar-mobile` is shown and `.sidebar-desktop` is hidden. Grid helpers collapse content from two columns to full-width stacks at progressively smaller breakpoints.

### Dark Mode with Persistence
Dark mode is toggled in the mobile header or by the theme toggle logic within the app. The `useTheme` hook persists the preference in `localStorage` and switches token sets between `light` and `dark`, affecting colors, borders, shadows, and gradient intensities.

### Login Flow
The “Log in” button opens a modal with labeled fields for email and password. Submission is mocked and simply closes the modal. The modal is accessible and styled using token-driven surface, borders, and subtle gradient headers.

### Join Event Flow
Users can initiate joining an event either contextually from the Upcoming view (passing a selected event) or from the sidebar action. If invoked from Upcoming, the modal displays the selected event; otherwise, a select dropdown provides event choices from `sampleEvents`. Submission is mocked and closes the modal.

### Responsive Backgrounds
The page background uses radial gradients tuned per theme. The main content area applies an Unsplash background image configured to cover and center, adding depth while remaining performant and visually consistent.

## Theme and Style Guidance

### Ocean Professional Theme
This application follows the Ocean Professional style with blue and amber accents, a clean aesthetic, and subtle gradients and shadows.

- Primary: #2563EB
- Secondary/Success: #F59E0B
- Error: #EF4444
- Light Background: #f9fafb
- Light Surface: #ffffff
- Light Text: #111827
- Dark Background: #0b1220
- Dark Surface: #0f172a
- Dark Text: #e5e7eb

The theme token object in `App.js` defines `light` and `dark` variants. Inline styling consumes these tokens to ensure consistent coloring, borders, shadows, and gradients. Prefer using the provided tokens over hard-coded colors to preserve theme consistency and make future theme changes straightforward.

### Layout and Density
Maintain generous spacing, rounded corners (10–16px typical), and soft shadows. Use strong weights for primary headings and high-contrast text on primary/secondary buttons. Avoid heavy UI frameworks; keep the experience lightweight and fast by leveraging pure React and minimal CSS.

### Accessibility
- Use `aria-*` attributes for navigational landmarks and dialog semantics.
- Maintain sufficient color contrast across themes.
- Ensure focusable elements are keyboard-accessible and clearly styled where appropriate.

## Extending and Maintaining

### Add a New Navigation View
1. Define a new nav item in `NavItems` (id, label, icon).
2. Create a view component (e.g., `function ResourcesView({ tokens }) { ... }`) inside `App.js` or split into a new file if desired.
3. Render the view via a conditional in the `<main>` section based on `active`.
4. Update tests to assert the new view renders when selected.

### Integrate Real Event Data
- Replace `sampleEvents` with data from an API:
  - Introduce a state and data-fetching effect (e.g., `useEffect`) or a dedicated hook.
  - Handle loading and error states within UpcomingView.
  - Keep styling inline with tokens, and avoid introducing large query libraries unless needed.

### Theming and Tokens
- To update the theme, modify the `THEME` object in `App.js`.
- If adding semantic tokens (e.g., `info`, `warning`), extend both `light` and `dark` variants to maintain parity.
- Keep hard-coded colors out of components—reference `tokens` whenever possible.

### Modals and Forms
- Consider extracting Modal and Card to separate files if they grow.
- If adding form validation, start with browser-native validation, then introduce a small utility or custom hook for richer validation without heavy libraries.

### CSS and Responsiveness
- Keep `App.css` focused on responsive utilities and visibility toggles.
- For new responsive behaviors, extend the existing breakpoints and utility classes instead of adding large CSS frameworks.

### Testing
- Add tests under `src/` using React Testing Library.
- Example: update `App.test.js` to cover new views, ensure modals open on user actions, and verify theme toggling persists.

## Project Structure

- `src/index.js`: App bootstrap and React root.
- `src/App.js`: Theme tokens, layout, components, views, and app state.
- `src/index.css`: Base resets and typography.
- `src/App.css`: Responsive utilities and visibility breakpoints.
- `src/App.test.js`: Sample test verifying branding renders.
- `src/setupTests.js`: Jest-DOM setup for improved assertions.

## Deployment

The app is a standard CRA build. To deploy:
1. Build: `npm run build`
2. Serve the `build` directory with any static hosting solution (Netlify, Vercel, GitHub Pages, S3 + CloudFront, or a simple static server).

## Troubleshooting

- If the app does not start, ensure Node and npm versions are compatible and dependencies are installed.
- If tests fail to find the branding, check that the “HackthonWave” text still renders in the DOM.
- For styling inconsistencies, verify that inline styles are using `tokens` and that `data-theme` is set on `document.documentElement`.

## License

This project is provided as part of a hackathon landing page sample. Apply your organization’s preferred license and notices as appropriate.

