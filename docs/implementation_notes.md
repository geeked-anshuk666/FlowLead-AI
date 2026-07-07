# Implementation Notes

Development caveats and integration specifics.

- **Date Formatting:** `created_at` records are standard UTC parsed string types inside AI output arrays. If invalid, local runtime date defaults are applied.
- **Queue limits:** Redis Pub/Sub channels have no internal storage capacity (unlike BullMQ). The worker must be listening when a task is published, or the task is lost. In docker compose, this is handled by starting the database and Redis services first before Express or workers run.
- **Cascading Fallbacks:** The array `OPENROUTER_MODELS` can be customized inside `AiService` to target different free APIs.
