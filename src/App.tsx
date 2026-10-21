import { useState, useMemo, useEffect } from 'react';
import { ScreenType, DiagnosticAnswers, LeadFormData } from './types';
import { calculateDiagnosisReport, calculateSimulation } from './utils/calculator';
import { Header } from './components/Header';
import { HeroScreen } from './components/HeroScreen';
import { QuizScreen } from './components/QuizScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { ResultScreen } from './components/ResultScreen';
import { ThanksScreen } from './components/ThanksScreen';
import { PdfModal } from './components/PdfModal';
import { PrivacyModal } from './components/PrivacyModal';
import { ConsultationModal } from './components/ConsultationModal';
import { Footer } from './components/Footer';

const DEFAULT_EMPLOYEE_COUNT = 100;

// The loading screen has no URL of its own and stays on /quiz
const SCREEN_PATHS: Partial<Record<ScreenType, string>> = {
  hero: '/',
  quiz: '/quiz',
  result: '/result',
  thanks: '/thanks'
};

// Answers are kept per tab so /result and /thanks survive a reload
const SESSION_KEY = 'beneft-diagnosis';

interface SavedSession {
  answers: DiagnosticAnswers;
  employeeCount: number;
  leadData: LeadFormData | null;
}

const loadSession = (): SavedSession | null => {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const isAnswered = (answers: DiagnosticAnswers) => Boolean(answers.q1 && answers.q2 && answers.q3);

// Map a URL to a screen, falling back when the data that screen needs is missing
const resolveScreen = (path: string, answers: DiagnosticAnswers, leadData: LeadFormData | null): ScreenType => {
  if (path === '/quiz') return 'quiz';
  if (path === '/thanks' && leadData) return 'thanks';
  if ((path === '/result' || path === '/thanks') && isAnswered(answers)) return 'result';
  return 'hero';
};

export default function App() {
  const [saved] = useState(loadSession);
  const [answers, setAnswers] = useState<DiagnosticAnswers>(saved?.answers ?? {});
  const [employeeCount, setEmployeeCount] = useState<number>(saved?.employeeCount ?? DEFAULT_EMPLOYEE_COUNT);
  const [leadData, setLeadData] = useState<LeadFormData | null>(saved?.leadData ?? null);
  const [screen, setScreen] = useState<ScreenType>(() => resolveScreen(window.location.pathname, answers, leadData));
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Modals
  const [isPdfOpen, setIsPdfOpen] = useState<boolean>(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState<boolean>(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState<boolean>(false);

  // Computed metrics
  const report = useMemo(() => calculateDiagnosisReport(answers), [answers]);
  const simulation = useMemo(() => calculateSimulation(employeeCount), [employeeCount]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigate = (next: ScreenType) => {
    setScreen(next);
    const path = SCREEN_PATHS[next];
    if (path && path !== window.location.pathname) {
      window.history.pushState(null, '', path);
    }
    scrollToTop();
  };

  const goHome = () => navigate('hero');

  // Normalize the URL when the requested page fell back (e.g. /result opened without answers)
  useEffect(() => {
    const path = SCREEN_PATHS[screen];
    if (path && path !== window.location.pathname) {
      window.history.replaceState(null, '', path);
    }
    // Only on first load; later changes go through navigate()
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setScreen(resolveScreen(window.location.pathname, answers, leadData));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [answers, leadData]);

  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ answers, employeeCount, leadData }));
    } catch {
      // Storage may be unavailable (private mode); the app still works without it
    }
  }, [answers, employeeCount, leadData]);

  // Clear previous answers and results so each diagnosis starts fresh
  const handleStartQuiz = () => {
    setAnswers({});
    setEmployeeCount(DEFAULT_EMPLOYEE_COUNT);
    setLeadData(null);
    setCurrentStep(0);
    navigate('quiz');
  };

  const handleRestartQuiz = handleStartQuiz;

  const handleSelectChoice = (questionId: number, key: string) => {
    setAnswers((prev) => ({
      ...prev,
      [`q${questionId}`]: key
    }));

    if (currentStep < 2) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Completed all 3 questions
      navigate('loading');
    }
  };

  const handlePrevQuestion = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleLoadingComplete = () => {
    navigate('result');
  };

  const handleSubmitLead = (data: LeadFormData) => {
    setIsSubmitting(true);
    // Simulate real-time report generation & lead capture
    setTimeout(() => {
      setLeadData(data);
      setIsSubmitting(false);
      navigate('thanks');
    }, 850);
  };

  const handleRequestProposal = () => {
    if (screen === 'result') {
      const formEl = document.getElementById('lead-form-section');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    handleStartQuiz();
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-blue-100 selection:text-blue-800 bg-[#f8fafc] text-slate-800">
      {/* Global Header */}
      <Header 
        onGoHome={goHome}
        onRequestProposal={handleRequestProposal}
      />

      {/* Main Dynamic Screens */}
      <main className="flex-grow">
        {screen === 'hero' && (
          <HeroScreen onStartQuiz={handleStartQuiz} />
        )}

        {screen === 'quiz' && (
          <QuizScreen 
            currentStep={currentStep}
            answers={answers}
            onSelectChoice={handleSelectChoice}
            onPrev={handlePrevQuestion}
            onGoHome={goHome}
          />
        )}

        {screen === 'loading' && (
          <LoadingScreen onComplete={handleLoadingComplete} />
        )}

        {screen === 'result' && (
          <ResultScreen 
            report={report}
            simulation={simulation}
            employeeCount={employeeCount}
            onEmployeeCountChange={setEmployeeCount}
            onRestartQuiz={handleRestartQuiz}
            onSubmitLead={handleSubmitLead}
            onOpenPrivacy={() => setIsPrivacyOpen(true)}
            isSubmitting={isSubmitting}
          />
        )}

        {screen === 'thanks' && (
          <ThanksScreen 
            leadData={leadData}
            onOpenPdf={() => setIsPdfOpen(true)}
            onOpenConsultation={() => setIsConsultationOpen(true)}
            onGoHome={goHome}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer 
        onGoHome={goHome}
        onRequestProposal={handleRequestProposal}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
      />

      {/* Modals */}
      <PdfModal 
        isOpen={isPdfOpen}
        onClose={() => setIsPdfOpen(false)}
        report={report}
        simulation={simulation}
        employeeCount={employeeCount}
        leadData={leadData}
      />

      <PrivacyModal 
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      <ConsultationModal 
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        userEmail={leadData?.email}
      />
    </div>
  );
}
