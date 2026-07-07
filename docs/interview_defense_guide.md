# Interview Defense Guide

Answers to defend key architectural choices:

1. **Why Redis Pub/Sub instead of BullMQ?**
   - Direct Redis Pub/Sub is lightweight, native, and has zero configuration boilerplate. For simple batch notifications, it scales instantly and avoids bloated code bases.
2. **Why PostgreSQL instead of MongoDB?**
   - Relational structures ensure leads are linked to specific import run logs. SQL constraints prevent saving records with neither email nor phone values.
3. **How do you handle Gemini API rate limits?**
   - The system utilizes a cascading fallback logic that catches exceptions and moves to OpenRouter free models sequentially, avoiding data loss.
4. **How do you support 100K+ leads without crash?**
   - Custom async worker streams CSV parser rows and chunks them in batches of 50, limiting CPU and memory spikes on server nodes.
