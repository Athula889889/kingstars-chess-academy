import React from 'react';
import { Smartphone, Download, X, CheckCircle } from 'lucide-react';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInstall: () => void;
  isInstallable: boolean;
}

export const InstallPromptModal: React.FC<InstallModalProps> = ({
  isOpen,
  onClose,
  onInstall,
  isInstallable,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl border border-amber-500/40 bg-[#0d1424] p-6 shadow-2xl space-y-4 text-center">
        
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-800 p-1.5 text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/40 bg-slate-900 shadow-xl">
          <img
            src="icons/logo.png"
            alt="Logo"
            className="h-full w-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        <div>
          <h3 className="font-serif-title text-lg font-extrabold text-white">
            Install Kingstars Chess App
          </h3>
          <p className="mt-1 text-xs text-slate-300">
            Enjoy full offline access, 200 chess puzzles, and fast mobile response!
          </p>
        </div>

        {isInstallable ? (
          <button
            onClick={() => {
              onInstall();
              onClose();
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3.5 text-xs font-bold text-slate-950 shadow-lg shadow-amber-500/25 active:scale-95"
          >
            <Download className="h-4 w-4" />
            <span>Install Now on Phone</span>
          </button>
        ) : null}

        {/* Manual Android Chrome instructions */}
        <div className="rounded-xl border border-slate-700 bg-slate-800/80 p-3 text-left text-[11px] text-slate-300 space-y-1">
          <p className="font-bold text-amber-300">Android Chrome Steps:</p>
          <ol className="list-decimal list-inside space-y-0.5 text-slate-300">
            <li>Open this website in <span className="font-bold text-white">Google Chrome</span></li>
            <li>Tap the <span className="font-bold text-amber-400">three dots (⋮)</span> at top right</li>
            <li>Select <span className="font-bold text-white">"Install app"</span> or <span className="font-bold text-white">"Add to Home screen"</span></li>
            <li>Tap <span className="font-bold text-emerald-400">Install</span></li>
          </ol>
        </div>

      </div>
    </div>
  );
};
