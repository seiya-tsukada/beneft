import { useState, useMemo } from 'react';
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

export default function App() {
  const [screen, setScreen] = useState<ScreenType>('hero');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<DiagnosticAnswers>({});
  const [employeeCount, setEmployeeCount] = useState<number>(DEFAULT_EMPLOYEE_COUNT);
  const [leadData, setLeadData] = useState<LeadFormData | null>(null);
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

  // Clear previous answers and results so each diagnosis starts fresh
  const handleStartQuiz = () => {
    setAnswers({});
    setEmployeeCount(DEFAULT_EMPLOYEE_COUNT);
    setLeadData(null);
    setCurrentStep(0);
    setScreen('quiz');
    scrollToTop();
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
      setScreen('loading');
      scrollToTop();
    }
  };

  const handlePrevQuestion = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleLoadingComplete = () => {
    setScreen('result');
    scrollToTop();
  };

  const handleSubmitLead = (data: LeadFormData) => {
    setIsSubmitting(true);
    // Simulate real-time report generation & lead capture
    setTimeout(() => {
      setLeadData(data);
      setIsSubmitting(false);
      setScreen('thanks');
      scrollToTop();
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
        onGoHome={() => { setScreen('hero'); scrollToTop(); }}
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
            onGoHome={() => { setScreen('hero'); scrollToTop(); }}
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
            onGoHome={() => { setScreen('hero'); scrollToTop(); }}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer 
        onGoHome={() => { setScreen('hero'); scrollToTop(); }}
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
