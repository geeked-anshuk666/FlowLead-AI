import { connectDb } from '../config/db.js';
import { LeadService } from '../services/lead.service.js';
import { AiService } from '../services/ai.service.js';
import { QueueService } from '../services/queue.service.js';
import dotenv from 'dotenv';

dotenv.config();

const BATCH_SIZE = 50;

async function startWorker() {
  await connectDb();

  console.log('Worker listening on channel "csv_imports"...');

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  await QueueService.subscribe('csv_imports', async (message) => {
    try {
      const task = JSON.parse(message);
      const { runId, rows } = task;

      console.log(`Starting execution for Import Run: ${runId} with ${rows.length} rows`);
      await LeadService.updateImportRunStatus(runId, 'PROCESSING');

      let processedCount = 0;
      let totalSkipped = 0;

      // Dynamically compute batch size for better UX on smaller files
      const dynamicBatchSize = rows.length < 30 ? Math.max(1, Math.ceil(rows.length / 5)) : BATCH_SIZE;

      // Process rows in dynamic batch sizes to scale to 100K+ leads
      for (let i = 0; i < rows.length; i += dynamicBatchSize) {
        const batch = rows.slice(i, i + dynamicBatchSize);
        
        try {
          // Send batch for AI mapping
          const mappedLeads = await AiService.mapLeadsBatch(batch);
          
          // Save mapped leads to PostgreSQL
          if (mappedLeads.length > 0) {
            await LeadService.saveLeadsBatch(runId, mappedLeads);
          }

          // Count skipped rows in the AI response
          const batchSkipped = batch.length - mappedLeads.length;
          processedCount += mappedLeads.length;
          totalSkipped += batchSkipped;

          // Update counts in PostgreSQL database
          await LeadService.incrementImportCounts(runId, mappedLeads.length, batchSkipped);

          // Publish real-time progress update to Redis Pub/Sub
          const progressPercent = Math.round(((i + batch.length) / rows.length) * 100);
          await QueueService.publish(
            `import_progress:${runId}`,
            JSON.stringify({
              status: 'PROCESSING',
              progress: progressPercent,
              processed: processedCount,
              skipped: totalSkipped
            })
          );
        } catch (batchErr) {
          console.error(`Failed to process batch indices ${i} to ${i + batch.length}:`, batchErr);
          // Mark the entire batch as skipped on failure to keep pipeline moving
          totalSkipped += batch.length;
          await LeadService.incrementImportCounts(runId, 0, batch.length);

          const progressPercent = Math.round(((i + batch.length) / rows.length) * 100);
          await QueueService.publish(
            `import_progress:${runId}`,
            JSON.stringify({
              status: 'PROCESSING',
              progress: progressPercent,
              processed: processedCount,
              skipped: totalSkipped
            })
          );
        }
        // Small delay to make progress animations smooth and visible on client
        await sleep(800);
      }

      // Mark the run as COMPLETED
      await LeadService.updateImportRunStatus(runId, 'COMPLETED');
      await QueueService.publish(
        `import_progress:${runId}`,
        JSON.stringify({
          status: 'COMPLETED',
          progress: 100,
          processed: processedCount,
          skipped: totalSkipped
        })
      );
      console.log(`Finished processing Import Run: ${runId}`);
    } catch (err) {
      console.error('Error in subscriber loop:', err);
    }
  });
}

startWorker().catch((err) => {
  console.error('Worker failed to start:', err);
});
