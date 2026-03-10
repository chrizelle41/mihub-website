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

**Sending only `dist` is fine.** Nothing will be broken. Env vars (EmailJS, optional Google Maps) are **baked into the build** when you run `npm run build`, so the zip does not need a `.env` file. The Contact form will use whatever keys were in your `.env` when you built. Your teammate only needs to host the files.

**You can give either:**
- **Readymade `dist/`** – faster; teammate just hosts it. No env setup.
- **Full project** – if they need to use their own EmailJS/Google Maps keys or change code; they copy `.env.example` to `.env`, fill it, then `npm install` and `npm run build`.

**Important (why assets broke before):** The site is built with base `/`. It **must be deployed at the root** of the domain (e.g. `https://mihub.ai/`), not in a subfolder, or images/JS/CSS will 404.

**If you send readymade dist:**  
1. Run `npm run build`, then zip the **contents** of `dist/` (zip should have `index.html` and `assets/` at the top level, not a `dist` folder inside).  
2. Teammate uploads that and deploys at the **root** of the domain.  
3. Host must serve `index.html` for all routes (SPA fallback) so `/contact`, `/why-mihub`, etc. work.

**If you send the full project:**  
Teammate: copy `.env.example` to `.env`, add your keys, run `npm install` and `npm run build`, then deploy the new `dist/` at the **root** of the domain. Same SPA fallback requirement.
