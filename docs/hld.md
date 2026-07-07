# High-Level Design (HLD)

This document describes the high-level architecture.

## Overview Flow

```
[ Next.js Web Client ]
       │  (HTTP Upload)
       ▼
[ Express API Server ] ──► (Publish Event) ──► [ Redis Pub/Sub ]
       │                                             │
       │                                             ▼
       │                                     [ Worker Pool ]
       │                                             │
       │  (SQL Queries)                              ▼
[ PostgreSQL Database ] ◄────────────────── [ Save Leads ]
```

- **File Upload:** Uploaded to memory, parsed, task published to Redis Pub/Sub.
- **Asynchronous Workers:** Subscribe to tasks, chunk rows, route mapping to AI engine, save standard database leads.
- **Event Streaming:** Progress updates published to Redis, pushed to client via SSE.
