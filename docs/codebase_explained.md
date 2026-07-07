# Codebase Explained

A structural map of the decoupled workspace project directories.

## Directory Structure

```
├── backend/                   # Node.js + Express backend service
│   ├── src/
│   │   ├── config/            # PostgreSQL (db.ts) & Redis client (redis.ts) configuration
│   │   ├── controllers/       # HTTP route controllers (import.controller.ts)
│   │   ├── services/          # Business logic wrappers:
│   │   │   ├── ai.service.ts  # Handles Gemini and OpenRouter cascading model fallbacks
│   │   │   ├── csv.service.ts # Parses raw files, validates/filters empty fields
│   │   │   └── lead.service.ts# Database queries
│   │   ├── worker/            # Redis Pub/Sub background task workers
│   │   └── index.ts           # Express starting server file
│   └── prisma/                # DB relational tables model & migration logs
├── frontend/                  # Next.js App Router project
│   ├── src/
│   │   └── app/               # Landing page, layout files, CSS
└── docker-compose.yml         # Container deployments configuration
```
