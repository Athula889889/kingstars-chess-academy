import React from 'react';
import { Menu, Download, Award, ShieldCheck } from 'lucide-react';
import { NavigationTab } from '../types';

interface HeaderProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  onOpenMobileMenu: () => void;
  installable: boolean;
  onInstallClick: () => void;
  score: number;
}

export const HeaderNavigation: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenMobileMenu,
  installable,
  onInstallClick,
  score,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-500/20 bg-[#0a0f1d]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        
        {/* Brand Logo & Title */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex cursor-pointer items-center gap-3 transition-opacity hover:opacity-90"
        >
          <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-amber-500/30 bg-slate-900 shadow-md shadow-amber-500/10">
            <img 
              src="icons/logo.png" 
              alt="Kingstars Logo" 
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Fallback icon if image loading
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="font-serif-title text-xl font-bold text-amber-400">K</span>
          </div>
          <div>
            <h1 className="font-serif-title text-base font-bold tracking-wide text-white sm:text-lg">
              Kingstars <span className="text-amber-400">Chess</span>
            </h1>
            <p className="text-[10px] font-medium tracking-wider text-amber-300/80 uppercase sm:text-xs">
              Trincomalee Academy
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {[
            { id: 'home', label: 'Home' },
            { id: 'learn', label: 'Learn Chess' },
            { id: 'puzzles', label: 'Chess Puzzles' },
            { id: 'mate1', label: 'Mate in 1' },
            { id: 'mate2', label: 'Mate in 2' },
            { id: 'tournaments', label: 'Tournaments' },
            { id: 'academy', label: 'Academy' },
            { id: 'contact', label: 'Contact' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as NavigationTab)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === item.id || (item.id === 'puzzles' && (activeTab === 'mate1' || activeTab === 'mate2'))
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons: Score & Install App */}
        <div className="flex items-center gap-2">
          
          {/* User Score Badge */}
          <div className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300 shadow-inner">
            <Award className="h-3.5 w-3.5 text-amber-400" />
            <span>{score} PTS</span>
          </div>

          {/* Install PWA Button */}
          {installable && (
            <button
              onClick={onInstallClick}
              className="hidden items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-1.5 text-xs font-bold text-slate-950 shadow-md shadow-amber-500/20 transition-all hover:from-amber-400 hover:to-amber-500 sm:flex"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Install App</span>
            </button>
          )}

          {/* Mobile Drawer Trigger */}
          <button
            onClick={onOpenMobileMenu}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-amber-400 transition-colors hover:bg-slate-800 lg:hidden"
            aria-label="Open Navigation Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

      </div>
    </header>
  );
};
