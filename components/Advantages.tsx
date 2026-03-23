'use client';

const advantages = [
  {
    title: 'Понятный порядок',
    description: 'До начала сделки клиент понимает, что произойдет дальше, кто на связи и какие условия уже согласованы.',
  },
  {
    title: 'Спокойная коммуникация',
    description: 'Без перегруженных обещаний и без давления. На вопросы отвечаем коротко и по делу.',
  },
  {
    title: 'Поддержка по нестандартным кейсам',
    description: 'Если запрос не укладывается в типовой обмен, можно обсудить отдельный маршрут работы.',
  },
  {
    title: 'Офлайн-формат',
    description: 'Для части клиентов важно личное присутствие и человеческий контакт.',
  },
  {
    title: 'Быстрый первый контакт',
    description: 'Telegram и короткая форма дают понятный вход без длинных брифов и лишних барьеров.',
  },
  {
    title: 'Понятные условия',
    description: 'Ключевые детали обсуждаем заранее, чтобы на сделке не появлялись неожиданные условия.',
  },
];

export default function Advantages() {
  return (
    <section id="advantages" className="section-shell">
      <div className="section-inner">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
          <div className="fade-in">
            <div className="section-kicker">
              <span className="eyebrow-dot" />
              Преимущества
            </div>
            <h2 className="display-title mt-6 text-4xl font-semibold leading-tight text-[rgba(31,26,20,0.95)] md:text-5xl">
              Почему клиенты возвращаются
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
              Несколько причин, по которым клиентам удобно возвращаться к нам снова.
            </p>

            <div className="surface-accent mt-8 p-8">
              <div className="text-sm font-medium uppercase tracking-[0.18em] text-[rgba(17,94,89,0.76)]">
                Главное
              </div>
              <p className="display-title mt-4 text-3xl font-semibold leading-tight text-[rgba(31,26,20,0.95)]">
                Спокойный сервис, понятная связь и прозрачные условия до начала сделки.
              </p>
              <p className="mt-4 text-base leading-7 text-muted">
                Именно поэтому с нами удобно работать и при обычных обменах, и при более сложных запросах.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {advantages.map((advantage, index) => (
              <article
                key={advantage.title}
                className={`fade-in rounded-[28px] border p-6 ${
                  index === 0 || index === 3
                    ? 'border-[rgba(17,94,89,0.14)] bg-[rgba(255,249,241,0.92)]'
                    : 'border-[rgba(73,53,35,0.08)] bg-[rgba(255,255,255,0.56)]'
                }`}
                style={{ transitionDelay: `${index * 0.08}s` }}
              >
                <div className="text-sm font-medium uppercase tracking-[0.18em] text-[rgba(17,94,89,0.76)]">
                  0{index + 1}
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-[rgba(31,26,20,0.95)]">{advantage.title}</h3>
                <p className="mt-4 text-base leading-7 text-muted">{advantage.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 fade-in">
          <a href="#contact" className="btn-primary">
            Оставить заявку
          </a>
        </div>
      </div>
    </section>
  );
}
