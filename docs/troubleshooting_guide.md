# Troubleshooting Guide

Common error logs and fixing procedures:

1. **Redis Connection Failures:**
   - Error: `ECONNREFUSED 127.0.0.1:6379`.
   - Fix: Ensure local redis service is active via command `redis-server` or within Docker.
2. **Postgres Migration Failures:**
   - Error: `P1001 database server is not reachable`.
   - Fix: Validate parameters in `DATABASE_URL` (.env).
3. **AI Fallback Trigger Logs:**
   - Watch logs: `Gemini API call failed, falling back to OpenRouter`.
   - Action: Ensure at least one api key has credits or falls back to free models.
4. **Large CSV Upload timeouts:**
   - Fix: Ensure backend server has 100MB body limit configured inside multer middleware.
5. **SSE Progress connection drop:**
   - Solution: Client reconnects automatically. If completed, client fetches final state from API database.
