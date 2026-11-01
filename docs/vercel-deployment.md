# Vercel deployment

Deploy this repository root as a **Next.js** project. The `.deployment/portfolio`
directory is the separate Sites/Vinext checkout and must not be used for Vercel.

- Install: `npm ci`
- Build: `npm run build`
- Output: Next.js default
- Node.js: 24.x

`tsconfig.build.json` checks the application entry points and every imported
component. It excludes obsolete, unreferenced components and browser test files
from the production build without disabling TypeScript validation.

The following server-only production variables are required for the existing
sign-in screen:

- `SITE_LOGIN_ID`
- `SITE_LOGIN_PASSWORD`
- `SITE_SESSION_SECRET`

Transfer their existing local values through Vercel's secret environment-variable
settings. Never upload `.env.local` or place the values in command arguments.
Set `RESEND_API_KEY` and `CONTACT_FROM` only if using direct form delivery;
otherwise the existing email-app fallback remains available.

The canonical URL uses `NEXT_PUBLIC_SITE_URL` when configured, otherwise Vercel's
`VERCEL_PROJECT_PRODUCTION_URL`. Do not set the public URL to localhost on Vercel.

After linking the authenticated account and setting the production variables:

```powershell
npx.cmd --yes vercel@latest --prod --yes
```

The `.vercelignore` file excludes local secrets, build caches, tests and the
separate Sites checkout from upload. Vercel's local `.vercel/` link is ignored by Git.
