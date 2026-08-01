import React from 'react';
import { ACADEMY_INFO } from '../data/academy';
import { Crown, Brain, Puzzle, ShieldCheck, Target, Zap, Trophy, CheckCircle2, Clock } from 'lucide-react';

export const AcademySection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Crown': return <Crown className="h-6 w-6 text-amber-400" />;
      case 'Brain': return <Brain className="h-6 w-6 text-amber-400" />;
      case 'Puzzle': return <Puzzle className="h-6 w-6 text-amber-400" />;
      case 'ShieldCheck': return <ShieldCheck className="h-6 w-6 text-amber-400" />;
      case 'Target': return <Target className="h-6 w-6 text-amber-400" />;
      case 'Zap': return <Zap className="h-6 w-6 text-amber-400" />;
      default: return <Trophy className="h-6 w-6 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-12 pb-12">
      
      {/* ACADEMY OVERVIEW HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-[#131b2e] p-6 shadow-2xl sm:p-10">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-300">
            <Crown className="h-3.5 w-3.5 text-amber-400" />
            <span>Established 2020 • Eastern Province</span>
          </div>
          <h2 className="font-serif-title text-2xl font-black text-white sm:text-4xl">
            About Trincomalee Kingstars Chess Academy
          </h2>
          <p className="text-sm italic font-semibold text-amber-300">
            "{ACADEMY_INFO.tagline}"
          </p>
          <p className="text-xs text-slate-300 leading-relaxed sm:text-sm">
            {ACADEMY_INFO.shortBio}
          </p>
        </div>
      </section>

      {/* THE 7 PILLARS OF CHILD DEVELOPMENT */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="font-serif-title text-xl font-bold text-white sm:text-2xl">
            How Chess Empowers Children & Shapes Futures
          </h3>
          <p className="mx-auto max-w-xl text-xs text-slate-400">
            At Trincomalee Kingstars Chess Academy, chess is far more than a game—it is an intellectual gymnasium that builds lifelong character and cognitive mastery.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ACADEMY_INFO.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-amber-500/20 bg-[#131b2e] p-5 shadow-lg transition-all hover:border-amber-500/50 hover:bg-[#1a243d]"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-amber-500/30 bg-slate-900 shadow-md">
                {getIcon(pillar.icon)}
              </div>
              <h4 className="font-serif-title text-base font-bold text-white">
                {pillar.title}
              </h4>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ACADEMY PROGRAMS & TRAINING SCHEDULE */}
      <section className="rounded-3xl border border-slate-800 bg-[#131b2e] p-6 shadow-xl space-y-6">
        <div className="space-y-1">
          <h3 className="font-serif-title text-lg font-bold text-white sm:text-xl">
            Academy Coaching Programs
          </h3>
          <p className="text-xs text-slate-400">
            Tailored curriculum designed for every stage of a student's chess journey.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {ACADEMY_INFO.programs.map((prog, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-3"
            >
              <div className="space-y-2">
                <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold text-amber-400 border border-amber-500/20">
                  {prog.ageGroup}
                </span>
                <h4 className="font-serif-title text-sm font-bold text-white">
                  {prog.level}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {prog.focus}
                </p>
              </div>

              <div className="flex items-center gap-2 border-t border-slate-800 pt-3 text-[11px] font-bold text-amber-300">
                <Clock className="h-3.5 w-3.5" />
                <span>{prog.schedule}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
