'use client';

const steps = [
  {
    number: '01',
    title: 'Пишете или оставляете заявку',
    description: 'Коротко описываете задачу: город, валюту, сумму и удобный формат связи.',
  },
  {
    number: '02',
    title: 'Согласуем условия',
    description: 'Подтверждаем направление, ориентир по курсу, время и формат проведения сделки.',
  },
  {
    number: '03',
    title: 'Проводим обмен',
    description: 'Если сценарий подходит обеим сторонам, переходим к сделке без лишних промежуточных шагов.',
  },
  {
    number: '04',
    title: 'Остаемся на связи',
    description: 'После завершения можно вернуться с повторным запросом или уточнить сопутствующие вопросы.',
  },
];

export default function HowItWorks() {
  return (
    <section className="section-shell">
      <div className="section-inner">
        <div className="section-head fade-in text-center md:mx-auto">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            Как это работает
          </div>
          <h2 className="text-4xl font-semibold leading-tight text-[rgba(31,26,20,0.95)] md:text-5xl">
            Четыре шага без лишней сложности
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted">
            Коротко о том, как начинается работа и как проходит сделка.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <article
              key={step.number}
              className="surface fade-in"
              style={{ transitionDelay: `${index * 0.08}s` }}
            >
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[rgba(217,119,6,0.92)]">
                Шаг {step.number}
              </div>
              <h3 className="mt-3 text-2xl font-semibold text-[rgba(31,26,20,0.95)]">
                {step.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-muted">{step.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center fade-in">
          <a href="#contact" className="btn-primary">
            Перейти к заявке
          </a>
        </div>
      </div>
    </section>
  );
}
