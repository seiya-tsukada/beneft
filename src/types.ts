export type ScreenType = 'hero' | 'quiz' | 'loading' | 'result' | 'thanks';

export interface Choice {
  key: string;
  label: string;
  sub: string;
  icon: string;
  iconBg: string;
}

export interface Question {
  id: number;
  step: number;
  category: string;
  title: string;
  subtitle: string;
  choices: Choice[];
}

export interface DiagnosticAnswers {
  q1?: string;
  q2?: string;
  q3?: string;
}

export interface PainPoint {
  title: string;
  desc: string;
  icon: string;
  color: string;
}

export interface PlanFeature {
  title: string;
  desc: string;
  icon: string;
}

export interface DiagnosisReport {
  headline: string;
  bodyText: string;
  painPoints: PainPoint[];
  planTitle: string;
  planConcept: string;
  features: PlanFeature[];
}

export interface SimulationResult {
  annualSavings: number;
  formattedSavings: string;
  adminHours: number;
  utilizationCurrent: number;
  utilizationProjected: number;
}

export interface LeadFormData {
  company: string;
  name: string;
  email: string;
  position: string;
}
