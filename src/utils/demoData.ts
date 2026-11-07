export interface Trade {
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

export const initialTrades: Trade[] = [
  {
    id: 't1',
    trader: 'King',
    date: '2026-03-01',
    asset: 'Crypto',
    pair: 'BTCUSDT',
    type: 'LONG',
    setup: 'ICT Liquidity Sweep',
    session: 'New York',
    netR: 2.5,
    status: 'WIN',
    imageUrl: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800',
    notes: 'Clean 4h FVG retest after liquidity sweep.'
  },
  {
    id: 't2',
    trader: 'Mohit',
    date: '2026-03-02',
    asset: 'Forex',
    pair: 'EURUSD',
    type: 'SHORT',
    setup: 'London Open Breakout',
    session: 'London',
    netR: 1.8,
    status: 'WIN',
    imageUrl: '',
    notes: 'Clean session breakout.'
  }
];