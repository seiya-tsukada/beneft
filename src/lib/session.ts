import { DiagnosticAnswers, LeadFormData } from '../types';

// Answers are kept per tab so /result and /thanks survive a reload
const SESSION_KEY = 'beneft-diagnosis';

export interface SavedSession {
  answers: DiagnosticAnswers;
  employeeCount: number;
  leadData: LeadFormData | null;
}

export const loadSession = (): SavedSession | null => {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const saveSession = (session: SavedSession) => {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    // Storage may be unavailable (private mode); the app still works without it
  }
};
