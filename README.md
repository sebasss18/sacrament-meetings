# Sacrament Meetings

A Next.js application for planning and browsing sacrament meetings. Public meeting pages remain readable without an account; the single owner signs in to create, edit, or delete meeting plans.

## Run locally

Install dependencies and start the development server:

```sh
npm install
npm run dev
```

Open <http://localhost:3000>.

## Configure owner authentication

Authentication uses Auth.js v5 credentials. Keep the existing database settings in `.env.local`; add the following values to that file (or your deployment environment):

- `AUTH_SECRET`: generate with `npx auth secret`.
- `AUTH_EMAIL`: the one email address allowed to manage meetings.
- `AUTH_PASSWORD_HASH`: a bcrypt hash, never the plain-text password.

Generate the hash interactively; password input is hidden and the password is not written to disk:

```sh
npm run auth:hash-password
```

Copy the resulting hash into `AUTH_PASSWORD_HASH` in `.env.local`. The password must be at least 8 characters. `.env.local` is ignored by Git; do not commit secrets. `.env.example` lists the required authentication variable names.

## Protected operations

- `/meetings/new` and `/meetings/[id]/edit` redirect unauthenticated visitors to `/login`.
- Meeting create, update, and delete Server Actions and API mutations check the session on the server.
- Public meeting browsing and read-only API requests do not require a session.
- After sign-in, the owner returns to `/meetings`; sign-out clears the session and returns to `/`.

## Verify the flow

1. Configure `AUTH_SECRET`, `AUTH_EMAIL`, `AUTH_PASSWORD_HASH`, and `DATABASE_URL`.
2. Open `/meetings/new` in a private/incognito window and confirm it redirects to `/login`.
3. Sign in with the configured owner credentials and confirm the create-meeting route opens.
4. Sign out from the header, then try `/meetings/new` again; it should redirect back to `/login`.
5. Submit an unauthenticated `POST`, `PUT`, or `DELETE` request to the meetings API and confirm it returns `401`.

Run `npm run lint` and `npm run build` to validate the project.
