# Claude Instructions — Layover

## Server

| | |
|---|---|
| Provider | AWS Lightsail |
| Public IP | `3.17.181.190` |
| Private IP | `172.26.7.29` |
| OS | Ubuntu |
| SSH key | `~/.ssh/LightsailDefaultKey-us-east-2.pem` |
| SSH user | `ubuntu` |

```bash
ssh -i ~/.ssh/LightsailDefaultKey-us-east-2.pem ubuntu@3.17.181.190
```

## Domain & SSL

- **Domain:** `layovertravel.org` (registered via GoDaddy)
- **SSL:** Let's Encrypt via Certbot — auto-renews, expires 2026-07-07
- Live at `https://layovertravel.org` and `https://www.layovertravel.org`

## Web Server

- **Nginx** serving from `/var/www/layover`
- Config at `/etc/nginx/sites-available/layover`
- Reload: `sudo systemctl reload nginx`

## Deploy

The frontend build output goes to `/var/www/layover`. To deploy:

```bash
cd frontend
npm run build
rsync -avz --delete out/ ubuntu@3.17.181.190:/var/www/layover/
```

## Project Docs

- `docs/project-proposal.md` — what we're building and why
- `docs/architecture.md` — pages, navigation, API design
- `docs/database-schema.md` — tables, columns, relationships

## Conventions

- Keep API keys server-side only — never in frontend code or committed to git
- Backend runs as a Go service; frontend is Next.js static export or SSR
- Commit messages should be descriptive and explain the why, not just the what
