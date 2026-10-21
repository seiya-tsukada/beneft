import { useState, useMemo, useEffect } from 'react';
import { ScreenType, DiagnosticAnswers, LeadFormData } from './types';
import { EMPLOYEE_COUNT } from './data/content';
import { QUESTIONS } from './data/questions';
import { resolveScreen, syncUrl } from './lib/routing';
import { loadSession, saveSession } from './lib/session';
import { setAnswer } from './utils/answers';
import { calculateDiagnosisReport, calculateSimulation } from './utils/calculator';
import { Header } from './components/Header';
import { HeroScreen } from './components/HeroScreen';
import { QuizScreen } from './components/QuizScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { ResultScreen } from './components/ResultScreen';
import { LEAD_FORM_ID } from './components/result/LeadForm';
import { ThanksScreen } from './components/ThanksScreen';
import { PdfModal } from './components/PdfModal';
import { PrivacyModal } from './components/PrivacyModal';
import { ConsultationModal } from './components/ConsultationModal';
import { Footer } from './components/Footer';

// Simulated delay for report generation & lead capture (ms)
const SUBMIT_DELAY = 850;

export default function App() {
  const [saved] = useState(loadSession);
  const [answers, setAnswers] = useState<DiagnosticAnswers>(saved?.answers ?? {});
  const [employeeCount, setEmployeeCount] = useState<number>(saved?.employeeCount ?? EMPLOYEE_COUNT.default);
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
    syncUrl(next, 'push');
    scrollToTop();
  };

  const goHome = () => navigate('hero');

  // Normalize the URL when the requested page fell back (e.g. /result opened without answers)
  useEffect(() => {
    syncUrl(screen, 'replace');
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
    saveSession({ answers, employeeCount, leadData });
  }, [answers, employeeCount, leadData]);

  // Clear previous answers and results so each diagnosis starts fresh
  const handleStartQuiz = () => {
    setAnswers({});
    setEmployeeCount(EMPLOYEE_COUNT.default);
    setLeadData(null);
    setCurrentStep(0);
    navigate('quiz');
  };

  const handleSelectChoice = (questionId: number, key: string) => {
    setAnswers((prev) => setAnswer(prev, questionId, key));

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
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
    // TODO: send the lead to a CRM / form backend; for now this only simulates the request
    setTimeout(() => {
      setLeadData(data);
      setIsSubmitting(false);
      navigate('thanks');
    }, SUBMIT_DELAY);
  };

  const handleRequestProposal = () => {
    if (screen === 'result') {
      const formEl = document.getElementById(LEAD_FORM_ID);
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
            onRestartQuiz={handleStartQuiz}
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
