# Sacrament Meetings

A Next.js application for planning sacrament meetings. Only the configured administrator can view or manage meeting plans.

## Run locally

Install dependencies and start the development server:

```sh
npm install
npm run dev
```

Open <http://localhost:3000>.

Set `SITE_URL` to the canonical public URL in the deployment environment (for
example, `https://example.com`) so social previews can fetch the Open Graph
image. On Vercel, the deployment URL is used automatically when `SITE_URL` is
not set; locally, it defaults to `http://localhost:3000`.

## Configure owner authentication

Authentication uses Auth.js v5 credentials. Keep the existing database settings in `.env.local`; add the following values to that file (or your deployment environment):

- `AUTH_SECRET`: generate with `npx auth secret`.
- `AUTH_EMAIL` (optional): restricts which email can claim the administrator account on its first sign-in. If omitted, the first account that successfully signs in claims it. The administrator's database ID is then stored so changing the email in the app does not change account ownership.
- `AUTH_PASSWORD_HASH`: a bcrypt hash, never the plain-text password.

Generate the hash interactively; password input is hidden and the password is not written to disk:

```sh
npm run auth:hash-password
```

Copy the resulting hash into `AUTH_PASSWORD_HASH` in `.env.local`. The password must be at least 8 characters. `.env.local` is ignored by Git; do not commit secrets. `.env.example` lists the required authentication variable names.

## Protected access

- All `/meetings` pages redirect visitors who are not signed in as the configured administrator to `/login`.
- The administrator can change the account email and password at `/account`; both changes require the current password. The app creates its administrator identity table at first sign-in.
- Meeting read APIs and create, update, and delete operations verify the administrator on the server.
- After sign-in, the owner returns to `/meetings`; sign-out clears the session and returns to `/`.

## Verify the flow

1. Configure `AUTH_SECRET` and `DATABASE_URL`; set `AUTH_EMAIL` to restrict access to a specific administrator account.
2. Open `/meetings`, `/meetings/current`, and a meeting detail page in a private/incognito window and confirm they redirect to `/login`.
3. Sign in with the configured administrator credentials and confirm the meetings are visible.
4. Sign out, then try any `/meetings` page again; it should redirect back to `/login`.
5. Submit unauthenticated `GET`, `POST`, `PUT`, and `DELETE` requests to the meetings API and confirm they return `401`.

Run `npm run lint` and `npm run build` to validate the project.
