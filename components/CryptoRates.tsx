'use client';

import { useEffect, useState } from 'react';

type Rate = {
  symbol: 'BTC' | 'ETH' | 'USDT' | 'LTC' | 'TRX' | 'BNB';
  label: string;
  market: number;
  from: number;
  markup: number;
};

type RatesResponse = {
  updatedAt: string;
  disclaimer: string;
  rates: Rate[];
};

const FALLBACK_RATES: Rate[] = [
  { symbol: 'BTC', label: 'Биткоин', market: 0, from: 0, markup: 1.8 },
  { symbol: 'ETH', label: 'Эфир', market: 0, from: 0, markup: 1.8 },
  { symbol: 'USDT', label: 'Тезер', market: 0, from: 0, markup: 1.2 },
  { symbol: 'LTC', label: 'Лайткоин', market: 0, from: 0, markup: 1.6 },
  { symbol: 'TRX', label: 'Трон', market: 0, from: 0, markup: 1.4 },
  { symbol: 'BNB', label: 'BNB', market: 0, from: 0, markup: 1.7 },
];

function formatRub(value: number) {
  return new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: value < 1000 ? 2 : 0,
  }).format(value);
}

export default function CryptoRates() {
  const [rates, setRates] = useState<Rate[]>(FALLBACK_RATES);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [disclaimer, setDisclaimer] = useState(
    'Курс предварительный. Точные условия подтверждаются менеджером перед сделкой.'
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadRates = async () => {
      try {
        setError(null);
        const response = await fetch('/api/rates', { cache: 'no-store' });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = (await response.json()) as RatesResponse;

        if (!active) {
          return;
        }

        setRates(data.rates);
        setUpdatedAt(data.updatedAt);
        setDisclaimer(data.disclaimer);
      } catch (fetchError) {
        console.error('Failed to load rates:', fetchError);
        if (active) {
          setError('Курсы временно недоступны.');
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    loadRates();
    const interval = window.setInterval(loadRates, 60000);

    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <section className="section-shell pt-0">
      <div className="section-inner">
        <div className="surface reveal">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                Ориентир по курсу
              </div>
              <h2 className="text-3xl font-semibold leading-tight text-[rgba(31,26,20,0.95)] md:text-4xl">
                Примерный курс для основных валют
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
                Показываем примерный курс по основным валютам. Точные условия согласуем перед сделкой.
              </p>
            </div>

            <div className="text-sm text-muted">
              {updatedAt
                ? `Обновлено: ${new Date(updatedAt).toLocaleTimeString('ru-RU', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}`
                : 'Курс обновляется'}
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {rates.map((rate) => (
              <article
                key={rate.symbol}
                className="rounded-[24px] border border-[rgba(73,53,35,0.08)] bg-[rgba(255,255,255,0.62)] p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium uppercase tracking-[0.18em] text-[rgba(17,94,89,0.78)]">
                      {rate.symbol}
                    </div>
                    <h3 className="mt-2 text-2xl font-semibold text-[rgba(31,26,20,0.95)]">{rate.label}</h3>
                  </div>
                  <div className="rounded-full bg-[rgba(15,118,110,0.1)] px-3 py-1 text-xs font-semibold text-[rgba(17,94,89,0.92)]">
                    от +{rate.markup}%
                  </div>
                </div>

                <div className={`mt-6 text-3xl font-semibold text-[rgba(31,26,20,0.95)] ${isLoading ? 'animate-pulse' : ''}`}>
                  {rate.from > 0 ? `${formatRub(rate.from)} ₽` : 'Загрузка'}
                </div>

                <div className="mt-3 text-sm leading-6 text-muted">
                  Рынок: {rate.market > 0 ? `${formatRub(rate.market)} ₽` : 'обновляется'}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-sm leading-6 text-muted">{disclaimer}</p>
            {error && <div className="text-sm font-medium text-[rgba(185,28,28,0.82)]">{error}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
