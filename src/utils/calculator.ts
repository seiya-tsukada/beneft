import { DiagnosticAnswers, DiagnosisReport, SimulationResult } from '../types';
import {
  ANALYSIS_BY_SITUATION,
  BASE_FEATURES,
  DEFAULT_ANALYSIS,
  DEFAULT_PLAN,
  DEFAULT_WORKSTYLE_FEATURE,
  FEATURE_BY_WORKSTYLE,
  PAIN_POINTS,
  PLAN_BY_GOAL
} from '../data/diagnosis';

// Wasteful fixed overhead removed per employee per year (JPY)
const ANNUAL_SAVINGS_PER_EMPLOYEE = 4800;
const ADMIN_HOURS_PER_EMPLOYEE = 1.2;
const UTILIZATION_CURRENT = 15;
const UTILIZATION_PROJECTED = 86;

const lookup = <T,>(table: Record<string, T>, key: string | undefined, fallback: T): T =>
  (key && table[key]) || fallback;

export function calculateDiagnosisReport(answers: DiagnosticAnswers): DiagnosisReport {
  const analysis = lookup(ANALYSIS_BY_SITUATION, answers.q1, DEFAULT_ANALYSIS);
  const plan = lookup(PLAN_BY_GOAL, answers.q2, DEFAULT_PLAN);
  // An unanswered Q3 falls back to the remote-work feature, an unknown one to the generic feature
  const workstyleFeature = lookup(FEATURE_BY_WORKSTYLE, answers.q3 || 'remote_work', DEFAULT_WORKSTYLE_FEATURE);

  return {
    ...analysis,
    painPoints: PAIN_POINTS,
    ...plan,
    features: [...BASE_FEATURES, workstyleFeature]
  };
}

export function calculateSimulation(employeeCount: number): SimulationResult {
  const annualSavings = employeeCount * ANNUAL_SAVINGS_PER_EMPLOYEE;

  return {
    annualSavings,
    formattedSavings: `約 ${annualSavings.toLocaleString('ja-JP')} 円`,
    adminHours: Math.round(employeeCount * ADMIN_HOURS_PER_EMPLOYEE),
    utilizationCurrent: UTILIZATION_CURRENT,
    utilizationProjected: UTILIZATION_PROJECTED,
    utilizationMultiplier: Math.round((UTILIZATION_PROJECTED / UTILIZATION_CURRENT) * 10) / 10
  };
}
