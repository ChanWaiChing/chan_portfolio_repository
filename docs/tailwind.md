# Tailwind CSS

This project uses Tailwind CSS v4 through `@tailwindcss/postcss`. Run `npm ci` and `npm run dev` as usual; no separate Tailwind process is needed.

## Entry points

- `postcss.config.mjs` enables the Tailwind PostCSS plugin for the local Next.js app.
- `app/globals.css` declares the theme and layer order, imports existing styles into the `components` layer, and loads Tailwind utilities last. It explicitly scans `app/` and `components/`.
- The root layout imports the global stylesheet and the self-hosted font packages. Font imports stay separate so both Next.js and the hosted Vite build resolve their font assets correctly.

## Styling

Shared headings, the catalog grids, the fixed night-sky layer, brother introduction cards, and footer artwork/navigation now use Tailwind utility classes. Responsive and interactive variants are written as complete, static class names in the components.

`font-heading` uses Noto Sans JP; `font-body` uses Noto Serif JP. Existing typography variables remain available to custom component styles.

The existing site reset remains in place instead of enabling Preflight, to preserve the established design. Tailwind's theme and utility layers are enabled. The custom CSS files continue to hold the starfield, Milky Way, meteors, title glow, and component styles not yet migrated to utilities. Utilities take precedence over the `components` layer, so new styling does not need specificity overrides or `!important`.

The hosted checkout already includes Tailwind's PostCSS plugin. Its application source uses the same global stylesheet and utility classes as the local project.

## References

- [Tailwind with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs)
- [Preflight and importing individual layers](https://tailwindcss.com/docs/preflight)
