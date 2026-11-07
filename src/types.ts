export type Direction = 'BUY' | 'SELL';
export type TradeResult = 'WIN' | 'LOSS' | 'BREAKEVEN';

export interface Trade {
  id: string;
  traderId: string;
  traderName: string;
  date: string;
  pair: string;
  timeframe: string;
  direction: Direction;
  result: TradeResult;
  netR: number;
  riskPercent: number;
  tradeCount: number;
  notes?: string;
  beforeScreenshot?: string;
  afterScreenshot?: string;
}

export interface Trader {
  id: string;
  name: string;
  role: string;
  email: string;
}

export interface AnalyticsSummary {
  totalTrades: number;
  wins: number;
  losses: number;
  breakeven: number;
  winRate: number;
  netR: number;
  profitFactor: number;
  expectancy: number;
  avgRisk: number;
  avgR: number;
  maxDrawdown: number;
  currentStreak: { type: 'WIN' | 'LOSS' | 'NONE'; count: number };
  maxWinStreak: number;
  maxLossStreak: number;
}