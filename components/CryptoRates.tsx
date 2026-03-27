'use client';

import { useEffect, useRef, useState } from 'react';
import { useRevealChildren } from '@/hooks/useReveal';
import { useCountUp } from '@/hooks/useCountUp';

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

function AnimatedPrice({ value, loading }: { value: number; loading: boolean }) {
  const decimals = value < 1000 ? 2 : 0;
  const animated = useCountUp(value, { duration: 1400, decimals, enabled: !loading && value > 0 });
  const prevValue = useRef(value);
  const [flash, setFlash] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    if (prevValue.current > 0 && value > 0 && value !== prevValue.current) {
      setFlash(value > prevValue.current ? 'up' : 'down');
      const timer = setTimeout(() => setFlash(null), 800);
      prevValue.current = value;
      return () => clearTimeout(timer);
    }
    prevValue.current = value;
  }, [value]);

  if (loading) return <div className="shimmer h-9 w-48" />;
  if (value === 0) return <span>Нет данных</span>;

  return (
    <span
      className={`transition-colors duration-500 ${
        flash === 'up'
          ? 'text-[rgba(22,163,74,0.95)]'
          : flash === 'down'
            ? 'text-[rgba(220,38,38,0.9)]'
            : ''
      }`}
    >
      {formatRub(animated)} ₽
    </span>
  );
}

function AnimatedMarket({ value, loading }: { value: number; loading: boolean }) {
  const decimals = value < 1000 ? 2 : 0;
  const animated = useCountUp(value, { duration: 1400, decimals, enabled: !loading && value > 0 });

  if (loading) return <div className="shimmer h-4 w-32" />;

  return <>Рынок: {value > 0 ? `${formatRub(animated)} ₽` : 'обновляется'}</>;
}

export default function CryptoRates() {
  const [rates, setRates] = useState<Rate[]>(FALLBACK_RATES);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [disclaimer, setDisclaimer] = useState(
    'Курс предварительный. Точные условия подтверждаются менеджером перед сделкой.'
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isStale, setIsStale] = useState(false);

  const gridRef = useRevealChildren<HTMLDivElement>({ staggerMs: 80 });

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

        if (!active) return;

        setRates(data.rates);
        setUpdatedAt(data.updatedAt);
        setDisclaimer(data.disclaimer);
        const ageMs = Date.now() - new Date(data.updatedAt).getTime();
        setIsStale(ageMs > 2 * 60 * 1000);
      } catch (fetchError) {
        console.error('Failed to load rates:', fetchError);
        if (active) setError('Курсы временно недоступны.');
      } finally {
        if (active) setIsLoading(false);
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
                Актуальный курс
              </div>
              <h2 className="text-3xl font-semibold leading-tight text-[rgba(31,26,20,0.95)] md:text-4xl">
                Курс продажи криптовалюты за рубли
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
                Курс обновляется каждую минуту. Финальную цену фиксируем в момент подтверждения сделки.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted">
              {updatedAt && (
                <span className="live-dot" />
              )}
              {updatedAt
                ? `Обновлено: ${new Date(updatedAt).toLocaleTimeString('ru-RU', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}`
                : 'Курс обновляется'}
            </div>
          </div>

          <div ref={gridRef} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {rates.map((rate) => (
              <article
                key={rate.symbol}
                className="rate-card rounded-[24px] border border-[rgba(73,53,35,0.08)] bg-[rgba(255,255,255,0.62)] p-5"
                style={{ '--rate-color': RATE_COLORS[rate.symbol] } as React.CSSProperties}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium uppercase tracking-[0.18em] text-[rgba(17,94,89,0.78)]">
                      {rate.symbol}
                    </div>
                    <h3 className="mt-2 text-2xl font-semibold text-[rgba(31,26,20,0.95)]">{rate.label}</h3>
                  </div>
                  <div className="rounded-full bg-[rgba(198,125,31,0.1)] px-3 py-1 text-xs font-semibold text-[rgba(168,105,16,0.88)]">
                    наценка {rate.markup}%
                  </div>
                </div>

                <div className="mt-6 flex items-baseline gap-3">
                  <span className="text-3xl font-semibold text-[rgba(31,26,20,0.95)]">
                    <AnimatedPrice value={rate.from} loading={isLoading} />
                  </span>
                  {!isLoading && rate.market > 0 && (
                    <span className="text-base text-muted line-through">
                      {formatRub(rate.market)} ₽
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-sm leading-6 text-muted">{disclaimer}</p>
            <div className="flex flex-col gap-2 text-right">
              {isStale && !error && (
                <div className="text-sm font-medium text-[rgba(217,119,6,0.88)]">
                  Курс может быть устаревшим — данные не обновлялись более 2 минут
                </div>
              )}
              {error && <div className="text-sm font-medium text-[rgba(185,28,28,0.82)]">{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
