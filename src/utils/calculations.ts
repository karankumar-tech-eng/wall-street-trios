import { Trade } from './demoData';

export interface DashboardMetrics {
  totalTrades: number;
  wins: number;
  losses: number;
  breakevens: number;
  winRate: number;
  netR: number;
}

export const calculateMetrics = (trades: Trade[]): DashboardMetrics => {
  if (!trades || trades.length === 0) {
    return {
      totalTrades: 0,
      wins: 0,
      losses: 0,
      breakevens: 0,
      winRate: 0,
      netR: 0,
    };
  }

  let wins = 0;
  let losses = 0;
  let breakevens = 0;
  let totalNetR = 0;

  trades.forEach((trade) => {
    totalNetR += trade.netR;
    if (trade.result === 'WIN') wins++;
    else if (trade.result === 'LOSS') losses++;
    else breakevens++;
  });

  const totalTrades = trades.length;
  const winRate = totalTrades > 0 ? (wins / totalTrades) * 100 : 0;

  return {
    totalTrades,
    wins,
    losses,
    breakevens,
    winRate: Number(winRate.toFixed(1)),
    netR: Number(totalNetR.toFixed(2)),
  };
};