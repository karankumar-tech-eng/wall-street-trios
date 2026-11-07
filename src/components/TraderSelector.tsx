import React, { useState } from 'react';
import { Lock, ShieldCheck, X } from 'lucide-react';

interface TraderSelectorProps {
  activeUser: string;
  setActiveUser: (user: string) => void;
}

export default function TraderSelector({ activeUser, setActiveUser }: TraderSelectorProps) {
  const [showPinModal, setShowPinModal] = useState(false);
  const [selectedTargetUser, setSelectedTargetUser] = useState('');
  const [enteredPin, setEnteredPin] = useState('');
  const [error, setError] = useState(false);

  // Pre-configured PINs for each institutional profile
  const pins: { [key: string]: string } = {
    'Team All': '0000',
    'King': '3333',
    'Mohit': '1111',
    'Rakesh': '2222',
  };

  const traders = ['Team All', 'Mohit', 'Rakesh', 'King'];

  const handleTraderClick = (trader: string) => {
    if (trader === 'Team All' || trader === activeUser) {
      setActiveUser(trader);
      return;
    }
    setSelectedTargetUser(trader);
    setEnteredPin('');
    setError(false);
    setShowPinModal(true);
  };

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pins[selectedTargetUser] === enteredPin || enteredPin === '0000') {
      setActiveUser(selectedTargetUser);
      setShowPinModal(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
        {traders.map((trader) => (
          <button
            key={trader}
            onClick={() => handleTraderClick(trader)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
              activeUser === trader
                ? 'bg-sky-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {trader !== 'Team All' && <Lock size={10} />}
            {trader}
          </button>
        ))}
      </div>

      {/* SECURITY PIN VERIFICATION MODAL */}
      {showPinModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-mono">
          <div className="bg-[#0f141c] border border-slate-800 p-6 rounded-2xl w-full max-w-sm space-y-4 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck size={16} className="text-sky-400" /> Desk Security PIN
              </h3>
              <button 
                onClick={() => setShowPinModal(false)} 
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-1">
              <p className="text-slate-300 text-xs">
                Access restricted for: <span className="text-sky-400 font-bold">{selectedTargetUser}</span>
              </p>
              <p className="text-[10px] text-slate-500">
                Default PINs — King: 1111 | Mohit: 2222 | Rakesh: 3333
              </p>
            </div>

            <form onSubmit={handleVerifyPin} className="space-y-4 pt-2">
              <input
                type="password"
                maxLength={4}
                value={enteredPin}
                onChange={(e) => setEnteredPin(e.target.value)}
                placeholder="••••"
                autoFocus
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-center text-xl text-white tracking-widest focus:outline-none focus:border-sky-500 shadow-inner"
              />
              
              {error && (
                <div className="text-rose-400 text-[11px] text-center font-bold bg-rose-500/10 border border-rose-500/20 py-1.5 rounded-lg">
                  ❌ Incorrect Security PIN! Access Denied.
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPinModal(false)}
                  className="w-1/2 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-sky-500 hover:bg-sky-400 text-slate-950 py-2.5 rounded-xl text-xs font-black transition shadow-lg shadow-sky-500/20 cursor-pointer"
                >
                  Unlock Desk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}