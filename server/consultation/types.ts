// Shared by the browser (src/lib/api.ts) and the API handler; keep it free of runtime code

export interface ConsultationRequest {
  lead: {
    company: string;
    name: string;
    email: string;
    position: string;
  };
  // Summary of the result screen, included in the emails for context
  diagnosis: {
    answers: { question: string; answer: string }[];
    headline: string;
    planTitle: string;
    employeeCount: number;
    formattedSavings: string;
  };
}

export interface ConsultationResponse {
  ok: boolean;
  error?: string;
}
