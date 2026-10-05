import { CompuboxStats, MomentumSnapshot, MomentumHistoryPoint } from '../../types/boxing';

export interface MomentumCalculationInput {
  round: number;
  statsA: CompuboxStats;
  statsB: CompuboxStats;
  previousMomentumA?: number; // Previous round score (0-100)
  knockdownsA?: number; // Knockdowns scored by A on B
  knockdownsB?: number; // Knockdowns scored by B on A
}

export interface MomentumCalculationResult {
  round: number;
  isAvailable: boolean;
  statusText?: string;
  fighterAScore: number; // 0 to 100
  fighterBScore: number; // 0 to 100
  advantage: 'A' | 'B' | 'EVEN';
  advantageDifferential: number;
  explanationTitle: string;
  explanationPoints: string[];
  traceableFactors: {
    name: string;
    weight: number;
    contributionA: number;
    contributionB: number;
    description: string;
  }[];
  disclaimer: string;
}

/**
 * FIGHT PULSE PROPRIETARY MOMENTUM ENGINE
 * Evaluates round-by-round ring telemetry using a deterministic mathematical model:
 *
 * 1. Punch Landing Differential (35% weight)
 * 2. Power Punch Impact (25% weight, 1.5x power multiplier)
 * 3. Connection Accuracy Differential (20% weight)
 * 4. Knockdown Impact (20% weight, -35 net shift per knockdown suffered)
 *
 * Section 14 Enforcement:
 * - Momentum may ONLY be calculated when verified underlying punch statistics exist.
 * - Never generate momentum simply because the UI needs one.
 * - When data is missing, emits MOMENTUM UNAVAILABLE.
 * - Strictly labelled as a CALCULATED model, never an official score.
 */
export class FightPulseMomentumEngine {
  
  public static calculateRoundMomentum(input: MomentumCalculationInput): MomentumCalculationResult {
    const { statsA, statsB, round } = input;
    const disclaimer = 'Calculated by Fight Pulse deterministic momentum algorithm. Not an official judge scorecard or bookmaker market.';

    // Section 14: Strict input validation
    const totalThrown = (statsA?.totalPunchesThrown || 0) + (statsB?.totalPunchesThrown || 0);
    const totalLanded = (statsA?.totalPunchesLanded || 0) + (statsB?.totalPunchesLanded || 0);

    if (!statsA || !statsB || (totalThrown === 0 && totalLanded === 0)) {
      return {
        round,
        isAvailable: false,
        statusText: 'MOMENTUM UNAVAILABLE',
        fighterAScore: 50,
        fighterBScore: 50,
        advantage: 'EVEN',
        advantageDifferential: 0,
        explanationTitle: 'Momentum Unavailable',
        explanationPoints: [
          'Verified round punch statistics have not been received from the ringside feed for this round.',
          'Fight Pulse does not synthesize punch counts or fabricate momentum without verified telemetry.'
        ],
        traceableFactors: [],
        disclaimer
      };
    }

    // 1. Punch Landed Differential
    const landedA = statsA.totalPunchesLanded || 0;
    const landedB = statsB.totalPunchesLanded || 0;
    const landedSum = landedA + landedB;
    const landedShareA = landedSum > 0 ? (landedA / landedSum) : 0.5;

    // 2. Power Punch Volume & Damage Potential (weighted 1.5x)
    const powerA = (statsA.powerLanded || 0) * 1.5;
    const powerB = (statsB.powerLanded || 0) * 1.5;
    const totalPower = powerA + powerB;
    const powerShareA = totalPower > 0 ? (powerA / totalPower) : 0.5;

    // 3. Accuracy Differential
    const accA = statsA.accuracy || 0;
    const accB = statsB.accuracy || 0;
    const accSum = accA + accB;
    const accShareA = accSum > 0 ? (accA / accSum) : 0.5;

    // 4. Knockdown Impact
    const kdScoreA = input.knockdownsA || 0; // A knocked down B
    const kdScoreB = input.knockdownsB || 0; // B knocked down A
    const netKdShift = (kdScoreA - kdScoreB) * 18; // Up to 36 point swing

    // Base composite calculation (0.0 to 1.0)
    let compositeA = (
      (landedShareA * 0.35) +
      (powerShareA * 0.30) +
      (accShareA * 0.20) +
      (0.5 * 0.15) // baseline stability
    );

    // Convert to 0 - 100 integer
    let scoreA = Math.round(compositeA * 100) + netKdShift;

    // Smoothing with previous round if available (70% current, 30% previous)
    if (input.previousMomentumA !== undefined) {
      scoreA = Math.round((scoreA * 0.70) + (input.previousMomentumA * 0.30));
    }

    // Clamp strictly between 5 and 95
    scoreA = Math.max(5, Math.min(95, scoreA));
    const scoreB = 100 - scoreA;

    // Generate explainable telemetry points
    const explanationPoints: string[] = [];
    const traceableFactors = [];

    // Landed factor
    const landedDiff = Math.abs(landedA - landedB);
    const landedLeader = landedA >= landedB ? 'A' : 'B';
    traceableFactors.push({
      name: 'Punches Landed Differential',
      weight: 0.35,
      contributionA: Math.round(landedShareA * 35),
      contributionB: Math.round((1 - landedShareA) * 35),
      description: `${landedA} landed vs ${landedB} (${landedDiff} punch difference)`
    });

    if (landedDiff > 4) {
      explanationPoints.push(
        `Fighter ${landedLeader} outlanded opponent by ${landedDiff} total punches (${landedLeader === 'A' ? landedA : landedB} vs ${landedLeader === 'A' ? landedB : landedA}).`
      );
    }

    // Power factor
    const powerA_raw = statsA.powerLanded || 0;
    const powerB_raw = statsB.powerLanded || 0;
    traceableFactors.push({
      name: 'Power Punch Precision',
      weight: 0.30,
      contributionA: Math.round(powerShareA * 30),
      contributionB: Math.round((1 - powerShareA) * 30),
      description: `${powerA_raw} power punches vs ${powerB_raw}`
    });

    if (powerA_raw !== powerB_raw) {
      const powerLeader = powerA_raw > powerB_raw ? 'A' : 'B';
      explanationPoints.push(
        `Fighter ${powerLeader} connected with higher impact power shots (${powerA_raw} vs ${powerB_raw}), heavily dictating exchange exchanges.`
      );
    }

    // Accuracy factor
    traceableFactors.push({
      name: 'Punch Accuracy',
      weight: 0.20,
      contributionA: Math.round(accShareA * 20),
      contributionB: Math.round((1 - accShareA) * 20),
      description: `${accA}% connection rate vs ${accB}%`
    });

    if (Math.abs(accA - accB) >= 8) {
      const accLeader = accA > accB ? 'A' : 'B';
      explanationPoints.push(
        `Superior punch selection and defensive slipping: Fighter ${accLeader} operated at ${accLeader === 'A' ? accA : accB}% accuracy.`
      );
    }

    // Knockdown factor
    if (kdScoreA > 0 || kdScoreB > 0) {
      const kdLeader = kdScoreA > kdScoreB ? 'A' : 'B';
      explanationPoints.push(
        `Official knockdown registered in favor of Fighter ${kdLeader}, inflicting heavy ring control penalty.`
      );
    }

    if (explanationPoints.length === 0) {
      explanationPoints.push('Competitive round with evenly matched punch outputs and defense.');
    }

    let explanationTitle = 'Balanced Ring Warfare';
    if (scoreA >= 65) {
      explanationTitle = 'Dominant Precision & Volume Control';
    } else if (scoreA <= 35) {
      explanationTitle = 'Opponent Dictating Range & Power';
    } else if (scoreA >= 55) {
      explanationTitle = 'Slight Tactical Advantage';
    } else if (scoreA <= 45) {
      explanationTitle = 'Opponent Edge in Clean Landing';
    }

    return {
      round,
      isAvailable: true,
      fighterAScore: scoreA,
      fighterBScore: scoreB,
      advantage: scoreA > 52 ? 'A' : scoreA < 48 ? 'B' : 'EVEN',
      advantageDifferential: Math.abs(scoreA - scoreB),
      explanationTitle,
      explanationPoints,
      traceableFactors,
      disclaimer
    };
  }
}
