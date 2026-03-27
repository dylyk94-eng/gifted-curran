'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cities, internationalServices } from '@/data/cities';
import { useRevealChildren } from '@/hooks/useReveal';

export default function Cities() {
  const servicesRef = useRevealChildren<HTMLDivElement>({ staggerMs: 100 });
  const city = cities[0];

  return (
    <section id="office" className="section-shell section-tint">
      <div className="section-inner">
        <div className="section-head reveal">
          <div className="section-kicker">
            <span className="eyebrow-dot" />
            Где работаем
          </div>
          <h2 className="display-title mt-6 max-w-3xl text-4xl font-semibold leading-tight text-[rgba(31,26,20,0.95)] md:text-5xl">
            Наш офис
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            Обмен проходит лично в офисе. Для международных переводов подбираем маршрут индивидуально.
          </p>
        </div>

        <div className="surface-strong reveal overflow-hidden p-0 md:grid md:grid-cols-[2fr_3fr]">
          <div className="relative h-56 md:h-auto md:min-h-[320px]">
            <Image
              src={city.image}
              alt={city.title}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 40vw, 100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,118,110,0.06),rgba(36,28,20,0.5))]" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:hidden">
              <h3 className="text-3xl font-semibold">{city.title}</h3>
              <p className="mt-1 text-sm font-medium text-white/80">{city.subtitle}</p>
            </div>
          </div>

          <div className="p-6 md:p-8 lg:p-10">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgba(17,94,89,0.78)]">
              Основной офис
            </div>
            <h3 className="mt-3 hidden text-3xl font-semibold text-[rgba(31,26,20,0.95)] md:block">
              {city.title}
            </h3>
            <p className="mt-1 hidden text-sm font-medium text-[rgba(106,90,73,0.84)] md:block">
              {city.subtitle}
            </p>
            <p className="mt-4 text-base leading-7 text-muted">{city.description}</p>

            <ul className="mt-6 space-y-3">
              {city.notes.map((note) => (
                <li key={note} className="flex items-center gap-3 text-sm text-[rgba(31,26,20,0.82)]">
                  <span className="h-2 w-2 flex-none rounded-full bg-[rgba(217,119,6,0.92)]" />
                  {note}
                </li>
              ))}
            </ul>

            <Link href={city.href} className="btn-secondary mt-8">
              Подробнее
            </Link>
          </div>
        </div>

        <div className="mt-10 reveal">
          <div className="text-sm font-medium uppercase tracking-[0.18em] text-[rgba(17,94,89,0.76)]">
            Международные переводы
          </div>
          <h3 className="mt-3 text-2xl font-semibold text-[rgba(31,26,20,0.95)]">
            Сначала маршрут, потом перевод
          </h3>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
            Если нужен перевод за рубеж, сначала смотрим задачу, потом предлагаем рабочий вариант.
          </p>

          <div ref={servicesRef} className="mt-6 grid gap-4 md:grid-cols-3">
            {internationalServices.map((item, index) => (
              <div
                key={item}
                className="surface rounded-[22px] p-5"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(15,118,110,0.1)] text-sm font-bold text-[rgba(17,94,89,0.9)]">
                  0{index + 1}
                </span>
                <p className="mt-3 text-sm leading-6 text-[rgba(31,26,20,0.84)]">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://t.me/Crypto_u_u"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Обсудить задачу
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
