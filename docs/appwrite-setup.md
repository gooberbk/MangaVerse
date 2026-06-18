# Appwrite Setup

MangaVerse now has the Appwrite SDK foundation in place, but the app still uses mock data. No public pages, admin pages, auth flows, or write operations are wired to Appwrite yet.

## Required Environment Variables

Create `.env.local` from `.env.example` and fill in the values from your Appwrite project:

```bash
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your-database-id
NEXT_PUBLIC_APPWRITE_MANGAS_COLLECTION_ID=mangas
NEXT_PUBLIC_APPWRITE_CHAPTERS_COLLECTION_ID=chapters
NEXT_PUBLIC_APPWRITE_CHAPTER_PAGES_COLLECTION_ID=chapter-pages
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID=users
NEXT_PUBLIC_APPWRITE_COVERS_BUCKET_ID=covers
NEXT_PUBLIC_APPWRITE_PAGES_BUCKET_ID=pages
NEXT_PUBLIC_APPWRITE_AVATARS_BUCKET_ID=avatars
```

Only `NEXT_PUBLIC_` values are used here. Do not add API keys, admin keys, or server secrets to the client-side environment.

## Appwrite Project Setup

1. Create or open an Appwrite project.
2. Add a Web platform for the MangaVerse domain and local development origin.
3. Create one database for the MangaVerse content model.
4. Create the planned collections and buckets listed below.
5. Copy the project, database, collection, and bucket IDs into `.env.local`.

## Planned Collections

- `mangas`
- `chapters`
- `chapter-pages`
- `users`

## Planned Buckets

- `covers`
- `pages`
- `avatars`

## Current Wiring Status

- Appwrite SDK instances are exported from `lib/appwrite/client.ts`.
- Config constants are exported from `lib/appwrite/config.ts`.
- A local env health helper is available in `lib/appwrite/health.ts`.
- No Appwrite network calls are made by the app yet.
- Mock data remains the active data source.
