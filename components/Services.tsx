const serviceGroups = [
  {
    title: 'Обмен криптовалюты',
    description:
      'Работаем с популярными активами и заранее согласуем ключевые параметры сделки.',
    points: ['USDT, BTC, ETH, SOL', 'Наличные и безналичные сценарии', 'Фиксация условий перед началом'],
  },
  {
    title: 'Международные расчеты',
    description:
      'Помогаем закрыть платежи за услуги, товары, недвижимость и частные задачи.',
    points: ['Таиланд и Китай', 'Консультация по маршруту оплаты', 'Сопровождение нестандартных кейсов'],
  },
  {
    title: 'Личное сопровождение',
    description:
      'Если клиенту важна ясность процесса, подключаем менеджера и не оставляем его одного.',
    points: ['Подготовка до встречи', 'Проверка деталей сделки', 'Связь в Telegram после обмена'],
  },
];

const process = [
  ['Запрос', 'Вы пишете, какую валюту и задачу нужно решить.'],
  ['Согласование', 'Подтверждаем сумму, курс, город и удобный формат.'],
  ['Проведение', 'Организуем сделку и фиксируем результат без лишней суеты.'],
];

export default function Services() {
  return (
    <section id="services" className="section-shell">
      <div className="section-inner">
        <div className="section-head reveal">
          <div className="section-kicker">
            <span className="eyebrow-dot" />
            Услуги и процесс
          </div>
          <h2 className="display-title mt-6 max-w-3xl text-4xl font-semibold leading-tight text-[rgba(31,26,20,0.95)] md:text-5xl">
            Что мы делаем
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            Основные услуги и порядок работы.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="surface-accent reveal p-8" style={{ transitionDelay: '0.05s' }}>
            <div className="text-sm font-medium uppercase tracking-[0.18em] text-[rgba(17,94,89,0.76)]">
              Как мы работаем
            </div>
            <div className="mt-6 space-y-4">
              {process.map(([title, text], index) => (
                <div key={title} className="flex gap-4 rounded-[24px] border border-[rgba(62,43,21,0.1)] bg-[rgba(255,255,255,0.74)] p-5">
                  <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[rgba(15,118,110,0.1)] text-sm font-bold text-[rgba(17,94,89,0.92)]">
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-[rgba(31,26,20,0.95)]">{title}</div>
                    <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            {serviceGroups.map((group, index) => (
              <article key={group.title} className="surface reveal" style={{ transitionDelay: `${index * 0.12}s` }}>
                <div className="text-sm font-medium uppercase tracking-[0.18em] text-[rgba(17,94,89,0.76)]">
                  Направление {index + 1}
                </div>
                <h3 className="mt-3 text-2xl font-semibold text-[rgba(31,26,20,0.95)]">{group.title}</h3>
                <p className="mt-4 text-base leading-7 text-muted">{group.description}</p>
                <ul className="mt-6 grid gap-3 md:grid-cols-3">
                  {group.points.map((point) => (
                    <li
                      key={point}
                      className="rounded-[20px] border border-[rgba(73,53,35,0.08)] bg-[rgba(255,255,255,0.55)] px-4 py-3 text-sm leading-6 text-[rgba(31,26,20,0.84)]"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
