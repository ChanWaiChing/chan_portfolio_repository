# Latest portfolio source

Snapshot: 2026-11-02 (Asia/Tokyo).

Includes the current Next.js application, all public images and fonts, package lockfile, configuration, documentation, and tests. Recent changes include language-aware portfolio cards and descriptions, compact cards, top and bottom pagination for both catalogs, system-project concept thumbnails, and enlarged narrow landing-page previews.

## Run locally

1. Install Node.js 24.x.
2. Open a terminal in this folder and run `npm ci` (`npm.cmd ci` in Windows PowerShell).
3. Copy `.env.example` to `.env.local` and set your own `SITE_LOGIN_ID`, `SITE_LOGIN_PASSWORD`, and a long random `SITE_SESSION_SECRET`.
4. Run `npm run dev` and open http://localhost:3000.
5. For production, run `npm run build`, then `npm start`.

The full application build was verified successfully before this snapshot. Next.js generates the `.next/types` references used by `next-env.d.ts` when starting or building the app. Use `npx tsc --noEmit -p tsconfig.build.json` for the application type check after that step. The broader `npm run typecheck` also includes older, unreferenced components and test files that have existing type errors.

## Deployment

See `docs/vercel-deployment.md`. Use the repository root as the Next.js project. Configure the three login environment variables in Vercel. Set `NEXT_PUBLIC_SITE_URL` to your production URL, or use the app's Vercel production URL fallback. Deployment to Vercel has not been completed as part of this snapshot.

## Package contents

Local credentials and `.env.local`, Vercel authentication/link state, `node_modules`, `.next`, caches, temporary scripts and screenshots, test results, and other generated output are excluded. `.env.example` is included with empty secret values. Original project data and public assets are included.

Draft portfolio copy and suggested technology stacks remain visibly marked as unverified. Screenshots and conceptual thumbnails retain their existing provenance notes in `docs/`.