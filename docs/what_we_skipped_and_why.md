# What We Skipped and Why

Out of scope items:

1. **User Auth and Organizations:** Skipped to keep the CSV parsing and AI pipeline clean and lightweight for the assignment focus.
2. **Durable Queuing (BullMQ/RabbitMQ):** Skipped in favor of pure Redis Pub/Sub to minimize infrastructure configurations and run easily in local WSL setups.
3. **Advanced duplication logic (Upserts):** Duplicate entries are currently stored as separate records. Complex merge rules were skipped to prevent parsing delays.
