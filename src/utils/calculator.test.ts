import { describe, expect, it } from 'vitest';
import { QUESTIONS } from '../data/questions';
import { ANALYSIS_BY_SITUATION, FEATURE_BY_WORKSTYLE, PLAN_BY_GOAL } from '../data/diagnosis';
import { calculateDiagnosisReport, calculateSimulation } from './calculator';

describe('calculateDiagnosisReport', () => {
  it('uses the default copy when nothing is answered', () => {
    const report = calculateDiagnosisReport({});
    expect(report.headline).toBe(ANALYSIS_BY_SITUATION.low_usage.headline);
    expect(report.planTitle).toBe(PLAN_BY_GOAL.high_usage.planTitle);
    expect(report.features[2]).toEqual(FEATURE_BY_WORKSTYLE.remote_work);
  });

  it('picks copy for each answer', () => {
    const report = calculateDiagnosisReport({ q1: 'not_introduced', q2: 'recruiting', q3: 'office_work' });
    expect(report.headline).toBe(ANALYSIS_BY_SITUATION.not_introduced.headline);
    expect(report.planTitle).toBe(PLAN_BY_GOAL.recruiting.planTitle);
    expect(report.features).toHaveLength(3);
    expect(report.features[2].title).toBe(FEATURE_BY_WORKSTYLE.office_work.title);
  });

  it('falls back to the generic workstyle feature for an unknown Q3 key', () => {
    expect(calculateDiagnosisReport({ q3: 'unknown' }).features[2].title).toBe('多様な働き方に完全フィット');
  });

  // Keeps questions.ts and diagnosis.ts in sync when choices are added or renamed
  it('has copy for every choice in the questions', () => {
    const tables = [ANALYSIS_BY_SITUATION, PLAN_BY_GOAL, FEATURE_BY_WORKSTYLE];
    QUESTIONS.forEach((q, i) => {
      expect(Object.keys(tables[i]).sort()).toEqual(q.choices.map((c) => c.key).sort());
    });
  });
});

describe('calculateSimulation', () => {
  it('scales with employee count', () => {
    const sim = calculateSimulation(100);
    expect(sim.annualSavings).toBe(480000);
    expect(sim.formattedSavings).toBe('約 480,000 円');
    expect(sim.adminHours).toBe(120);
    expect(sim.utilizationMultiplier).toBe(5.7);
  });
});
