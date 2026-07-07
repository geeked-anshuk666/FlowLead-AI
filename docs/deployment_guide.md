# Deployment Guide

Instructions for deploying in staging and production environment using Docker Compose:

1. **Prerequisites:** Install Docker and Docker Compose (support on WSL).
2. **Environment Configuration:**
   Create `.env` inside backend directory:
   ```
   GEMINI_API_KEY="key"
   OPENROUTER_API_KEY="key"
   ```
3. **Build & Start Services:**
   Run:
   ```bash
   docker-compose up --build -d
   ```
4. **Prisma DB Migration:**
   Exec database migration commands inside backend container:
   ```bash
   docker exec -it groweasy_backend npx prisma migrate deploy
   ```
5. **Access Apps:**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`
