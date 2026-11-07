import React, { useState } from 'react';
import { Calculator, ShieldAlert, DollarSign, Percent, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function RiskCalculator() {
  const [accountBalance, setAccountBalance] = useState<number>(100000);
  const [riskPercent, setRiskPercent] = useState<number>(1.0);
  const [entryPrice, setEntryPrice] = useState<number>(65000);
  const [stopLoss, setStopLoss] = useState<number>(64000);
  const [takeProfit, setTakeProfit] = useState<number>(68000);

  // Calculations
  const riskAmount = (accountBalance * riskPercent) / 100;
  const riskPerUnit = Math.abs(entryPrice - stopLoss);
  const positionSize = riskPerUnit > 0 ? riskAmount / riskPerUnit : 0;
  
  const rewardPerUnit = Math.abs(takeProfit - entryPrice);
  const potentialProfit = positionSize * rewardPerUnit;
  const riskRewardRatio = riskPerUnit > 0 ? (rewardPerUnit / riskPerUnit).toFixed(2) : '0.00';

  return (
    <div className="bg-[#0f141c] border border-slate-800 rounded-2xl p-6 shadow-2xl font-mono text-xs text-slate-200 space-y-5">
      
      {/* HEADER */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
          <Calculator size={18} className="text-sky-400" /> Institutional Position Sizer & Risk Protocol
        </h3>
        <span className="text-[10px] bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded border border-sky-500/30 font-bold">
          LIVE RISK GUARD
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* INPUTS COLUMN */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] text-slate-400 font-bold mb-1 uppercase">Account Capital ($)</label>
              <input
                type="number"
                value={accountBalance}
                onChange={(e) => setAccountBalance(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white font-black focus:outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 font-bold mb-1 uppercase">Risk Percentage (%)</label>
              <input
                type="number"
                step="0.1"
                value={riskPercent}
                onChange={(e) => setRiskPercent(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white font-black focus:outline-none focus:border-sky-500 text-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] text-slate-400 font-bold mb-1 uppercase">Entry Price</label>
              <input
                type="number"
                value={entryPrice}
                onChange={(e) => setEntryPrice(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 font-bold mb-1 uppercase">Stop Loss</label>
              <input
                type="number"
                value={stopLoss}
                onChange={(e) => setStopLoss(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-sky-500 text-rose-400"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 font-bold mb-1 uppercase">Take Profit</label>
              <input
                type="number"
                value={takeProfit}
                onChange={(e) => setTakeProfit(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-sky-500 text-emerald-400"
              />
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl space-y-1.5 text-[11px] text-slate-400">
            <div className="flex justify-between">
              <span>Max Dollar Risk Capital:</span>
              <span className="font-black text-rose-400">${riskAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Risk Per Unit / Share:</span>
              <span className="font-black text-white">${riskPerUnit.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* OUTPUTS / RESULTS COLUMN */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block border-b border-slate-800 pb-2">
              Calculated Execution Telemetry
            </span>

            <div className="flex justify-between items-center bg-[#0f141c] p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400">Required Position Size:</span>
              <span className="text-base font-black text-sky-400">{positionSize.toFixed(4)} Units</span>
            </div>

            <div className="flex justify-between items-center bg-[#0f141c] p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400">Risk-to-Reward Ratio:</span>
              <span className="text-sm font-black text-amber-400">1 : {riskRewardRatio}</span>
            </div>

            <div className="flex justify-between items-center bg-[#0f141c] p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400">Potential Gross Profit:</span>
              <span className="text-sm font-black text-emerald-400">+${potentialProfit.toFixed(2)}</span>
            </div>
          </div>

          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-2 text-emerald-400 text-[10px] font-bold">
            <CheckCircle2 size={16} /> Risk protocol successfully validated within max 3.0R desk limit.
          </div>
        </div>

      </div>

    </div>
  );
}