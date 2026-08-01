import React from 'react';
import { BookOpen, Puzzle, Award, Download, CheckCircle, ShieldCheck, Sparkles, Smartphone, ChevronRight } from 'lucide-react';
import { NavigationTab } from '../types';

interface HomeSectionProps {
  setActiveTab: (tab: NavigationTab) => void;
  installable: boolean;
  onInstallClick: () => void;
  score: number;
  solvedCount: number;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  setActiveTab,
  installable,
  onInstallClick,
  score,
  solvedCount,
}) => {
  return (
    <div className="space-y-10 pb-12">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl border border-amber-500/25 bg-gradient-to-b from-[#131b2e] via-[#0d1424] to-[#0a0f1d] p-6 shadow-2xl sm:p-10">
        
        {/* Subtle Ambient Background Effects */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl"></div>
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          
          {/* Logo Emblem */}
          <div className="relative mb-5 flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-amber-500/40 bg-slate-900/90 p-2 shadow-xl shadow-amber-500/15 ring-4 ring-amber-500/10 sm:h-28 sm:w-28">
            <img
              src="/icons/logo.png"
              alt="Trincomalee Kingstars Chess Academy"
              className="h-full w-full object-contain"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="font-serif-title text-4xl font-black text-amber-400">K</span>
          </div>

          {/* Academy Name */}
          <h1 className="font-serif-title text-2xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
            Trincomalee <span className="gold-gradient-text">Kingstars</span> Chess Academy
          </h1>

          {/* Tagline */}
          <div className="mt-3 flex flex-col items-center gap-1 sm:flex-row sm:gap-2">
            <p className="text-sm font-semibold italic text-amber-300 sm:text-lg">
              "Every move shapes the mind."
            </p>
            <span className="hidden text-slate-500 sm:inline">•</span>
            <p className="text-xs font-bold tracking-wide text-slate-300 uppercase sm:text-sm">
              Shaping futures through Chess.
            </p>
          </div>

          {/* Short Introduction */}
          <p className="mt-4 max-w-2xl text-xs leading-relaxed text-slate-300 sm:text-sm sm:leading-relaxed">
            Welcome to Eastern Province's premier chess learning hub! We empower children with critical thinking, spatial logic, emotional discipline, and competitive mastery through structured interactive lessons and 200 verified tactical puzzles.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:max-w-xl sm:flex-row sm:justify-center">
            <button
              onClick={() => setActiveTab('learn')}
              className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/25 transition-all hover:from-amber-400 hover:to-amber-500 active:scale-95"
            >
              <BookOpen className="h-5 w-5" />
              <span>Learn Chess</span>
            </button>

            <button
              onClick={() => setActiveTab('puzzles')}
              className="flex items-center justify-center gap-2 rounded-xl border border-amber-500/40 bg-slate-900/80 px-5 py-3.5 text-sm font-bold text-amber-300 transition-all hover:bg-slate-800 hover:text-amber-200 active:scale-95"
            >
              <Puzzle className="h-5 w-5 text-amber-400" />
              <span>Play Puzzles (200)</span>
            </button>

            {installable && (
              <button
                onClick={onInstallClick}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-5 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg shadow-amber-500/30 transition-all hover:brightness-110 active:scale-95"
              >
                <Download className="h-5 w-5" />
                <span>Install App</span>
              </button>
            )}

            <a
              href={`https://wa.me/94715119204?text=${encodeURIComponent("Hello Trincomalee Kingstars Chess Academy,\n\nI would like to get more information about Chess Training.\n\nLocation: Trincomalee")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/25 transition-all hover:from-emerald-400 hover:to-teal-500 active:scale-95"
            >
              <Smartphone className="h-5 w-5" />
              <span>Contact Academy</span>
            </a>
          </div>

          {/* Stats Bar */}
          <div className="mt-8 grid w-full max-w-xl grid-cols-3 gap-2 rounded-2xl border border-amber-500/20 bg-slate-900/60 p-3 sm:gap-4 sm:p-4">
            <div className="text-center">
              <p className="text-[10px] uppercase font-semibold text-slate-400 sm:text-xs">Interactive Puzzles</p>
              <p className="font-serif-title text-base font-extrabold text-amber-400 sm:text-xl">200</p>
            </div>
            <div className="border-x border-slate-800 text-center">
              <p className="text-[10px] uppercase font-semibold text-slate-400 sm:text-xs">Your Solved</p>
              <p className="font-serif-title text-base font-extrabold text-emerald-400 sm:text-xl">{solvedCount} / 200</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase font-semibold text-slate-400 sm:text-xs">Academy Score</p>
              <p className="font-serif-title text-base font-extrabold text-amber-300 sm:text-xl">{score} PTS</p>
            </div>
          </div>

        </div>
      </section>

      {/* QUICK FEATURE HIGHLIGHT CARDS */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        
        <div 
          onClick={() => setActiveTab('learn')}
          className="group cursor-pointer rounded-2xl border border-amber-500/20 bg-[#131b2e] p-5 shadow-lg transition-all hover:-translate-y-1 hover:border-amber-500/50 hover:bg-[#1a243d]"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950">
            <BookOpen className="h-5 w-5" />
          </div>
          <h3 className="font-serif-title text-base font-bold text-white">Interactive Lessons</h3>
          <p className="mt-1 text-xs text-slate-400">
            Learn movement, values, and strategies for King, Queen, Rook, Bishop, Knight & Pawn with live demo board.
          </p>
        </div>

        <div 
          onClick={() => setActiveTab('mate1')}
          className="group cursor-pointer rounded-2xl border border-amber-500/20 bg-[#131b2e] p-5 shadow-lg transition-all hover:-translate-y-1 hover:border-amber-500/50 hover:bg-[#1a243d]"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950">
            <Puzzle className="h-5 w-5" />
          </div>
          <h3 className="font-serif-title text-base font-bold text-white">100 Mate in 1</h3>
          <p className="mt-1 text-xs text-slate-400">
            100 verified one-move checkmate challenges to build instant tactical pattern recognition.
          </p>
        </div>

        <div 
          onClick={() => setActiveTab('mate2')}
          className="group cursor-pointer rounded-2xl border border-amber-500/20 bg-[#131b2e] p-5 shadow-lg transition-all hover:-translate-y-1 hover:border-amber-500/50 hover:bg-[#1a243d]"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950">
            <Sparkles className="h-5 w-5" />
          </div>
          <h3 className="font-serif-title text-base font-bold text-white">100 Mate in 2</h3>
          <p className="mt-1 text-xs text-slate-400">
            100 verified two-move tactical puzzles with interactive opponent counter-moves.
          </p>
        </div>

        <div 
          onClick={() => setActiveTab('tournaments')}
          className="group cursor-pointer rounded-2xl border border-amber-500/20 bg-[#131b2e] p-5 shadow-lg transition-all hover:-translate-y-1 hover:border-amber-500/50 hover:bg-[#1a243d]"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400 group-hover:bg-purple-500 group-hover:text-slate-950">
            <Award className="h-5 w-5" />
          </div>
          <h3 className="font-serif-title text-base font-bold text-white">Tournaments & Academy</h3>
          <p className="mt-1 text-xs text-slate-400">
            Check upcoming regional tournaments, FIDE rated events, and direct WhatsApp registration.
          </p>
        </div>

      </section>

      {/* PWA INSTALLATION INSTRUCTION CARD */}
      <section className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-slate-900 via-[#111827] to-slate-900 p-6 shadow-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400">
              <Smartphone className="h-3.5 w-3.5" />
              <span>Installable Android Mobile PWA</span>
            </div>
            <h2 className="font-serif-title text-lg font-bold text-white sm:text-xl">
              Install Kingstars Chess on Your Phone Free!
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
              No Google Play Store needed! This app works offline, loads instantly, and saves your progress directly on your phone.
            </p>
          </div>

          {/* Trigger Button or Guide */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {installable ? (
              <button
                onClick={onInstallClick}
                className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-xs font-bold text-slate-950 shadow-lg shadow-amber-500/25 transition-all hover:bg-amber-400 active:scale-95"
              >
                <Download className="h-4 w-4" />
                <span>Install App Now</span>
              </button>
            ) : null}

            {/* Android Instructions Step */}
            <div className="rounded-xl border border-slate-700 bg-slate-800/80 p-3 text-[11px] text-slate-300">
              <p className="font-bold text-amber-300 mb-1">Android Installation Guide:</p>
              <p>Open in Chrome → Tap ⋮ (Three Dots) → <span className="font-bold text-white">"Install App"</span> or <span className="font-bold text-white">"Add to Home Screen"</span></p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
