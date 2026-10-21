import { QUESTIONS } from '../data/questions';
import { DiagnosticAnswers } from '../types';

const answerField = (questionId: number) => `q${questionId}` as keyof DiagnosticAnswers;

export const getAnswer = (answers: DiagnosticAnswers, questionId: number) => answers[answerField(questionId)];

export const setAnswer = (answers: DiagnosticAnswers, questionId: number, key: string): DiagnosticAnswers => ({
  ...answers,
  [answerField(questionId)]: key
});

export const isAnswered = (answers: DiagnosticAnswers) => QUESTIONS.every((q) => Boolean(getAnswer(answers, q.id)));
