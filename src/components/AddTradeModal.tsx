import React, { useState } from 'react';
import { Trade, Direction, TradeResult } from '../types';

interface AddTradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTrade: (trade: Omit<Trade, 'id'>) => void;
}

export const AddTradeModal: React.FC<AddTradeModalProps> = ({
  isOpen,
  onClose,
  onAddTrade,
}) => {
  const [traderId, setTraderId] = useState('1');
  const [traderName, setTraderName] = useState('Mohit');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [pair, setPair] = useState('XAUUSD');
  const [timeframe, setTimeframe] = useState('15M');
  const [direction, setDirection] = useState<Direction>('BUY');
  const [result, setResult] = useState<TradeResult>('WIN');
  const [rr, setRr] = useState(2.0);

  if (!isOpen) return null;

  const handleTraderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setTraderId(id);
    if (id === '1') setTraderName('Mohit');
    if (id === '2') setTraderName('Rakesh');
    if (id === '3') setTraderName('King');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const netR = result === 'WIN' ? Number(rr) : result === 'LOSS' ? -1.0 : 0;

    onAddTrade({
      traderId,
      traderName,
      date,
      pair: pair.toUpperCase(),
      timeframe,
      direction,
      result,
      netR,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#151A23] border border-[#232B3B] w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-6 text-slate-100">
        <div className="flex items-center justify-between border-b border-[#232B3B] pb-4">
          <h3 className="text-lg font-bold text-white">Log Executed Position</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-sm font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase">Trader</label>
              <select
                value={traderId}
                onChange={handleTraderChange}
                className="w-full mt-1.5 bg-[#0B0E14] border border-[#232B3B] text-white text-sm rounded-xl p-2.5 outline-none focus:border-[#0066ff]"
              >
                <option value="1">Mohit</option>
                <option value="2">Rakesh</option>
                <option value="3">King</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full mt-1.5 bg-[#0B0E14] border border-[#232B3B] text-white text-sm rounded-xl p-2.5 outline-none focus:border-[#0066ff]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase">Asset / Pair</label>
              <input
                type="text"
                value={pair}
                onChange={(e) => setPair(e.target.value)}
                placeholder="XAUUSD, EURUSD"
                className="w-full mt-1.5 bg-[#0B0E14] border border-[#232B3B] text-white text-sm rounded-xl p-2.5 outline-none focus:border-[#0066ff]"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase">Timeframe</label>
              <input
                type="text"
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                placeholder="5M, 15M, 1H"
                className="w-full mt-1.5 bg-[#0B0E14] border border-[#232B3B] text-white text-sm rounded-xl p-2.5 outline-none focus:border-[#0066ff]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase">Direction</label>
              <select
                value={direction}
                onChange={(e) => setDirection(e.target.value as Direction)}
                className="w-full mt-1.5 bg-[#0B0E14] border border-[#232B3B] text-white text-sm rounded-xl p-2.5 outline-none focus:border-[#0066ff]"
              >
                <option value="BUY">BUY</option>
                <option value="SELL">SELL</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase">Outcome</label>
              <select
                value={result}
                onChange={(e) => setResult(e.target.value as TradeResult)}
                className="w-full mt-1.5 bg-[#0B0E14] border border-[#232B3B] text-white text-sm rounded-xl p-2.5 outline-none focus:border-[#0066ff]"
              >
                <option value="WIN">WIN</option>
                <option value="LOSS">LOSS</option>
                <option value="BREAKEVEN">BREAKEVEN</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase">Target R:R</label>
              <input
                type="number"
                step="0.1"
                value={rr}
                onChange={(e) => setRr(parseFloat(e.target.value))}
                className="w-full mt-1.5 bg-[#0B0E14] border border-[#232B3B] text-white text-sm rounded-xl p-2.5 outline-none focus:border-[#0066ff]"
                required
              />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2.5 bg-[#232B3B] hover:bg-[#232B3B]/80 text-slate-300 font-semibold text-xs rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 py-2.5 bg-[#0066ff] hover:bg-[#0052cc] text-white font-semibold text-xs rounded-xl shadow-lg cursor-pointer"
            >
              Save Position
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};