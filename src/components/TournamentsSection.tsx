import React, { useState } from 'react';
import { ACADEMY_TOURNAMENTS } from '../data/tournaments';
import { Tournament } from '../types';
import { Trophy, Calendar, MapPin, Clock, Award, Phone, CheckCircle, Send, X } from 'lucide-react';

export const TournamentsSection: React.FC = () => {
  const [selectedTourney, setSelectedTourney] = useState<Tournament | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState<boolean>(false);
  
  // Registration modal form state
  const [playerName, setPlayerName] = useState('');
  const [playerAge, setPlayerAge] = useState('');
  const [parentPhone, setParentPhone] = useState('');

  const handleOpenRegister = (tourney: Tournament) => {
    setSelectedTourney(tourney);
    setRegisterSuccess(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName || !parentPhone) return;

    // Build pre-filled WhatsApp message URL
    const msg = `Hello Trincomalee Kingstars Chess Academy! I would like to register for "${selectedTourney?.title}".%0A%0AStudent Name: ${playerName}%0AAge: ${playerAge}%0AParent Phone: ${parentPhone}`;
    const whatsappUrl = `https://wa.me/${selectedTourney?.whatsappContact || '94771234567'}?text=${msg}`;
    
    window.open(whatsappUrl, '_blank');
    setRegisterSuccess(true);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-300">
          <Trophy className="h-3.5 w-3.5 text-amber-400" />
          <span>Competitive Excellence</span>
        </div>
        <h2 className="font-serif-title text-2xl font-black text-white sm:text-3xl">
          Kingstars Chess Tournaments
        </h2>
        <p className="mx-auto max-w-xl text-xs text-slate-300 sm:text-sm">
          Test your tactical powers in regional, scholastic, and rated championships hosted by Trincomalee Kingstars Chess Academy!
        </p>
      </div>

      {/* TOURNAMENT LIST GRID */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ACADEMY_TOURNAMENTS.map((t) => (
          <div
            key={t.id}
            className="flex flex-col justify-between rounded-2xl border border-amber-500/25 bg-[#131b2e] p-6 shadow-xl transition-all hover:-translate-y-1 hover:border-amber-500/50"
          >
            <div className="space-y-4">
              
              {/* Status Badge */}
              <div className="flex items-center justify-between">
                <span className={`rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider ${
                  t.status === 'Registration Open'
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                }`}>
                  {t.status}
                </span>

                <span className="text-[11px] font-bold text-amber-400">
                  {t.entryFee}
                </span>
              </div>

              {/* Title & Desc */}
              <div>
                <h3 className="font-serif-title text-lg font-bold text-white">
                  {t.title}
                </h3>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                  {t.description}
                </p>
              </div>

              {/* Quick Details */}
              <div className="space-y-2 border-t border-slate-800 pt-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>{t.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>{t.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-amber-400 shrink-0" />
                  <span className="truncate">{t.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>Prizes: {t.prizes}</span>
                </div>
              </div>

            </div>

            {/* Registration Action Button */}
            <div className="mt-6 border-t border-slate-800 pt-4">
              <button
                onClick={() => handleOpenRegister(t)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3 text-xs font-bold text-slate-950 shadow-md shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 active:scale-95"
              >
                <Trophy className="h-4 w-4" />
                <span>Register for Tournament</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* REGISTRATION MODAL */}
      {selectedTourney && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-amber-500/30 bg-[#0d1424] p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-serif-title text-base font-bold text-amber-400">
                Tournament Registration
              </h3>
              <button
                onClick={() => setSelectedTourney(null)}
                className="rounded-lg bg-slate-800 p-1.5 text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs font-bold text-white">
              {selectedTourney.title}
            </p>

            {registerSuccess ? (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-4 text-center space-y-2">
                <CheckCircle className="mx-auto h-8 w-8 text-emerald-400" />
                <h4 className="text-sm font-bold text-emerald-300">Registration Message Sent!</h4>
                <p className="text-xs text-slate-300">
                  We have prepared your WhatsApp inquiry. Our tournament director will confirm your entry details shortly.
                </p>
                <button
                  onClick={() => setSelectedTourney(null)}
                  className="mt-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="e.g. K. Tharusha Perera"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2.5 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Age *</label>
                    <input
                      type="number"
                      required
                      value={playerAge}
                      onChange={(e) => setPlayerAge(e.target.value)}
                      placeholder="e.g. 10"
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2.5 text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Parent Phone *</label>
                    <input
                      type="tel"
                      required
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      placeholder="077 123 4567"
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2.5 text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3 text-xs font-bold text-slate-950 shadow-md shadow-amber-500/20 active:scale-95"
                  >
                    <Send className="h-4 w-4" />
                    <span>Submit via WhatsApp Registration</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
