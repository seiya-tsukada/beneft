import type { ConsultationRequest, ConsultationResponse } from '../../server/consultation/types';
import { QUESTIONS } from '../data/questions';
import { DiagnosisReport, DiagnosticAnswers, LeadFormData, SimulationResult } from '../types';
import { getAnswer } from '../utils/answers';

interface ConsultationInput {
  lead: LeadFormData;
  answers: DiagnosticAnswers;
  report: DiagnosisReport;
  simulation: SimulationResult;
  employeeCount: number;
}

// Answers as the labels the applicant saw, so the emails read without the choice keys
const answerLabels = (answers: DiagnosticAnswers) =>
  QUESTIONS.map((q) => ({
    question: q.title,
    answer: q.choices.find((c) => c.key === getAnswer(answers, q.id))?.label ?? '未回答'
  }));

// Sends the consultation request; throws when the server did not accept it
export const requestConsultation = async ({ lead, answers, report, simulation, employeeCount }: ConsultationInput) => {
  const payload: ConsultationRequest = {
    lead,
    diagnosis: {
      answers: answerLabels(answers),
      headline: report.headline,
      planTitle: report.planTitle,
      employeeCount,
      formattedSavings: simulation.formattedSavings
    }
  };

  const res = await fetch('/api/consultation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const body: ConsultationResponse | null = await res.json().catch(() => null);
  if (!res.ok || !body?.ok) {
    throw new Error(body?.error ?? `HTTP ${res.status}`);
  }
};
