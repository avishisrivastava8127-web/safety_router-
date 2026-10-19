import React, { useState } from 'react';
import { 
  X, 
  Share2, 
  Copy, 
  Check, 
  UserPlus, 
  Trash2, 
  ShieldCheck, 
  Send, 
  Smartphone
} from 'lucide-react';
import { INITIAL_CONTACTS } from '../data';

const STORAGE_KEY = 'saferoute_trusted_contacts';

export default function ShareTripModal({ isOpen, onClose, routeInfo, isNightMode }) {
  const [contacts, setContacts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CONTACTS));
      return INITIAL_CONTACTS;
    } catch {
      return INITIAL_CONTACTS;
    }
  });
  const [copied, setCopied] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newRelation, setNewRelation] = useState('Friend');
  const [dispatchStatus, setDispatchStatus] = useState(null); // 'sending' | 'sent' | null

  // Generated fake tracking link
  const fakeTrackingLink = 'https://saferoute.live/track/sf-walk-9842';

  // Save contacts to localStorage helper
  const saveContacts = (updated) => {
    setContacts(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving contacts:', e);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(fakeTrackingLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddContact = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) return;

    const newContact = {
      id: 'ct-' + Date.now(),
      name: newName.trim(),
      phone: newPhone.trim(),
      relation: newRelation,
      notifySms: true,
      isPrimary: contacts.length === 0
    };

    const updated = [...contacts, newContact];
    saveContacts(updated);
    setNewName('');
    setNewPhone('');
    setIsAdding(false);
  };

  const handleDeleteContact = (id) => {
    const updated = contacts.filter(c => c.id !== id);
    saveContacts(updated);
  };

  const handleSendLiveSms = () => {
    setDispatchStatus('sending');
    setTimeout(() => {
      setDispatchStatus('sent');
      setTimeout(() => setDispatchStatus(null), 4000);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className={`w-full max-w-md rounded-3xl shadow-2xl border overflow-hidden flex flex-col max-h-[90vh] transition-all ${
          isNightMode 
            ? 'bg-zinc-900 border-zinc-700 text-zinc-100' 
            : 'bg-white border-zinc-200 text-zinc-900'
        }`}
      >
        {/* Modal Header */}
        <div className="p-4 border-b border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Share Trip & Live Track</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Keep loved ones notified of your route in real time
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto space-y-4">
          {/* Live Beacon Status Indicator */}
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <div className="text-xs">
                <span className="font-bold block">Live Telemetry Active</span>
                <span className="text-[11px] opacity-80">
                  GPS ±3m • Battery 84% • ETA {routeInfo?.duration || '18 min'}
                </span>
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500 text-white">
              Broadcasting
            </span>
          </div>

          {/* Fake Live Tracking Link Box */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Private Live Tracking URL
            </label>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              <input
                type="text"
                readOnly
                value={fakeTrackingLink}
                className="bg-transparent text-xs font-mono flex-1 text-zinc-700 dark:text-zinc-300 focus:outline-none select-all truncate"
              />
              <button
                onClick={handleCopyLink}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  copied
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-600'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Trusted Contacts Section */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-emerald-500" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Trusted Contacts ({contacts.length})
                </h4>
              </div>
              <button
                onClick={() => setIsAdding(!isAdding)}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>{isAdding ? 'Cancel' : 'Add Contact'}</span>
              </button>
            </div>

            {/* Add Contact Form */}
            {isAdding && (
              <form 
                onSubmit={handleAddContact} 
                className="p-3 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-2.5 text-xs animate-in slide-in-from-top-2 duration-150"
              >
                <div className="font-bold text-zinc-800 dark:text-zinc-200">
                  Add Emergency / Trusted Contact
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    required
                    placeholder="Full Name (e.g. Jordan Smith)"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <div className="grid grid-cols-[2fr,1fr] gap-2">
                    <input
                      type="tel"
                      required
                      placeholder="Phone (+1 555-000-0000)"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <select
                      value={newRelation}
                      onChange={(e) => setNewRelation(e.target.value)}
                      className="px-2 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Family">Family</option>
                      <option value="Partner">Partner</option>
                      <option value="Friend">Friend</option>
                      <option value="Roommate">Roommate</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md transition-colors"
                >
                  Save to LocalStorage
                </button>
              </form>
            )}

            {/* Contacts List */}
            <div className="space-y-2">
              {contacts.map((contact) => (
                <div 
                  key={contact.id}
                  className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/60 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs truncate text-zinc-900 dark:text-zinc-100">
                        {contact.name}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300">
                        {contact.relation}
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">
                      {contact.phone}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Auto-Notify
                    </span>
                    <button
                      onClick={() => handleDeleteContact(contact.id)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                      title="Remove contact"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dispatch SMS Notification Feedback Toast */}
          {dispatchStatus === 'sent' && (
            <div className="p-3 rounded-xl bg-emerald-500 text-white font-medium text-xs flex items-center gap-2 shadow-lg animate-in zoom-in-95 duration-150">
              <Check className="w-4 h-4 shrink-0" />
              <span>SMS Dispatched! {contacts.length} trusted contacts received your live route & ETA.</span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex flex-col gap-2">
          <button
            onClick={handleSendLiveSms}
            disabled={dispatchStatus === 'sending'}
            className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-bold text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-70"
          >
            {dispatchStatus === 'sending' ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span>Dispatching Live SMS...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Live Location SMS ({contacts.length} Contacts)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
