/**
 * FIGHT PULSE CANONICAL DATA PROVIDER FACADE
 * Exports unified boxingService and interfaces backed by ProviderManager
 */

export * from './contracts';
export { ProviderManager, providerManager, boxingService } from './ProviderManager';
export { FixtureDataProvider } from './FixtureDataProvider';
export { SportradarBoxingAdapter } from './adapters/SportradarBoxingAdapter';
export { TheOddsApiAdapter } from './adapters/TheOddsApiAdapter';
export { CompuboxTelemetryAdapter } from './adapters/CompuboxTelemetryAdapter';
export { FightPulseMomentumEngine } from '../momentum/momentumEngine';
export { DataQualityValidator } from '../validation/dataQuality';
export { IngestionEngine, ingestionEngine } from '../ingestion/IngestionEngine';
export { EntityResolutionEngine } from '../ingestion/EntityResolution';
