import { Fighter, Fight, BoxingEvent, DataSyncRun } from '../../types/boxing';
import { EntityResolutionEngine } from './EntityResolution';
import { DataQualityValidator, QualityIssue } from '../validation/dataQuality';

export type SyncType = 'INITIAL' | 'INCREMENTAL' | 'SCHEDULED' | 'LIVE';

export interface IngestionLogEntry {
  id: string;
  source: string;
  syncType: SyncType;
  recordsSynced: number;
  recordsChanged: number;
  latencyMs: number;
  status: 'COMPLETED' | 'FAILED' | 'PARTIAL';
  timestamp: string;
  error?: string;
  qualityIssuesCount: number;
}

export class IngestionEngine {
  private syncLogs: IngestionLogEntry[] = [];
  private knownChecksums: Map<string, string> = new Map();
  private maxRetries: number = 3;

  /**
   * Safe execution wrapper with exponential backoff and jitter
   */
  public async executeWithRetry<T>(
    operation: () => Promise<T>,
    context: string,
    retryCount: number = 0
  ): Promise<T> {
    try {
      return await operation();
    } catch (err: any) {
      if (retryCount < this.maxRetries) {
        const backoffMs = Math.pow(2, retryCount) * 1000 + Math.random() * 500;
        console.warn(`[IngestionEngine] ${context} failed (${err.message}). Retrying in ${Math.round(backoffMs)}ms...`);
        await new Promise(resolve => setTimeout(resolve, backoffMs));
        return this.executeWithRetry(operation, context, retryCount + 1);
      }
      throw err;
    }
  }

  /**
   * Section 8: Initial Sync
   */
  public async performInitialSync(
    sourceName: string,
    incomingFighters: Fighter[],
    incomingEvents: BoxingEvent[]
  ): Promise<IngestionLogEntry> {
    const startTime = Date.now();
    const logId = `sync-init-${Date.now()}`;

    try {
      // Validate data quality before committing
      const qualityIssues = DataQualityValidator.validateFighters(incomingFighters);

      // Store initial checksums
      for (const f of incomingFighters) {
        this.knownChecksums.set(f.id, this.computeRecordChecksum(f));
      }

      const entry: IngestionLogEntry = {
        id: logId,
        source: sourceName,
        syncType: 'INITIAL',
        recordsSynced: incomingFighters.length + incomingEvents.length,
        recordsChanged: incomingFighters.length + incomingEvents.length,
        latencyMs: Date.now() - startTime,
        status: 'COMPLETED',
        timestamp: new Date().toISOString(),
        qualityIssuesCount: qualityIssues.length
      };

      this.syncLogs.unshift(entry);
      return entry;
    } catch (err: any) {
      const errorEntry: IngestionLogEntry = {
        id: logId,
        source: sourceName,
        syncType: 'INITIAL',
        recordsSynced: 0,
        recordsChanged: 0,
        latencyMs: Date.now() - startTime,
        status: 'FAILED',
        timestamp: new Date().toISOString(),
        error: err.message,
        qualityIssuesCount: 0
      };
      this.syncLogs.unshift(errorEntry);
      return errorEntry;
    }
  }

  /**
   * Section 8: Incremental Sync (detects only changed records via checksum)
   */
  public async performIncrementalSync(
    sourceName: string,
    incomingFighters: Fighter[]
  ): Promise<IngestionLogEntry> {
    const startTime = Date.now();
    const logId = `sync-inc-${Date.now()}`;
    let changed = 0;

    for (const f of incomingFighters) {
      const newChecksum = this.computeRecordChecksum(f);
      const existingChecksum = this.knownChecksums.get(f.id);

      if (!existingChecksum || existingChecksum !== newChecksum) {
        this.knownChecksums.set(f.id, newChecksum);
        changed++;
      }
    }

    const entry: IngestionLogEntry = {
      id: logId,
      source: sourceName,
      syncType: 'INCREMENTAL',
      recordsSynced: incomingFighters.length,
      recordsChanged: changed,
      latencyMs: Date.now() - startTime,
      status: 'COMPLETED',
      timestamp: new Date().toISOString(),
      qualityIssuesCount: 0
    };

    this.syncLogs.unshift(entry);
    return entry;
  }

  public getSyncLogs(): IngestionLogEntry[] {
    return this.syncLogs;
  }

  private computeRecordChecksum(entity: any): string {
    const serialized = JSON.stringify(entity);
    let hash = 0;
    for (let i = 0; i < serialized.length; i++) {
      const char = serialized.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return hash.toString(16);
  }
}

export const ingestionEngine = new IngestionEngine();
