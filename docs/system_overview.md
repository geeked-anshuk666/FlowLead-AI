# System Overview

The AI-Based CSV Lead Importer is an intelligent tool designed to accept CSV files of any column structure, preview the content, and utilize LLM mapping to extract clean lead records matching the standard GrowEasy CRM database schema.

## Key Architectures
- **Client Tier:** Next.js (Tailwind CSS, Client-side CSV parsing).
- **API Tier:** Express REST backend.
- **Worker Tier:** Decoupled background workers processing segments asynchronously.
- **Cache/PubSub Backplane:** Redis for message sharing and task notifications.
- **Database Store:** PostgreSQL (structured transactional records).
