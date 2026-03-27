'use client';

import Link from 'next/link';
import { useRevealChildren } from '@/hooks/useReveal';

const heroMetrics = [
  { number: '500+', label: 'сделок проведено' },
  { number: '2 года', label: 'на рынке' },
  { number: '15 мин', label: 'средний обмен' },
];

const heroFacts = [
  { label: 'Формат', value: 'Личная встреча в офисе, без посредников' },
  { label: 'Скорость', value: 'Обмен от 15 минут, курс фиксируем заранее' },
  { label: 'Связь', value: 'Пишите в Telegram — отвечаем за минуты' },
];

const supportedCurrencies = ['USDT', 'BTC', 'ETH', 'LTC', 'TRX', 'BNB', 'USD', 'CNY'];

export default function Hero() {
  const factsRef = useRevealChildren<HTMLDivElement>({ staggerMs: 100 });

  return (
    <section className="section-shell pt-32 md:pt-44">
      <div className="section-inner">
        <div className="surface-accent reveal overflow-hidden p-8 md:p-10 relative">
          <div className="hero-blob" />

          <div className="max-w-4xl relative z-10">
            <div className="section-kicker">
              <span className="eyebrow-dot" />
              Офлайн-обмен криптовалюты
            </div>

            <h1 className="display-title mt-6 max-w-4xl text-5xl font-semibold leading-[0.98] text-[rgba(31,26,20,0.96)] md:text-7xl">
              Обмен криптовалюты в <span className="gradient-text">Улан-Удэ</span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-[rgba(106,90,73,0.92)] md:text-xl">
              Покупка и продажа криптовалюты за наличные. Курс и условия
              согласуем до встречи — без скрытых комиссий и сюрпризов.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://t.me/Crypto_u_u" target="_blank" rel="noopener noreferrer" className="btn-primary btn-glow">
                Написать в Telegram
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <Link href="#contact" className="btn-secondary">
                Оставить заявку
              </Link>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-8 md:gap-12">
            {heroMetrics.map((m) => (
              <div key={m.label} className="text-center">
                <div className="text-3xl font-bold text-[rgba(17,94,89,0.95)] md:text-4xl">{m.number}</div>
                <div className="mt-1 text-sm text-muted">{m.label}</div>
              </div>
            ))}
          </div>

          <div className="section-divider mt-10" />

          <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div ref={factsRef} className="grid gap-4 md:grid-cols-3">
              {heroFacts.map((item) => (
                <div key={item.label} className="rounded-[24px] border border-[rgba(73,53,35,0.08)] bg-[rgba(255,255,255,0.56)] p-5">
                  <div className="text-sm font-medium uppercase tracking-[0.18em] text-[rgba(17,94,89,0.78)]">
                    {item.label}
                  </div>
                  <p className="mt-3 text-base leading-7 text-[rgba(31,26,20,0.86)]">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[24px] border border-[rgba(73,53,35,0.08)] bg-[rgba(255,255,255,0.56)] p-5">
              <div className="text-sm font-medium uppercase tracking-[0.18em] text-[rgba(106,90,73,0.8)]">
                Валюты
              </div>
              <div className="mt-4 flex flex-wrap gap-3 currency-float">
                {supportedCurrencies.map((currency) => (
                  <span
                    key={currency}
                    className="rounded-full border border-[rgba(62,43,21,0.12)] bg-[rgba(255,255,255,0.84)] px-4 py-2 text-sm font-semibold text-[rgba(31,26,20,0.82)] transition-all duration-200 hover:border-[rgba(15,118,110,0.3)] hover:bg-[rgba(15,118,110,0.06)]"
                  >
                    {currency}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
