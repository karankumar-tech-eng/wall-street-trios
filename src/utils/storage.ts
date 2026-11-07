export const loadTradesFromStorage = (defaultTrades: any[]) => {
  try {
    const saved = localStorage.getItem('wallstreet_trades');
    return saved ? JSON.parse(saved) : defaultTrades;
  } catch (e) {
    return defaultTrades;
  }
};

export const saveTradesToStorage = (trades: any[]) => {
  try {
    localStorage.setItem('wallstreet_trades', JSON.stringify(trades));
  } catch (e) {
    console.error('Failed to save to local storage', e);
  }
};