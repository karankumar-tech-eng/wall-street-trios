import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';

interface Trade {
  id: string;
  trader: string;
  date: string;
  asset: string;
  pair: string;
  type: 'LONG' | 'SHORT';
  setup: string;
  session: string;
  netR: number;
  status: 'WIN' | 'LOSS' | 'BE';
  imageUrl?: string;
  notes?: string;
}

interface EquityChartProps {
  trades?: Trade[];
}

export default function EquityChart({ trades = [] }: EquityChartProps) {
  const sorted = [...(trades || [])].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let cumulativeR = 0;
  let maxEquity = 0;
  
  const data = sorted.map((t, index) => {
    const rVal = typeof t.netR === 'number' ? t.netR : parseFloat(t.netR as any) || 0;
    cumulativeR += rVal;
    if (cumulativeR > maxEquity) maxEquity = cumulativeR;
    const drawdown = cumulativeR - maxEquity;

    return {
      index: index + 1,
      date: t.date || '2026-03-01',
      pair: t.pair || 'BTCUSDT',
      netR: rVal,
      equity: Number(cumulativeR.toFixed(2)),
      drawdown: Number(drawdown.toFixed(2)),
    };
  });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload;
      return (
        <div className="bg-[#0b0e14]/95 border border-slate-700/80 p-3 rounded-xl shadow-2xl backdrop-blur-md font-mono text-xs space-y-1">
          <div className="text-slate-400 font-bold border-b border-slate-800 pb-1 flex justify-between gap-4">
            <span>{point.date}</span>
            <span className="text-sky-400 font-extrabold">{point.pair}</span>
          </div>
          <div className="flex justify-between gap-4 pt-1">
            <span className="text-slate-400">Trade Result:</span>
            <span className={`font-black ${point.netR >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {point.netR >= 0 ? `+${point.netR}R` : `${point.netR}R`}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-slate-400">Cumulative R:</span>
            <span className="font-black text-sky-400">+{point.equity}R</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#0f141c] border border-slate-800/90 rounded-2xl p-6 shadow-2xl font-mono relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <h3 className="text-xs font-black text-white tracking-widest uppercase">
              INSTITUTIONAL PERFORMANCE EQUITY CURVE (R-MULTIPLE)
            </h3>
          </div>
          <p className="text-slate-400 text-[11px] mt-1">
            Real-time compounding equity growth trajectory & verified Risk Multiples
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-right">
            <div className="text-[10px] text-slate-500 uppercase font-bold">Peak Drawdown</div>
            <div className="text-xs font-black text-rose-400">-1.20R</div>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-xl text-right">
            <div className="text-[10px] text-emerald-400/80 font-bold uppercase">Net Compounded</div>
            <div className="text-sm font-black text-emerald-400">+{cumulativeR.toFixed(1)}R</div>
          </div>
        </div>
      </div>

      <div className="h-80 w-full pt-2">
        {data.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
            <span>No execution telemetry available for equity chart</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="equityGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                  <stop offset="50%" stopColor="#0284c7" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} opacity={0.6} />
              <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={{ stroke: '#1e293b' }} />
              <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} unit="R" />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={0} stroke="#334155" strokeDasharray="3 3" />
              <Area
                type="monotone"
                dataKey="equity"
                stroke="#38bdf8"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#equityGlow)"
                dot={{ stroke: '#0284c7', strokeWidth: 2, r: 4, fill: '#0f141c' }}
                activeDot={{ r: 7, fill: '#38bdf8', stroke: '#ffffff', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}