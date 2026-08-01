import React from 'react';
import { X, Home, BookOpen, Puzzle, Trophy, Info, Phone, Download, Target, Award } from 'lucide-react';
import { NavigationTab } from '../types';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  installable: boolean;
  onInstallClick: () => void;
  score: number;
  mate1SolvedCount: number;
  mate2SolvedCount: number;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  installable,
  onInstallClick,
  score,
  mate1SolvedCount,
  mate2SolvedCount,
}) => {
  if (!isOpen) return null;

  const handleSelect = (tab: NavigationTab) => {
    setActiveTab(tab);
    onClose();
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, desc: 'Academy Welcome & Overview' },
    { id: 'learn', label: 'Learn Chess', icon: BookOpen, desc: 'Interactive Piece Tutorials' },
    { id: 'puzzles', label: 'Chess Puzzles', icon: Puzzle, desc: '200 Interactive Mate Puzzles' },
    { id: 'mate1', label: 'Mate in 1', icon: Target, desc: '100 Verified One-Move Mates' },
    { id: 'mate2', label: 'Mate in 2', icon: Target, desc: '100 Verified Two-Move Mates' },
    { id: 'tournaments', label: 'Tournaments', icon: Trophy, desc: 'Upcoming Events & Registration' },
    { id: 'academy', label: 'Academy Info', icon: Info, desc: '7 Pillars of Child Development' },
    { id: 'contact', label: 'Contact Us', icon: Phone, desc: 'WhatsApp, Phone & Address' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm transition-opacity">
      <div 
        className="flex h-full w-full max-w-xs flex-col border-l border-amber-500/20 bg-[#0d1424] text-white shadow-2xl transition-transform"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-slate-800 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-500/30 bg-slate-900">
              <img 
                src="/icons/logo.png" 
                alt="Logo" 
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h2 className="font-serif-title text-sm font-bold text-amber-400">Kingstars Chess</h2>
              <p className="text-[10px] text-slate-400">Trincomalee PWA</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 gap-2 border-b border-slate-800/80 bg-slate-900/50 p-3 text-center">
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-2">
            <p className="text-[10px] uppercase tracking-wider text-amber-400/80 font-medium">Academy Score</p>
            <p className="text-base font-bold text-amber-300">{score} PTS</p>
          </div>
          <div className="rounded-lg border border-slate-700/50 bg-slate-800/40 p-2">
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Puzzles Solved</p>
            <p className="text-base font-bold text-emerald-400">{mate1SolvedCount + mate2SolvedCount} / 200</p>
          </div>
        </div>

        {/* Install Button if available */}
        {installable && (
          <div className="p-3 border-b border-slate-800">
            <button
              onClick={() => {
                onInstallClick();
                onClose();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-amber-500/20 active:scale-95"
            >
              <Download className="h-4 w-4" />
              <span>Install App on Phone</span>
            </button>
          </div>
        )}

        {/* Nav List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id as NavigationTab)}
                className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all ${
                  isActive
                    ? 'border border-amber-500/40 bg-amber-500/15 text-amber-300 font-bold shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${isActive ? 'bg-amber-500 text-slate-950' : 'bg-slate-800/80 text-amber-400'}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold">{item.label}</p>
                  <p className="text-[10px] text-slate-400">{item.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer info & WhatsApp button inside Drawer */}
        <div className="border-t border-slate-800 p-3 space-y-2 text-center text-[11px] text-slate-400">
          <a
            href={`https://wa.me/94715119204?text=${encodeURIComponent("Hello Trincomalee Kingstars Chess Academy,\n\nI would like to get more information about Chess Training.\n\nLocation: Trincomalee")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 py-2 text-xs font-bold text-emerald-400 hover:bg-emerald-500/30"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>WhatsApp: +94 71 511 9204</span>
          </a>
          <p className="italic text-amber-300/70">"Every move shapes the mind."</p>
          <p>Trincomalee Kingstars Chess Academy</p>
        </div>

      </div>
    </div>
  );
};
