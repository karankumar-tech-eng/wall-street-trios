import React from 'react';
import { TrendingUp, TrendingDown, Activity, Zap } from 'lucide-react';

export default function LiveTicker() {
  const tickerItems = [
    { symbol: 'BTCUSDT', type: 'LONG', return: '+3.5R', status: 'WIN', session: 'New York' },
    { symbol: 'EURUSD', type: 'SHORT', return: '+2.0R', status: 'WIN', session: 'London' },
    { symbol: 'ETHUSDT', type: 'LONG', return: '-1.0R', status: 'LOSS', session: 'New York' },
    { symbol: 'SOLUSDT', type: 'LONG', return: '+4.2R', status: 'WIN', session: 'Asia' },
    { symbol: 'NAS100', type: 'SHORT', return: '+1.5R', status: 'WIN', session: 'New York' },
    { symbol: 'GBPUSD', type: 'LONG', return: '-1.0R', status: 'LOSS', session: 'London' },
    { symbol: 'XAUUSD', type: 'LONG', return: '+3.8R', status: 'WIN', session: 'New York' },
  ];

  return (
    <div className="bg-[#0f141c] border-y border-slate-800 py-2.5 overflow-hidden relative font-mono text-xs flex items-center shadow-inner">
      {/* Left Badge */}
      <div className="bg-[#0b0e14] px-4 py-1 z-10 border-r border-slate-800 flex items-center gap-2 text-sky-400 font-bold shrink-0">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <Zap size={12} className="text-amber-400" /> LIVE STREAM:
      </div>

      {/* Scrolling Container */}
      <div className="flex overflow-x-hidden whitespace-nowrap w-full relative">
        <div className="flex animate-marquee items-center gap-8 pl-8">
          {tickerItems.concat(tickerItems).map((item, index) => (
            <div 
              key={index} 
              className="inline-flex items-center gap-3 bg-slate-900/80 border border-slate-800/80 px-3 py-1 rounded-xl shrink-0 shadow-sm"
            >
              <span className="font-black text-white">{item.symbol}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${item.type === 'LONG' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                {item.type}
              </span>
              <span className={`font-black ${item.return.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                {item.return}
              </span>
              <span className="text-[10px] text-slate-500">({item.session})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tailwind Custom Marquee Animation inlined via style if needed, or add to index.css */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}