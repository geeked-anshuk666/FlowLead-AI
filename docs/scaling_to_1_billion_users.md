# Scaling to 1 Billion Users

Roadmap for handling massive high-volume lead pipelines:

1. **Database Sharding:** Shard the PostgreSQL database by `import_id` or tenant code across dynamic database clusters.
2. **Monthly Partitioning:** Partition the `leads` table by `created_at` date ranges to keep indexes hot in RAM.
3. **Queue Scalability:** Replace the single-redis instance with a clustered Redis Sentinel queue for message dispatching.
4. **LLM Concurrency:** Distribute LLM requests across multiple API keys or private enterprise endpoints to bypass rate limits.
