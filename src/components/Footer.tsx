import React from 'react';
import { Crown } from 'lucide-react';
import { NavigationTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: NavigationTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="w-full border-t border-amber-500/20 bg-[#080c17] py-8 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col items-center justify-between gap-6 sm:flex-row">
        
        {/* Brand & Slogan */}
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/30 bg-slate-900 text-amber-400 font-serif-title font-bold text-lg">
            K
          </div>
          <div>
            <p className="font-serif-title text-sm font-bold text-white">
              Trincomalee Kingstars Chess Academy
            </p>
            <p className="text-[11px] italic text-amber-300/80">
              "Every move shapes the mind. Shaping futures through Chess."
            </p>
          </div>
        </div>

        {/* Links & Direct WhatsApp CTA */}
        <div className="flex flex-col items-center gap-3 sm:items-end">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
            <button onClick={() => setActiveTab('home')} className="hover:text-amber-300">Home</button>
            <button onClick={() => setActiveTab('learn')} className="hover:text-amber-300">Learn Chess</button>
            <button onClick={() => setActiveTab('puzzles')} className="hover:text-amber-300">Puzzles</button>
            <button onClick={() => setActiveTab('tournaments')} className="hover:text-amber-300">Tournaments</button>
            <button onClick={() => setActiveTab('academy')} className="hover:text-amber-300">Academy</button>
            <button onClick={() => setActiveTab('contact')} className="hover:text-amber-300">Contact</button>
          </div>
          
          <a
            href={`https://wa.me/94715119204?text=${encodeURIComponent("Hello Trincomalee Kingstars Chess Academy,\n\nI would like to get more information about Chess Training.\n\nLocation: Trincomalee")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 px-3 py-1.5 text-xs font-bold text-emerald-400 hover:bg-emerald-500/30"
          >
            <span>📱 WhatsApp: +94 71 511 9204</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-[11px] text-slate-500 text-center sm:text-right">
          <p>© {new Date().getFullYear()} Trincomalee Kingstars Chess Academy.</p>
          <p className="text-[10px]">Installable Android PWA Application</p>
        </div>

      </div>
    </footer>
  );
};
