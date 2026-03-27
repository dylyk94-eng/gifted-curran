'use client';

import { useEffect, useState } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { useCountUp } from '@/hooks/useCountUp';

type Rate = {
  symbol: string;
  label: string;
  market: number;
  from: number;
  markup: number;
};

function formatRub(value: number) {
  return new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: value < 1000 ? 2 : 0,
  }).format(value);
}

function formatCrypto(value: number, symbol: string) {
  const decimals = symbol === 'USDT' ? 2 : symbol === 'BTC' ? 8 : 6;
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: decimals,
  }).format(value);
}

function AnimatedResult({ value, suffix, decimals }: { value: number; suffix: string; decimals: number }) {
  const animated = useCountUp(value, { duration: 600, decimals, enabled: value > 0 });
  if (value === 0) return <>0{suffix}</>;
  const formatted = decimals > 0
    ? new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: decimals }).format(animated)
    : formatRub(animated);
  return <>{formatted}{suffix}</>;
}

export default function Calculator() {
  const [rates, setRates] = useState<Rate[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState('USDT');
  const [cryptoAmount, setCryptoAmount] = useState('1000');
  const [rubAmount, setRubAmount] = useState('');
  const [activeField, setActiveField] = useState<'crypto' | 'rub'>('crypto');
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useReveal();

  useEffect(() => {
    fetch('/api/rates', { cache: 'no-store' })
      .then((r) => r.json())
      .then((data) => {
        if (data.rates) {
          setRates(data.rates);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const selectedRate = rates.find((r) => r.symbol === selectedSymbol);

  const handleCryptoChange = (value: string) => {
    setActiveField('crypto');
    setCryptoAmount(value);
    if (selectedRate) {
      const num = parseFloat(value) || 0;
      setRubAmount(num > 0 ? (num * selectedRate.from).toFixed(2) : '');
    }
  };

  const handleRubChange = (value: string) => {
    setActiveField('rub');
    setRubAmount(value);
    if (selectedRate) {
      const num = parseFloat(value) || 0;
      setCryptoAmount(num > 0 ? (num / selectedRate.from).toFixed(8) : '');
    }
  };

  const handleSymbolChange = (symbol: string) => {
    setSelectedSymbol(symbol);
    setActiveField('crypto');
    const rate = rates.find((r) => r.symbol === symbol);
    if (rate) {
      const num = parseFloat(cryptoAmount) || 0;
      setRubAmount(num > 0 ? (num * rate.from).toFixed(2) : '');
    }
  };

  // Initialize rub amount once rates load
  const rateFrom = selectedRate?.from ?? 0;
  useEffect(() => {
    if (rateFrom > 0 && activeField === 'crypto') {
      const num = parseFloat(cryptoAmount) || 0;
      setRubAmount(num > 0 ? (num * rateFrom).toFixed(2) : '');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rateFrom]);

  return (
    <section className="section-shell">
      <div className="section-inner">
        <div ref={sectionRef} className="surface-strong reveal p-8 md:p-10">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            Калькулятор
          </div>
          <h2 className="mt-3 text-3xl font-semibold text-[rgba(31,26,20,0.95)] md:text-4xl">
            Рассчитать обмен
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            Укажите сумму — мы покажем, сколько получите по текущему курсу с учётом наценки.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="space-y-5">
              <div>
                <label htmlFor="calc-crypto" className="field-label">
                  Криптовалюта
                </label>
                <select
                  id="calc-crypto"
                  value={selectedSymbol}
                  onChange={(e) => handleSymbolChange(e.target.value)}
                  className="input-base"
                >
                  {(rates.length > 0 ? rates : [{ symbol: 'USDT', label: 'Тезер' }]).map((r) => (
                    <option key={r.symbol} value={r.symbol}>
                      {r.label} ({r.symbol})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="calc-amount-crypto" className="field-label">
                  Сумма в {selectedSymbol}
                </label>
                <input
                  id="calc-amount-crypto"
                  type="number"
                  min="0"
                  step="any"
                  value={cryptoAmount}
                  onChange={(e) => handleCryptoChange(e.target.value)}
                  onFocus={() => setActiveField('crypto')}
                  className="input-base"
                  placeholder="0"
                />
              </div>

              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => {
                    if (activeField === 'crypto') {
                      setActiveField('rub');
                      handleRubChange(rubAmount);
                    } else {
                      setActiveField('crypto');
                      handleCryptoChange(cryptoAmount);
                    }
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(73,53,35,0.12)] bg-[rgba(255,255,255,0.7)] text-muted transition hover:border-[rgba(15,118,110,0.3)] hover:text-[rgba(17,94,89,0.9)]"
                  aria-label="Поменять направление"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </button>
              </div>

              <div>
                <label htmlFor="calc-amount-rub" className="field-label">
                  Сумма в ₽
                </label>
                <input
                  id="calc-amount-rub"
                  type="number"
                  min="0"
                  step="any"
                  value={rubAmount}
                  onChange={(e) => handleRubChange(e.target.value)}
                  onFocus={() => setActiveField('rub')}
                  className="input-base"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center rounded-[var(--radius-lg,24px)] bg-[rgba(15,118,110,0.1)] p-6 md:p-8">
              {isLoading ? (
                <div className="space-y-3">
                  <div className="shimmer h-4 w-32" />
                  <div className="shimmer h-10 w-48" />
                  <div className="shimmer h-4 w-40" />
                </div>
              ) : selectedRate ? (
                <>
                  <div className="text-sm font-medium text-muted">Вы получите</div>
                  <div className="mt-3 text-4xl font-semibold text-[rgba(31,26,20,0.95)]">
                    {activeField === 'crypto' ? (
                      <AnimatedResult value={parseFloat(rubAmount) || 0} suffix=" ₽" decimals={0} />
                    ) : (
                      <AnimatedResult value={parseFloat(cryptoAmount) || 0} suffix={` ${selectedSymbol}`} decimals={selectedSymbol === 'BTC' ? 8 : selectedSymbol === 'USDT' ? 2 : 6} />
                    )}
                  </div>
                  <div className="mt-4 space-y-1 text-sm text-muted">
                    <div>
                      Курс: {formatRub(selectedRate.from)} ₽ за 1 {selectedSymbol}
                    </div>
                    <div>
                      Наценка: +{selectedRate.markup}% к рыночному курсу
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-sm text-muted">Курсы временно недоступны</div>
              )}
            </div>
          </div>

          <p className="mt-6 text-sm leading-6 text-muted">
            Итоговый курс фиксируется менеджером в момент подтверждения сделки.
          </p>
        </div>
      </div>
    </section>
  );
}
