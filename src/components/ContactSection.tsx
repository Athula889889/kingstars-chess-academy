import React, { useState } from 'react';
import { CONTACT_DETAILS } from '../data/academy';
import { Phone, MessageSquare, Mail, Facebook, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formMessage) return;

    const msg = `Inquiry for Trincomalee Kingstars Chess Academy:%0A%0AName: ${formName}%0APhone: ${formPhone}%0AMessage: ${formMessage}`;
    const whatsappUrl = `https://wa.me/${CONTACT_DETAILS.whatsapp.replace(/\+/g, '')}?text=${msg}`;
    
    window.open(whatsappUrl, '_blank');
    setSent(true);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-300">
          <MessageSquare className="h-3.5 w-3.5 text-amber-400" />
          <span>Get in Touch</span>
        </div>
        <h2 className="font-serif-title text-2xl font-black text-white sm:text-3xl">
          Contact Trincomalee Kingstars Chess Academy
        </h2>
        <p className="mx-auto max-w-xl text-xs text-slate-300 sm:text-sm">
          Have questions about classes, student admissions, or tournament entries? Reach out to us directly through any of the quick channels below!
        </p>
      </div>

      {/* QUICK ACTION CONTACT BUTTONS */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        
        {/* WhatsApp */}
        <a
          href={`https://wa.me/${CONTACT_DETAILS.whatsapp.replace(/\+/g, '')}?text=Hello!%20I%20have%20an%20inquiry%20regarding%20Trincomalee%20Kingstars%20Chess%20Academy.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4 text-center transition-all hover:border-emerald-500 hover:bg-emerald-950/40 active:scale-95"
        >
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 shadow-md">
            <MessageSquare className="h-5 w-5" />
          </div>
          <p className="text-xs font-bold text-white">WhatsApp</p>
          <p className="mt-0.5 text-[10px] text-emerald-400 font-semibold">{CONTACT_DETAILS.whatsapp}</p>
        </a>

        {/* Phone Call */}
        <a
          href={`tel:${CONTACT_DETAILS.phone}`}
          className="flex flex-col items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-950/20 p-4 text-center transition-all hover:border-amber-500 hover:bg-amber-950/40 active:scale-95"
        >
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-slate-950 shadow-md">
            <Phone className="h-5 w-5" />
          </div>
          <p className="text-xs font-bold text-white">Direct Phone</p>
          <p className="mt-0.5 text-[10px] text-amber-300 font-semibold">{CONTACT_DETAILS.phone}</p>
        </a>

        {/* Facebook Page */}
        <a
          href={CONTACT_DETAILS.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-950/20 p-4 text-center transition-all hover:border-blue-500 hover:bg-blue-950/40 active:scale-95"
        >
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
            <Facebook className="h-5 w-5" />
          </div>
          <p className="text-xs font-bold text-white">Facebook</p>
          <p className="mt-0.5 text-[10px] text-blue-300 font-semibold">@kingstarschess</p>
        </a>

        {/* Email */}
        <a
          href={`mailto:${CONTACT_DETAILS.email}`}
          className="flex flex-col items-center justify-center rounded-2xl border border-purple-500/30 bg-purple-950/20 p-4 text-center transition-all hover:border-purple-500 hover:bg-purple-950/40 active:scale-95"
        >
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500 text-slate-950 shadow-md">
            <Mail className="h-5 w-5" />
          </div>
          <p className="text-xs font-bold text-white">Email Us</p>
          <p className="mt-0.5 text-[10px] text-purple-300 font-semibold truncate max-w-[120px]">{CONTACT_DETAILS.email}</p>
        </a>

      </div>

      {/* FORM & LOCATION CARD */}
      <div className="grid gap-6 lg:grid-cols-12">
        
        {/* Contact Form (7 Cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-amber-500/30 bg-[#131b2e] p-6 shadow-xl space-y-4">
          <h3 className="font-serif-title text-base font-bold text-white">
            Send an Inquiry
          </h3>

          {sent ? (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-6 text-center space-y-2">
              <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400" />
              <h4 className="text-base font-bold text-emerald-300">Message Dispatched!</h4>
              <p className="text-xs text-slate-300">
                Your message has been redirected to our WhatsApp line for instant response.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSendMessage} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. S. Kumar"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Phone / WhatsApp Number</label>
                <input
                  type="tel"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  placeholder="077 123 4567"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Your Message *</label>
                <textarea
                  rows={4}
                  required
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="Ask us about beginner classes, weekend schedules, or tournament entries..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-white focus:border-amber-500 focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3.5 text-xs font-bold text-slate-950 shadow-md shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 active:scale-95"
              >
                <Send className="h-4 w-4" />
                <span>Send Message via WhatsApp</span>
              </button>
            </form>
          )}
        </div>

        {/* Location & Hours Details (5 Cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-[#131b2e] p-6 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-serif-title text-base font-bold text-white">
              Academy Training Center
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Address:</p>
                  <p>{CONTACT_DETAILS.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Hours of Operation:</p>
                  <p>{CONTACT_DETAILS.workingHours}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-amber-500/20 bg-slate-900/80 p-4 text-xs text-amber-300/90 space-y-1">
            <p className="font-bold text-amber-400">Visiting Us?</p>
            <p>Parent orientation and trial classes are held every Saturday morning at 9:00 AM.</p>
          </div>
        </div>

      </div>

    </div>
  );
};
