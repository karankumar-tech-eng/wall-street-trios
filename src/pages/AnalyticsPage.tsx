import React, { useState } from 'react';
import { 
  BarChart2, TrendingUp, Shield, Award, PieChart, 
  Activity, Globe, Zap, Layers 
} from 'lucide-react';
import { loadTradesFromStorage } from '../utils/storage';

interface AnalyticsPageProps {
  activeUser: string;
}

export default function AnalyticsPage({ activeUser }: AnalyticsPageProps) {
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

  // Filter based on active user profile
  const filteredTrades = activeUser === 'Team All' 
    ? trades 
    : trades.filter((t: any) => t.trader === activeUser);

  const totalTrades = filteredTrades.length;
  const totalNetR = filteredTrades.reduce((acc: number, t: any) => acc + (t.netR || 0), 0);
  const wins = filteredTrades.filter((t: any) => (t.netR || 0) > 0 || t.status === 'WIN').length;
  const winRate = totalTrades > 0 ? ((wins / totalTrades) * 100).toFixed(1) : '0.0';
  const avgReturnPerTrade = totalTrades > 0 ? (totalNetR / totalTrades).toFixed(2) : '0.0';

  // Session stats calculation
  const sessions = ['New York', 'London', 'Asia'];
  const sessionStats = sessions.map(session => {
    const sTrades = filteredTrades.filter((t: any) => t.session === session);
    const sNetR = sTrades.reduce((acc: number, t: any) => acc + (t.netR || 0), 0);
    const sWins = sTrades.filter((t: any) => (t.netR || 0) > 0).length;
    const sWinRate = sTrades.length > 0 ? ((sWins / sTrades.length) * 100).toFixed(1) : '0.0';
    return { session, count: sTrades.length, netR: sNetR, winRate: sWinRate };
  });

  // Asset stats calculation
  const assets = ['Crypto', 'Forex', 'Indices', 'Commodities'];
  const assetStats = assets.map(asset => {
    const aTrades = filteredTrades.filter((t: any) => t.asset === asset);
    const aNetR = aTrades.reduce((acc: number, t: any) => acc + (t.netR || 0), 0);
    const aWins = aTrades.filter((t: any) => (t.netR || 0) > 0).length;
    const aWinRate = aTrades.length > 0 ? ((aWins / aTrades.length) * 100).toFixed(1) : '0.0';
    return { asset, count: aTrades.length, netR: aNetR, winRate: aWinRate };
  });

  return (
    <div className="space-y-6 font-mono text-xs text-slate-200">
      
      {/* HEADER BANNER */}
      <div className="bg-[#0f141c] border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 shadow-2xl">
        <div className="space-y-1">
          <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
            <BarChart2 size={18} className="text-purple-400" /> Institutional Analytics & Telemetry Matrix
          </h2>
          <p className="text-slate-400 text-[11px]">
            Active Desk Profile: <span className="text-sky-400 font-bold">{activeUser}</span> | Advanced Performance Attribution
          </p>
        </div>

        <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-purple-400 font-bold flex items-center gap-2">
          <Activity size={14} className="animate-pulse" /> Live Risk Attribution Active
        </div>
      </div>

      {/* TOP SUMMARY METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-[#0f141c] border border-slate-800 p-5 rounded-2xl shadow-xl space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="font-bold uppercase text-[11px]">Total Net R Return</span>
            <TrendingUp size={16} className="text-emerald-400" />
          </div>
          <div className={`text-xl font-black ${totalNetR >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {totalNetR >= 0 ? `+${totalNetR.toFixed(1)}R` : `${totalNetR.toFixed(1)}R`}
          </div>
          <div className="text-[10px] text-slate-500">Compounded Risk Multiples</div>
        </div>

        <div className="bg-[#0f141c] border border-slate-800 p-5 rounded-2xl shadow-xl space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="font-bold uppercase text-[11px]">Profile Win Rate</span>
            <Award size={16} className="text-amber-400" />
          </div>
          <div className="text-xl font-black text-amber-400">{winRate}%</div>
          <div className="text-[10px] text-slate-500">{wins} Wins out of {totalTrades} Executions</div>
        </div>

        <div className="bg-[#0f141c] border border-slate-800 p-5 rounded-2xl shadow-xl space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="font-bold uppercase text-[11px]">Expectancy / Trade</span>
            <Zap size={16} className="text-sky-400" />
          </div>
          <div className={`text-xl font-black ${parseFloat(avgReturnPerTrade) >= 0 ? 'text-sky-400' : 'text-rose-400'}`}>
            {parseFloat(avgReturnPerTrade) >= 0 ? `+${avgReturnPerTrade}R` : `${avgReturnPerTrade}R`}
          </div>
          <div className="text-[10px] text-slate-500">Average R Output per Setup</div>
        </div>

        <div className="bg-[#0f141c] border border-slate-800 p-5 rounded-2xl shadow-xl space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="font-bold uppercase text-[11px]">Surveillance Status</span>
            <Shield size={16} className="text-purple-400" />
          </div>
          <div className="text-xl font-black text-purple-400">VERIFIED</div>
          <div className="text-[10px] text-slate-500">Multi-User Ledger Synchronized</div>
        </div>

      </div>

      {/* SESSION & ASSET BREAKDOWN TABLES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* SESSION BREAKDOWN */}
        <div className="bg-[#0f141c] border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white uppercase tracking-widest text-xs flex items-center gap-2">
              <Globe size={14} className="text-sky-400" /> Session Performance Matrix
            </h3>
            <span className="text-[10px] text-slate-500">NY • London • Asia</span>
          </div>

          <div className="space-y-3">
            {sessionStats.map((s) => (
              <div key={s.session} className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl flex justify-between items-center">
                <div>
                  <div className="font-bold text-white text-sm">{s.session}</div>
                  <div className="text-[10px] text-slate-400">{s.count} Executions Logged</div>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold">Win Rate</div>
                    <div className="font-black text-amber-400">{s.winRate}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold">Net R</div>
                    <div className={`font-black ${s.netR >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {s.netR >= 0 ? `+${s.netR.toFixed(1)}R` : `${s.netR.toFixed(1)}R`}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ASSET CLASS BREAKDOWN */}
        <div className="bg-[#0f141c] border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white uppercase tracking-widest text-xs flex items-center gap-2">
              <Layers size={14} className="text-emerald-400" /> Asset Class Attribution
            </h3>
            <span className="text-[10px] text-slate-500">Crypto • Forex • Indices</span>
          </div>

          <div className="space-y-3">
            {assetStats.map((a) => (
              <div key={a.asset} className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl flex justify-between items-center">
                <div>
                  <div className="font-bold text-white text-sm">{a.asset}</div>
                  <div className="text-[10px] text-slate-400">{a.count} Executions Logged</div>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold">Win Rate</div>
                    <div className="font-black text-amber-400">{a.winRate}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold">Net R</div>
                    <div className={`font-black ${a.netR >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {a.netR >= 0 ? `+${a.netR.toFixed(1)}R` : `${a.netR.toFixed(1)}R`}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}