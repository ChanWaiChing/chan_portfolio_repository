# Site sign-in

The first page requires a shared login before rendering the portfolio. Credentials are validated on the server. The browser receives a signed, HttpOnly, SameSite cookie that expires after eight hours or the browser session; logout clears it. Credential changes invalidate existing sessions.

Configure these server-only secrets in Sites and in an ignored local `.env.local` for local development:

- `SITE_LOGIN_ID`
- `SITE_LOGIN_PASSWORD`
- `SITE_SESSION_SECRET` (a random signing secret)

Never commit their values or prefix them with `NEXT_PUBLIC_`. Missing configuration fails closed. The portfolio page renders dynamically, and contact and event endpoints reject unauthenticated requests. The login endpoint checks the request origin and applies a bounded, per-instance attempt limit. Static assets remain public; this is an access gate for the site interface, not an asset-access policy.
