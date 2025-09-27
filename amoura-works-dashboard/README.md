Amoura Works — Client Dashboard
================================

A premium, dark, single-screen dashboard for video editing clients. Built with Next.js App Router, TailwindCSS, and Framer Motion. Data is fetched from Google Sheets with a mock fallback for local development.

Tech Stack
----------
- Next.js (App Router, TypeScript)
- TailwindCSS (with custom glassmorphism tokens)
- Framer Motion (subtle, cinematic animations)
- Google Sheets API (read-only for dashboard data)
- Vercel (hosting)

Getting Started
---------------
1. Install dependencies:

```
npm i
```

2. Run the dev server:

```
npm run dev
```

3. Visit the demo homepage `/` or a client route like `/client/alpha`.

Environment Variables
---------------------
Create `.env.local` with the following values (optional; mock data is used if omitted):

```
SHEETS_SPREADSHEET_ID=your_spreadsheet_id
GOOGLE_SERVICE_ACCOUNT_EMAIL=svc-account@project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

Google Sheet Structure
----------------------
Create a sheet with a tab named `Dashboard` and columns:

```
Project Name | Phase | % Progress | Assigned Editor | Deadline | Latest Update | Deliverables
```

- % Progress: number 0-100
- Deadline: ISO date or parsable date string
- Deliverables: multi-line cell. Each line `Title | https://link`

Deployment (Vercel)
-------------------
1. Push the repository to GitHub/GitLab.
2. Import the project in Vercel.
3. Add the environment variables from above in Project Settings → Environment Variables.
4. Deploy. Your client pages will be at `/client/[id]` (e.g., `/client/alpha`).

Customization
-------------
- Global styles and tokens in `src/app/globals.css`.
- Homepage layout prototype in `src/app/page.tsx`.
- Live client dashboard in `src/app/client/[id]/page.tsx`.
- Google Sheets API route in `src/app/api/projects/[id]/route.ts`.
