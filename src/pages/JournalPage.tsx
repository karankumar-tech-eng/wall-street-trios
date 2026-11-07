import React, { useState } from 'react';
import { 
  BookOpen, Plus, Shield, ArrowUpRight, ArrowDownRight, 
  Trash2, X, CheckCircle2, AlertCircle, Image as ImageIcon, Calendar, Calculator, Eye 
} from 'lucide-react';
import { loadTradesFromStorage } from '../utils/storage';
import RiskCalculator from '../components/RiskCalculator';

interface JournalPageProps {
  activeUser: string;
}

export default function JournalPage({ activeUser }: JournalPageProps) {
  const defaultInstitutionalTrades = [
    { id: 't1', trader: 'King', date: '2026-02-01', asset: 'Crypto', pair: 'BTCUSDT', type: 'LONG', setup: 'ICT Liquidity Sweep', session: 'New York', netR: 3.5, status: 'WIN', notes: 'Clean sweep of 4H liquidity pool.', beforeImage: '', afterImage: '' },
    { id: 't2', trader: 'King', date: '2026-02-04', asset: 'Forex', pair: 'EURUSD', type: 'SHORT', setup: 'London Breakout', session: 'London', netR: 2.0, status: 'WIN', notes: 'Session high rejection.', beforeImage: '', afterImage: '' },
    { id: 't3', trader: 'Mohit', date: '2026-02-08', asset: 'Crypto', pair: 'ETHUSDT', type: 'LONG', setup: 'FVG Retest', session: 'New York', netR: -1.0, status: 'LOSS', notes: 'Failed to hold support.', beforeImage: '', afterImage: '' },
    { id: 't4', trader: 'Mohit', date: '2026-02-12', asset: 'Crypto', pair: 'SOLUSDT', type: 'LONG', setup: 'Order Block Entry', session: 'Asia', netR: 4.2, status: 'WIN', notes: 'Imbalance fill + OB reaction.', beforeImage: '', afterImage: '' },
    { id: 't5', trader: 'Rakesh', date: '2026-02-15', asset: 'Indices', pair: 'NAS100', type: 'SHORT', setup: 'Session High Sweep', session: 'New York', netR: 1.5, status: 'WIN', notes: 'Premarket high hunted.', beforeImage: '', afterImage: '' },
    { id: 't6', trader: 'King', date: '2026-03-01', asset: 'Crypto', pair: 'BTCUSDT', type: 'LONG', setup: 'BOS + Retest', session: 'London', netR: 2.8, status: 'WIN', notes: 'Strong continuation.', beforeImage: '', afterImage: '' }
  ];

  const [trades, setTrades] = useState(() => loadTradesFromStorage(defaultInstitutionalTrades));
  const [showModal, setShowModal] = useState(false);
  const [showRiskCalc, setShowRiskCalc] = useState(false);
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  // Form State
  const [formTrader, setFormTrader] = useState(activeUser === 'Team All' ? 'King' : activeUser);
  const [pair, setPair] = useState('BTCUSDT');
  const [asset, setAsset] = useState('Crypto');
  const [type, setType] = useState<'LONG' | 'SHORT'>('LONG');
  const [setup, setSetup] = useState('ICT Liquidity Sweep');
  const [session, setSession] = useState('New York');
  const [netR, setNetR] = useState('2.0');
  const [status, setStatus] = useState<'WIN' | 'LOSS' | 'BE'>('WIN');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [beforeImage, setBeforeImage] = useState('');
  const [afterImage, setAfterImage] = useState('');

  // Handle File to Base64 conversion
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setImage: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredTrades = activeUser === 'Team All' 
    ? trades 
    : trades.filter((t: any) => t.trader === activeUser);

  const handleAddTrade = (e: React.FormEvent) => {
    e.preventDefault();
    const rVal = parseFloat(netR) || 0;
    const calculatedStatus = rVal > 0 ? 'WIN' : rVal < 0 ? 'LOSS' : 'BE';

    const newTrade = {
      id: 't_' + Date.now(),
      trader: activeUser === 'Team All' ? formTrader : activeUser,
      date,
      asset,
      pair: pair.toUpperCase(),
      type,
      setup,
      session,
      netR: rVal,
      status: calculatedStatus,
      notes,
      beforeImage,
      afterImage
    };

    const updatedTrades = [newTrade, ...trades];
    setTrades(updatedTrades);
    localStorage.setItem('wallstreet_trades', JSON.stringify(updatedTrades));

    // Reset form & close modal
    setShowModal(false);
    setNotes('');
    setBeforeImage('');
    setAfterImage('');
  };

  const handleDeleteTrade = (id: string) => {
    const updatedTrades = trades.filter((t: any) => t.id !== id);
    setTrades(updatedTrades);
    localStorage.setItem('wallstreet_trades', JSON.stringify(updatedTrades));
  };

  return (
    <div className="space-y-6 font-mono text-xs text-slate-200">
      
      {/* HEADER BAR */}
      <div className="bg-[#0f141c] border border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 shadow-2xl">
        <div className="space-y-1">
          <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
            <BookOpen size={18} className="text-sky-400" /> Institutional Execution Journal
          </h2>
          <p className="text-slate-400 text-[11px]">
            Active Desk Profile: <span className="text-sky-400 font-bold">{activeUser}</span> | Verified Trade Ledger
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowRiskCalc(!showRiskCalc)}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-purple-400 border border-purple-500/30 font-bold rounded-xl transition flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Calculator size={16} /> {showRiskCalc ? 'Hide Risk Calculator' : 'Position Sizer'}
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black rounded-xl transition shadow-lg shadow-sky-500/20 flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Plus size={16} /> Log New Trade
          </button>
        </div>
      </div>

      {/* COLLAPSIBLE RISK CALCULATOR */}
      {showRiskCalc && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
          <RiskCalculator />
        </div>
      )}

      {/* TRADES TABLE CONTAINER */}
      <div className="bg-[#0f141c] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex justify-between items-center">
          <h3 className="font-bold text-white uppercase tracking-widest text-xs flex items-center gap-2">
            <Shield size={14} className="text-emerald-400" /> Executed Telemetries ({filteredTrades.length})
          </h3>
          <span className="text-[10px] text-slate-500 font-bold">REAL-TIME SYNC</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/60 border-b border-slate-800 text-[10px] text-slate-400 uppercase tracking-wider">
                <th className="p-4">Date</th>
                <th className="p-4">Trader</th>
                <th className="p-4">Asset / Pair</th>
                <th className="p-4">Type</th>
                <th className="p-4">Setup</th>
                <th className="p-4">Session</th>
                <th className="p-4 text-center">Screenshots (Click to View)</th>
                <th className="p-4 text-right">Net R</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredTrades.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-8 text-center text-slate-500">
                    No trade executions found for <span className="text-sky-400 font-bold">{activeUser}</span>. Click "Log New Trade" to add one.
                  </td>
                </tr>
              ) : (
                filteredTrades.map((t: any) => (
                  <tr key={t.id} className="hover:bg-slate-900/40 transition">
                    <td className="p-4 text-slate-400">{t.date}</td>
                    <td className="p-4 font-bold text-sky-400">{t.trader}</td>
                    <td className="p-4">
                      <div className="font-black text-white">{t.pair}</div>
                      <div className="text-[10px] text-slate-500">{t.asset}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${t.type === 'LONG' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'}`}>
                        {t.type}
                      </span>
                    </td>
                    <td className="p-4 text-slate-300">{t.setup}</td>
                    <td className="p-4 text-sky-300">{t.session}</td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          disabled={!t.beforeImage}
                          onClick={() => t.beforeImage && setPreviewImg(t.beforeImage)}
                          className={`px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 transition ${t.beforeImage ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 hover:bg-sky-500/30 cursor-pointer' : 'bg-slate-800 text-slate-600 cursor-not-allowed'}`}
                        >
                          <Eye size={12} /> BEFORE
                        </button>
                        <button
                          type="button"
                          disabled={!t.afterImage}
                          onClick={() => t.afterImage && setPreviewImg(t.afterImage)}
                          className={`px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 transition ${t.afterImage ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30 cursor-pointer' : 'bg-slate-800 text-slate-600 cursor-not-allowed'}`}
                        >
                          <Eye size={12} /> AFTER
                        </button>
                      </div>
                    </td>
                    <td className={`p-4 text-right font-black ${t.netR >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {t.netR >= 0 ? `+${t.netR}R` : `${t.netR}R`}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${t.netR > 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                        {t.netR > 0 ? 'WIN' : 'LOSS'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteTrade(t.id)}
                        className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition cursor-pointer"
                        title="Delete Telemetry"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* IMAGE PREVIEW MODAL */}
      {previewImg && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f141c] border border-slate-800 p-4 rounded-2xl w-full max-w-3xl space-y-3 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-white uppercase flex items-center gap-2">
                <ImageIcon size={16} className="text-sky-400" /> Trade Screenshot Preview
              </span>
              <button 
                onClick={() => setPreviewImg(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex justify-center max-h-[75vh] overflow-auto bg-slate-950 p-2 rounded-xl border border-slate-800">
              <img src={previewImg} alt="Screenshot Preview" className="max-h-[70vh] object-contain rounded-lg" />
            </div>
          </div>
        </div>
      )}

      {/* LOG NEW TRADE MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f141c] border border-slate-800 p-6 rounded-2xl w-full max-w-xl space-y-5 shadow-2xl animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Plus size={16} className="text-sky-400" /> Log Institutional Trade Execution
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddTrade} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeUser === 'Team All' && (
                  <div>
                    <label className="block text-[11px] text-slate-400 font-bold mb-1 uppercase">Trader Profile</label>
                    <select
                      value={formTrader}
                      onChange={(e) => setFormTrader(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-sky-500"
                    >
                      <option value="King">King</option>
                      <option value="Mohit">Mohit</option>
                      <option value="Rakesh">Rakesh</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] text-slate-400 font-bold mb-1 uppercase">Asset Class</label>
                  <select
                    value={asset}
                    onChange={(e) => setAsset(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="Crypto">Crypto</option>
                    <option value="Forex">Forex</option>
                    <option value="Indices">Indices</option>
                    <option value="Commodities">Commodities</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 font-bold mb-1 uppercase">Trading Pair / Symbol</label>
                  <input
                    type="text"
                    value={pair}
                    onChange={(e) => setPair(e.target.value)}
                    placeholder="e.g. BTCUSDT, EURUSD"
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 font-bold mb-1 uppercase">Execution Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as 'LONG' | 'SHORT')}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="LONG">LONG (Buy)</option>
                    <option value="SHORT">SHORT (Sell)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 font-bold mb-1 uppercase">Setup Strategy</label>
                  <input
                    type="text"
                    value={setup}
                    onChange={(e) => setSetup(e.target.value)}
                    placeholder="e.g. ICT Liquidity Sweep"
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 font-bold mb-1 uppercase">Trading Session</label>
                  <select
                    value={session}
                    onChange={(e) => setSession(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="New York">New York</option>
                    <option value="London">London</option>
                    <option value="Asia">Asia</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 font-bold mb-1 uppercase">Net R Return (Risk Multiple)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={netR}
                    onChange={(e) => setNetR(e.target.value)}
                    placeholder="e.g. 2.5 or -1.0"
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-sky-500 font-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 font-bold mb-1 uppercase">Execution Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              {/* BEFORE & AFTER SCREENSHOT FILE UPLOAD FIELDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                <div>
                  <label className="block text-[11px] text-sky-400 font-bold mb-1 uppercase flex items-center gap-1.5">
                    <ImageIcon size={14} /> Before Setup Image File
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setBeforeImage)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-slate-300 text-[11px] file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-sky-500 file:text-slate-950 hover:file:bg-sky-400 cursor-pointer"
                  />
                  {beforeImage && <span className="text-[10px] text-emerald-400 mt-1 block">✔ Before Image Uploaded</span>}
                </div>

                <div>
                  <label className="block text-[11px] text-emerald-400 font-bold mb-1 uppercase flex items-center gap-1.5">
                    <ImageIcon size={14} /> After Outcome Image File
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setAfterImage)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-slate-300 text-[11px] file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-500 file:text-slate-950 hover:file:bg-emerald-400 cursor-pointer"
                  />
                  {afterImage && <span className="text-[10px] text-emerald-400 mt-1 block">✔ After Image Uploaded</span>}
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 font-bold mb-1 uppercase">Execution Notes / Thesis</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter trade rationale, HTF bias, liquidity details..."
                  rows={3}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-sky-500 resize-none"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-1/2 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-xl font-bold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-sky-500 hover:bg-sky-400 text-slate-950 py-3 rounded-xl font-black transition shadow-lg shadow-sky-500/20 cursor-pointer"
                >
                  Save & Sync Telemetry
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}