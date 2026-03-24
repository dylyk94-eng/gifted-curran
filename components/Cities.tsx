import Image from 'next/image';
import Link from 'next/link';

const cities = [
  {
    id: 'ulan-ude',
    title: 'Улан-Удэ',
    subtitle: 'Офис на Балтахинова, 17',
    description: 'Здесь проводим обмен, консультации и часть международных переводов.',
    notes: ['Офис', 'Быстрые сделки', 'Понятные условия'],
    href: '/city/ulan-ude',
    image: '/offices/ulan-ude-main.jpg',
  },
  {
    id: 'chita',
    title: 'Чита',
    subtitle: 'Работаем по предварительной заявке',
    description: 'Работаем по заявке и заранее согласуем детали.',
    notes: ['По заявке', 'Связь с менеджером', 'Удобный формат'],
    href: '/city/chita',
    image: '/offices/chita-main.jpg',
  },
];

const internationalServices = [
  'Переводы и расчеты для Таиланда',
  'Оплата товаров и услуг в Китае',
  'Переводы по согласованной схеме',
];

export default function Cities() {
  return (
    <section id="cities" className="section-shell section-tint">
      <div className="section-inner">
        <div className="section-head reveal">
          <div className="section-kicker">
            <span className="eyebrow-dot" />
            Где работаем
          </div>
          <h2 className="display-title mt-6 max-w-3xl text-4xl font-semibold leading-tight text-[rgba(31,26,20,0.95)] md:text-5xl">
            Улан-Удэ и Чита
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            В Улан-Удэ работаем через офис. В Чите — по заявке. Международные переводы
            обсуждаем отдельно.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.72fr)]">
          <div className="grid gap-6 md:grid-cols-2">
            {cities.map((city, index) => (
              <article key={city.id} className="surface reveal overflow-hidden p-0" style={{ transitionDelay: `${index * 0.12}s` }}>
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={city.image}
                    alt={city.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,118,110,0.06),rgba(36,28,20,0.5))]" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">Город</div>
                    <h3 className="mt-2 text-3xl font-semibold">{city.title}</h3>
                    <p className="mt-2 text-sm font-medium text-white/80">{city.subtitle}</p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-base leading-7 text-muted">{city.description}</p>

                  <ul className="mt-6 space-y-3">
                    {city.notes.map((note) => (
                      <li key={note} className="flex items-center gap-3 text-sm text-[rgba(31,26,20,0.82)]">
                        <span className="h-2 w-2 rounded-full bg-[rgba(217,119,6,0.92)]" />
                        {note}
                      </li>
                    ))}
                  </ul>

                  <Link href={city.href} className="btn-secondary mt-8">
                    Подробнее
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <aside className="surface-accent reveal p-8" style={{ transitionDelay: '0.18s' }}>
            <div className="text-sm font-medium uppercase tracking-[0.18em] text-[rgba(17,94,89,0.76)]">
              Международные переводы
            </div>
            <h3 className="display-title mt-3 text-3xl font-semibold text-[rgba(31,26,20,0.95)]">
              Сначала маршрут, потом перевод
            </h3>
            <p className="mt-4 text-base leading-7 text-muted">
              Если нужен перевод за рубеж, сначала смотрим задачу, потом предлагаем
              рабочий вариант.
            </p>

            <div className="mt-8 space-y-3">
              {internationalServices.map((item, index) => (
                <div
                  key={item}
                  className="rounded-[22px] border border-[rgba(62,43,21,0.1)] bg-[rgba(255,255,255,0.72)] px-4 py-4 text-sm leading-6 text-[rgba(31,26,20,0.84)]"
                >
                  <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(15,118,110,0.1)] text-xs font-bold text-[rgba(17,94,89,0.9)]">
                    0{index + 1}
                  </span>
                  {item}
                </div>
              ))}
            </div>

            <a href="https://t.me/Crypto_u_u" target="_blank" rel="noopener noreferrer" className="btn-primary mt-8">
              Обсудить задачу
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
