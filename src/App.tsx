import React, { useState, useEffect } from 'react';
import { NavigationTab, UserProgress } from './types';
import { HeaderNavigation } from './components/HeaderNavigation';
import { MobileDrawer } from './components/MobileDrawer';
import { HomeSection } from './components/HomeSection';
import { LearnChessSection } from './components/LearnChessSection';
import { PuzzlesSection } from './components/PuzzlesSection';
import { TournamentsSection } from './components/TournamentsSection';
import { AcademySection } from './components/AcademySection';
import { ContactSection } from './components/ContactSection';
import { InstallPromptModal } from './components/InstallPromptModal';
import { Footer } from './components/Footer';

// Interface for beforeinstallprompt event
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);

  // PWA Install Prompt State
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState<boolean>(false);

  // User Progress Persistence State
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem('kingstars_chess_progress');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      /* ignore */
    }
    return {
      score: 0,
      mate1Solved: [],
      mate2Solved: [],
      lessonsCompleted: [],
      lastActiveMate1: 0,
      lastActiveMate2: 0,
    };
  });

  // Listen for PWA beforeinstallprompt and appinstalled events
  useEffect(() => {
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as any).standalone === true;

    if (isStandalone) {
      setIsInstallable(false);
    } else {
      setIsInstallable(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleTriggerInstall = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          setIsInstallable(false);
          setDeferredPrompt(null);
        }
      } catch {
        /* ignore */
      }
    } else {
      setIsInstallModalOpen(true);
    }
  };

  const totalSolvedCount = progress.mate1Solved.length + progress.mate2Solved.length;

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0f1d] text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Sticky Header */}
      <HeaderNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        installable={isInstallable}
        onInstallClick={handleTriggerInstall}
        score={progress.score}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        installable={isInstallable}
        onInstallClick={handleTriggerInstall}
        score={progress.score}
        mate1SolvedCount={progress.mate1Solved.length}
        mate2SolvedCount={progress.mate2Solved.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        
        {activeTab === 'home' && (
          <HomeSection
            setActiveTab={setActiveTab}
            installable={isInstallable}
            onInstallClick={handleTriggerInstall}
            score={progress.score}
            solvedCount={totalSolvedCount}
          />
        )}

        {activeTab === 'learn' && (
          <LearnChessSection />
        )}

        {activeTab === 'puzzles' && (
          <PuzzlesSection
            initialType="mate1"
            progress={progress}
            setProgress={setProgress}
          />
        )}

        {activeTab === 'mate1' && (
          <PuzzlesSection
            initialType="mate1"
            progress={progress}
            setProgress={setProgress}
          />
        )}

        {activeTab === 'mate2' && (
          <PuzzlesSection
            initialType="mate2"
            progress={progress}
            setProgress={setProgress}
          />
        )}

        {activeTab === 'tournaments' && (
          <TournamentsSection />
        )}

        {activeTab === 'academy' && (
          <AcademySection />
        )}

        {activeTab === 'contact' && (
          <ContactSection />
        )}

      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* PWA Installation Guidance Modal */}
      <InstallPromptModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        onInstall={handleTriggerInstall}
        isInstallable={isInstallable}
      />

    </div>
  );
}
