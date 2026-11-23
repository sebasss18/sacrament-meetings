# Sacrament Meetings

A Next.js application for planning sacrament meetings. Only accounts added to the private users database can sign in and manage meeting plans.

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

## Configure private-user authentication

Authentication uses Auth.js v5 credentials. Keep the existing database settings in `.env.local` and configure:

- `AUTH_SECRET`: generate with `npx auth secret`.
- `DATABASE_URL`: connection to the `users` table containing the accounts you allow to sign in.

Add each allowed user to `users` with a unique email and a bcrypt password hash. Generate hashes interactively; password input is hidden and the password is not written to disk:

```sh
npm run auth:hash-password
```

Save the resulting hash in that user's `password` field. Passwords must be at least 8 characters. `.env.local` is ignored by Git; do not commit secrets.

## Protected access

- `/meetings` and `/account` require a signed-in account from the private users database.
- Any signed-in private user can view and manage meetings.
- Each user can change their own email and password at `/account`; both changes require the current password.
- After sign-in, users return to `/meetings`; sign-out clears the session and returns to `/`.

## Verify the flow

1. Configure `AUTH_SECRET` and `DATABASE_URL`, and add an allowed user to the `users` table.
2. Open `/meetings`, `/meetings/current`, and a meeting detail page in a private/incognito window and confirm they redirect to `/login`.
3. Sign in with that user's credentials and confirm the meetings are visible.
4. Sign out, then try any `/meetings` page again; it should redirect back to `/login`.
5. Submit unauthenticated `GET`, `POST`, `PUT`, and `DELETE` requests to the meetings API and confirm they return `401`.

Run `npm run lint` and `npm run build` to validate the project.
