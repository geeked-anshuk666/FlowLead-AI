# Known Tradeoffs

Technical tradeoffs chosen during implementation:

1. **Redis Pub/Sub vs Durable Queue:**
   - Tradeoff: Pub/Sub drops messages if no subscriber is active.
   - Mitigation: Handled via system status validation scripts and reliable Docker startup limits.
2. **In-Memory Upload Processing:**
   - Tradeoff: Capping uploads to 100MB works locally, but extremely huge files can spike memory.
   - Mitigation: Production setups would stream directly to S3/Object Storage instead of buffer buffers.
3. **Local client parser preview:**
   - Tradeoff: Next.js frontend parses the first 10 lines of the CSV locally to render previews, which works for typical CSVs but can fail on raw binary files.
   - Mitigation: Proper client-side file-type checks are implemented.
