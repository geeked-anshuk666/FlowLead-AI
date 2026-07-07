# Low-Level Design (LLD)

Deep-dive code design specs.

## Module Details
- **`AiService`:** Houses Gemini SDK model declarations and OpenRouter REST requests. Tracks rate limit failures and falls back to cheap models inside a cascade loop.
- **`CsvService`:** Leverages Node streams and `csv-parser` pipeline hooks to process text chunks. Filters invalid lines lacking email or mobile values.
- **`QueueService`:** Thin abstraction wrapper creating and subscribing to Redis channels.
- **`LeadService`:** Coordinates Prisma database queries.
