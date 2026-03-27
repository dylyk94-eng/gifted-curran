'use client';

import { testimonials } from '@/data/testimonials';
import { useRevealChildren } from '@/hooks/useReveal';

function renderStars(count: number) {
  return Array.from({ length: count }).map((_, star) => (
    <span key={star} aria-hidden="true">
      {'\u2605'}
    </span>
  ));
}

export default function Testimonials() {
  const gridRef = useRevealChildren<HTMLDivElement>({ staggerMs: 100 });

  return (
    <section className="section-shell">
      <div className="section-inner">
        <div className="section-head reveal">
          <div className="section-kicker">
            <span className="eyebrow-dot" />
            Отзывы
          </div>
          <h2 className="display-title mt-6 max-w-3xl text-4xl font-semibold leading-tight text-[rgba(31,26,20,0.95)] md:text-5xl">
            Что говорят клиенты
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            Отзывы клиентов об обмене, сопровождении и работе с международными переводами.
          </p>
        </div>

        <div ref={gridRef} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <article
              key={`${testimonial.name}-${testimonial.note}`}
              className={`testimonial-card rounded-[30px] border border-[rgba(73,53,35,0.08)] p-6 ${
                index % 2 === 0
                  ? 'bg-[rgba(255,255,255,0.66)]'
                  : 'bg-[rgba(255,252,247,0.78)]'
              }`}
              style={{ '--tw-shadow': 'var(--shadow-soft)' } as React.CSSProperties}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-gradient-to-br from-[rgba(15,118,110,0.8)] to-[rgba(198,125,31,0.8)] text-sm font-bold text-white">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-[rgba(31,26,20,0.95)]">{testimonial.name}</div>
                    <div className="flex gap-1 text-sm text-[rgba(217,119,6,0.95)]">{renderStars(testimonial.rating)}</div>
                  </div>
                </div>
                <div className="rounded-full border border-[rgba(73,53,35,0.08)] bg-[rgba(255,255,255,0.72)] px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-[rgba(17,94,89,0.82)]">
                  Отзыв
                </div>
              </div>

              <p className="mt-5 text-base leading-8 text-[rgba(31,26,20,0.84)]">
                {testimonial.text}
              </p>

              <div className="mt-6 flex items-center justify-between gap-4 border-t border-[rgba(73,53,35,0.08)] pt-4">
                <div className="text-sm font-medium text-[rgba(17,94,89,0.86)]">{testimonial.note}</div>
                <div className="text-xs uppercase tracking-[0.18em] text-[rgba(106,90,73,0.66)]">
                  Клиент
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://t.me/Crypto_u_u"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[rgba(17,94,89,0.88)] transition hover:text-[rgba(17,94,89,1)]"
          >
            Все отзывы в нашем Telegram-канале
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
