'use client';

import { useEffect, useState } from 'react';

type Rate = {
  symbol: string;
  label: string;
  market: number;
  from: number;
  markup: number;
};

const RATE_COLORS: Record<string, string> = {
  BTC: '#f7931a',
  ETH: '#627eea',
  USDT: '#26a17b',
  LTC: '#bfbbbb',
  TRX: '#eb0029',
  BNB: '#f3ba2f',
};

function formatRub(value: number) {
  return new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: value < 1000 ? 2 : 0,
  }).format(value);
}

export default function RateTicker() {
  const [rates, setRates] = useState<Rate[]>([]);

  useEffect(() => {
    const load = () => {
      fetch('/api/rates', { cache: 'no-store' })
        .then((r) => r.json())
        .then((data) => {
          if (data.rates) setRates(data.rates);
        })
        .catch(() => {});
    };
    load();
    const interval = setInterval(load, 60000);
    return () => clearInterval(interval);
  }, []);

  if (rates.length === 0) return null;

  const items = rates.map((rate) => (
    <span key={rate.symbol} className="ticker-item">
      <span className="ticker-dot" style={{ backgroundColor: RATE_COLORS[rate.symbol] }} />
      <span className="ticker-symbol">{rate.symbol}</span>
      <span className="ticker-price">{formatRub(rate.from)} ₽</span>
      <span className="ticker-markup">+{rate.markup}%</span>
    </span>
  ));

  return (
    <div className="ticker-bar hidden md:block">
      <div className="ticker-track">
        <div className="ticker-content">{items}{items}{items}{items}</div>
      </div>
    </div>
  );
}
