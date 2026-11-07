import React, { useState } from 'react';
import { 
  Shield, TrendingUp, Award, Zap, ArrowRight, 
  Activity, Terminal, Lock, Globe, Cpu, BarChart2 
} from 'lucide-react';
import TraderSelector from '../components/TraderSelector';
import { loadTradesFromStorage } from '../utils/storage';

interface HomePageProps {
  setActiveTab: (tab: string) => void;
  activeUser: string;
  setActiveUser: (user: string) => void;
}

export default function HomePage({ setActiveTab, activeUser, setActiveUser }: HomePageProps) {
  const defaultInstitutionalTrades = [
    { id: 't1', trader: 'King', date: '2026-02-01', asset: 'Crypto', pair: 'BTCUSDT', type: 'LONG', setup: 'ICT Liquidity Sweep', session: 'New York', netR: 3.5, status: 'WIN' },
    { id: 't2', trader: 'King', date: '2026-02-04', asset: 'Forex', pair: 'EURUSD', type: 'SHORT', setup: 'London Breakout', session: 'London', netR: 2.0, status: 'WIN' },
    { id: 't3', trader: 'Mohit', date: '2026-02-08', asset: 'Crypto', pair: 'ETHUSDT', type: 'LONG', setup: 'FVG Retest', session: 'New York', netR: -1.0, status: 'LOSS' },
    { id: 't4', trader: 'Mohit', date: '2026-02-12', asset: 'Crypto', pair: 'SOLUSDT', type: 'LONG', setup: 'Order Block Entry', session: 'Asia', netR: 4.2, status: 'WIN' },
    { id: 't5', trader: 'Rakesh', date: '2026-02-15', asset: 'Indices', pair: 'NAS100', type: 'SHORT', setup: 'Session High Sweep', session: 'New York', netR: 1.5, status: 'WIN' },
    { id: 't6', trader: 'King', date: '2026-02-18', asset: 'Forex', pair: 'GBPUSD', type: 'LONG', setup: 'Judas Swing', session: 'London', netR: -1.0, status: 'LOSS' },
    { id: 't7', trader: 'Mohit', date: '2026-02-21', asset: 'Commodities', pair: 'XAUUSD', type: 'LONG', setup: 'Asian Range Retest', session: 'New York', netR: 3.8, status: 'WIN' },
    { id: 't8', trader: 'Rakesh', date: '2026-02-25', asset: 'Crypto', pair: 'BTCUSDT', type: 'SHORT', setup: '4H Supply Zone', session: 'New York', netR: 2.2, status: 'WIN' },
    { id: 't9', trader: 'King', date: '2026-03-01', asset: 'Crypto', pair: 'BTCUSDT', type: 'LONG', setup: 'BOS + Retest', session: 'London', netR: 2.8, status: 'WIN' }
  ];

  const [trades] = useState(() => loadTradesFromStorage(defaultInstitutionalTrades));

  // Dynamic Filtering based on selected trader profile on Home Page
  const filteredTrades = activeUser === 'Team All' 
    ? trades 
    : trades.filter((t: any) => t.trader === activeUser);

  const totalNetR = filteredTrades.reduce((acc: number, t: any) => acc + (t.netR || 0), 0);
  const wins = filteredTrades.filter((t: any) => (t.netR || 0) > 0 || t.status === 'WIN').length;
  const winRate = filteredTrades.length > 0 ? ((wins / filteredTrades.length) * 100).toFixed(1) : '0.0';

  return (
    <div className="space-y-6 font-mono text-xs text-slate-200">
      
      {/* HERO BANNER - WITH ACTIVE TRADER SWITCHER */}
      <div className="bg-[#0f141c] border border-slate-800 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/10 border border-sky-500/30 text-sky-400 rounded-lg text-[10px] font-bold uppercase tracking-wider">
              <Cpu size={12} className="animate-spin" /> Institutional Multi-Trader Surveillance Hub
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              WALL STREET TRIOS <span className="text-sky-400">PRO</span>
            </h1>
            
            <p className="text-slate-400 text-sm leading-relaxed">
              High-performance institutional trading terminal engineered for multi-user capital management, verified trade telemetry, and automated risk protocol enforcement.
            </p>

            {/* QUICK NAVIGATION BUTTONS (INCLUDES ANALYTICS) */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                type="button"
                onClick={() => setActiveTab('dashboard')}
                className="px-5 py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black rounded-xl transition shadow-lg shadow-sky-500/20 flex items-center gap-2 cursor-pointer active:scale-95"
              >
                Launch Live Dashboard <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('journal')}
                className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-bold rounded-xl transition flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Terminal size={16} className="text-sky-400" /> Open Execution Journal
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('analytics')}
                className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-purple-400 border border-purple-500/30 font-bold rounded-xl transition flex items-center gap-2 cursor-pointer active:scale-95 hover:border-purple-500/60"
              >
                <BarChart2 size={16} className="text-purple-400" /> View Analytics
              </button>
            </div>
          </div>

          {/* TRADER PROFILE SELECTOR PANEL */}
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl shadow-xl space-y-3 min-w-[240px]">
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5"><Shield size={14} className="text-sky-400" /> ACTIVE DESK</span>
              <span className="text-sky-400 font-extrabold">{activeUser}</span>
            </div>
            <p className="text-[10px] text-slate-500">Switch Surveillance Profile:</p>
            <TraderSelector activeUser={activeUser} setActiveUser={setActiveUser} />
          </div>
        </div>
      </div>

      {/* DYNAMIC DESK TELEMETRY - PER TRADER */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-[#0f141c] border border-slate-800 p-5 rounded-2xl shadow-xl space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="font-bold uppercase text-[11px]">Active Profile</span>
            <Shield size={16} className="text-sky-400" />
          </div>
          <div className="text-xl font-black text-white">{activeUser}</div>
          <div className="text-[10px] text-slate-500">Filtered Live Surveillance</div>
        </div>

        <div className="bg-[#0f141c] border border-slate-800 p-5 rounded-2xl shadow-xl space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="font-bold uppercase text-[11px]">Net Return</span>
            <TrendingUp size={16} className="text-emerald-400" />
          </div>
          <div className={`text-xl font-black ${totalNetR >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {totalNetR >= 0 ? `+${totalNetR.toFixed(1)}R` : `${totalNetR.toFixed(1)}R`}
          </div>
          <div className="text-[10px] text-slate-500">{filteredTrades.length} Total Telemetries Logged</div>
        </div>

        <div className="bg-[#0f141c] border border-slate-800 p-5 rounded-2xl shadow-xl space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="font-bold uppercase text-[11px]">Profile Win Rate</span>
            <Award size={16} className="text-amber-400" />
          </div>
          <div className="text-xl font-black text-amber-400">{winRate}%</div>
          <div className="text-[10px] text-slate-500">{wins} Wins out of {filteredTrades.length} Trades</div>
        </div>

        <div className="bg-[#0f141c] border border-slate-800 p-5 rounded-2xl shadow-xl space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="font-bold uppercase text-[11px]">Risk Protocol</span>
            <Lock size={16} className="text-purple-400" />
          </div>
          <div className="text-xl font-black text-purple-400">ENFORCED</div>
          <div className="text-[10px] text-slate-500">Max 3.0R Drawdown Guard</div>
        </div>

      </div>

      {/* CORE FEATURES SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-[#0f141c] border border-slate-800 p-6 rounded-2xl shadow-xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 font-black">
            01
          </div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Multi-User Desks</h3>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Switch seamlessly between individual trader profiles or view consolidated team performance metrics in real-time.
          </p>
        </div>

        <div className="bg-[#0f141c] border border-slate-800 p-6 rounded-2xl shadow-xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-black">
            02
          </div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Verified Equity Curves</h3>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Advanced compounding growth visualization measured in risk multiples (R) with interactive tooltips and drawdown metrics.
          </p>
        </div>

        <div className="bg-[#0f141c] border border-slate-800 p-6 rounded-2xl shadow-xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-black">
            03
          </div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Institutional Logging</h3>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Strict session tracking, asset filtering, screenshot attachments, and automated risk-reward validations.
          </p>
        </div>

      </div>

    </div>
  );
}