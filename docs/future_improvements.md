# Future Improvements

Features roadmap:

1. **Persistent Message Queue:** Migrating to RabbitMQ or BullMQ if durable storage of queue tasks is required in production.
2. **Object Storage Stream Parser:** Accept uploads directly to AWS S3, utilizing Lambda triggers to parse chunks without loading buffers to memory.
3. **SSE to WebSocket migration:** Convert SSE progress endpoints to bidirection WebSockets if clients require full interactive controls.
4. **Rate Limit retry retry loops:** Implement custom queuing limits to retry batch tasks when Gemini APIs rate limit.
