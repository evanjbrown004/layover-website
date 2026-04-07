# Layover

A web app that generates timed, realistic layover itineraries based on your airport and available time. Enter your layover airport and duration, get a step-by-step schedule with transit times, logistics warnings, and a hard leave-by time at every step.

## Folder Structure

```
/
├── frontend/       React + Next.js app
├── backend/        Go API
└── docs/
    ├── project-proposal.md    What we're building and why
    ├── architecture.md        Pages, navigation, API design
    └── database-schema.md     Tables, columns, relationships
```

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Next.js 15 |
| Styling | Tailwind CSS v4 + Shadcn UI |
| Backend | Go |
| Language | TypeScript (frontend) |

## Getting Started

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
go run main.go
```

## Deployment

Hosted on AWS Lightsail at `3.17.181.190`. See `CLAUDE.md` for server and deploy details.
