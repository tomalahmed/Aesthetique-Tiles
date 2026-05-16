# Aesthetique Tiles

Premium tile catalog and profile experience built with Next.js App Router, Better Auth, and MongoDB.

## What This App Includes

- Marketing pages for brand and trade onboarding
- Tile catalog with search, filtering, and sorting
- Tile detail page with protected access and favorite toggle
- Email/password auth + Google OAuth
- Protected profile area with:
  - saved tiles (live count updates)
  - profile update
  - account settings (notifications + security)
- Mobile-first navigation with animated hamburger menu

## Tech Stack

- `Next.js 16` (App Router)
- `React 19`
- `Tailwind CSS 4`
- `Better Auth`
- `MongoDB`
- `Font Awesome`

## Scripts

- `npm run dev` - run development server
- `npm run build` - production build
- `npm run start` - run production server
- `npm run lint` - run ESLint

## Setup

### 1) Install dependencies

```bash
npm install
```

### 2) Create `.env.local`

```env
# Better Auth
BETTER_AUTH_SECRET=your_random_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# MongoDB
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB_NAME=tiles_gallery

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 3) Start app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Route Map

### Public / Marketing

- `/` - homepage
- `/architects` - architect-focused marketing page
- `/trade-access` - trade access information
- `/trade-terms` - trade terms and conditions

### Auth

- `/login`
- `/register`
- `/forgot-password`

### Catalog

- `/all-tiles` - searchable and filterable catalog
- `/tiles/[tileId]` - tile details (requires login)

### Profile (Protected)

- `/my-profile`
- `/my-profile/update`
- `/my-profile/settings`

### Removed Routes

- `/collections` -> `404` (removed intentionally)
- `/journal` -> `404` (removed intentionally)

## API Endpoints

- `/api/auth/[...all]` - Better Auth route handler
- `/api/favorites` - get/add user favorite tile IDs and tiles
- `/api/favorites/[tileId]` - remove a favorite tile
- `/api/account-settings` - get/update user notification settings

## Data Sources

- Tile catalog source: `src/db/db.json`
- Favorites collection: `user_favorites` (MongoDB)
- Account settings collection: `user_account_settings` (MongoDB)

`src/lib/tiles-db.js` normalizes image paths that start with `/public/` into `/` at runtime.

## Authentication Notes

- Better Auth session is used for protected routes and API endpoints.
- Google OAuth is enabled only when both `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set.
- Register (email/password) sets a default profile avatar: `/default-profile.svg`.

## Image Handling

- Local tile and UI assets are served from `public/`.
- Remote images are allowed from:
  - `images.unsplash.com`
  - `source.unsplash.com`
  - `picsum.photos`
  - `lh3.googleusercontent.com`

Configured in `next.config.mjs`.

## Project Structure (High Level)

```text
src/
  app/
    (marketing)/                  # Home + brand/trade pages
    (catalog)/                    # all-tiles + tile details
    (auth)/                       # login/register/forgot-password
    my-profile/                   # protected profile pages
    api/
      auth/[...all]/route.js
      favorites/route.js
      favorites/[tileId]/route.js
      account-settings/route.js
  components/
    auth/                         # auth forms
    layout/                       # navbar/footer
    home/                         # homepage sections
    profile/                      # profile UI + account settings UI
    tiles/                        # tile cards/details/favorite button
    ui/                           # shared primitives
  db/db.json                      # tile catalog JSON
  lib/                            # auth, DB, sessions, tile services
public/                           # static assets/images
```

## Development Notes

- Run `npm run lint` before pushing changes.
- Keep `BETTER_AUTH_URL` and `NEXT_PUBLIC_BETTER_AUTH_URL` aligned with your app origin.
- Avoid committing secrets (`.env.local` should stay local).
