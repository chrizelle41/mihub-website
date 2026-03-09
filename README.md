# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# mihub-website

## Deploy (for teammate)

**You can give either:** the full project (so they can change env and rebuild) **or** a readymade `dist/` folder (faster, but env is already baked in).

**Why images/resources broke last time:** The app is built with a base path. If it does not match where the site is served, every asset (images, JS, CSS) 404s. This build uses base `/`, so it **must be deployed at the root** of the domain (e.g. `https://mihub.ai/`), not in a subfolder.

**If you give readymade dist:** (1) You run `npm run build`, then zip the **contents** of `dist/` (zip should contain `index.html` and `assets/` at top level). (2) Teammate uploads that and deploys at the **root** of the domain (no subfolder). (3) Host must serve `index.html` for all routes (SPA fallback) so `/contact` etc. work.

**If you give the full project:** Teammate copies `.env.example` to `.env`, fills it in, runs `npm install` and `npm run build`, then deploys `dist/` at the **root** of the domain. Same SPA fallback requirement.
