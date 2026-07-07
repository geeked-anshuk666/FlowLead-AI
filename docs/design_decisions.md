# Design Decisions

This document summarizes key architectural design choices made for the importer:

1. **Redis Pub/Sub vs BullMQ:** Redis Pub/Sub was chosen directly over BullMQ to avoid package lock-ins and keep worker logic lightweight, relying on Node's native Promise pool execution hooks.
2. **PostgreSQL & Prisma:** Relational models fit CRM profiles (Import runs, Leads) best. Prisma provides type-safe queries.
3. **Decoupled Architecture:** Separating Next.js frontend from Express backend ensures high availability and independent scaling.
4. **Standalone Next.js Docker Builds:** Optimizes images to under 150MB by packaging only required runtime dependencies.
