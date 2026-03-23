'use client';

const testimonials = [
  {
    name: 'Александр',
    rating: 5,
    text: 'Обменял USDT на рубли в тот же день. Все детали согласовали заранее, без сюрпризов на месте.',
    note: 'Разовая сделка',
  },
  {
    name: 'Мария',
    rating: 5,
    text: 'До этого не пользовалась криптообменом. Здесь спокойно объяснили процесс и не торопили с решением.',
    note: 'Первый опыт',
  },
  {
    name: 'Дмитрий',
    rating: 5,
    text: 'Работаю с ребятами регулярно. Нравится, что коммуникация короткая и без лишних обещаний.',
    note: 'Постоянный клиент',
  },
  {
    name: 'Елена',
    rating: 5,
    text: 'Помогли разобраться с международным платежом и объяснили, какой маршрут реально рабочий для моей задачи.',
    note: 'Нестандартный запрос',
  },
  {
    name: 'Сергей',
    rating: 4,
    text: 'Нормальный сервис для тех, кому важен офлайн-формат. Лучше заранее писать по времени, если сумма крупная.',
    note: 'Обмен крупной суммы',
  },
  {
    name: 'Анна',
    rating: 5,
    text: 'Обращалась по рекомендации. Ощущение спокойного сервиса: всё по делу, без давления и без скрытых условий.',
    note: 'По рекомендации',
  },
];

function renderStars(count: number) {
  return Array.from({ length: count }).map((_, star) => (
    <span key={star} aria-hidden="true">
      {'\u2605'}
    </span>
  ));
}

export default function Testimonials() {
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
            Шесть коротких отзывов о том, как проходит общение, согласование условий и сама сделка.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <article
              key={`${testimonial.name}-${testimonial.note}`}
              className={`reveal rounded-[30px] border p-6 ${
                index === 0
                  ? 'border-[rgba(17,94,89,0.14)] bg-[rgba(255,249,241,0.94)] shadow-[0_20px_48px_rgba(77,57,37,0.08)]'
                  : 'border-[rgba(73,53,35,0.08)] bg-[rgba(255,255,255,0.66)]'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-2xl font-semibold text-[rgba(31,26,20,0.95)]">{testimonial.name}</div>
                  <div className="mt-3 flex gap-1 text-[rgba(217,119,6,0.95)]">{renderStars(testimonial.rating)}</div>
                </div>
                <div className="rounded-full border border-[rgba(73,53,35,0.08)] bg-[rgba(255,255,255,0.72)] px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-[rgba(17,94,89,0.82)]">
                  Отзыв
                </div>
              </div>

              <p className="mt-6 text-base leading-8 text-[rgba(31,26,20,0.84)]">
                {testimonial.text}
              </p>

              <div className="mt-8 flex items-center justify-between gap-4 border-t border-[rgba(73,53,35,0.08)] pt-4">
                <div className="text-sm font-medium text-[rgba(17,94,89,0.86)]">{testimonial.note}</div>
                <div className="text-xs uppercase tracking-[0.18em] text-[rgba(106,90,73,0.66)]">
                  Проверено
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
