'use client';

import { useState } from 'react';

const faqs = [
  {
    question: 'Сколько обычно занимает обмен?',
    answer:
      'Если направление типовое и все данные согласованы заранее, обмен обычно занимает от 15 минут. На нестандартные задачи и международные расчеты может понадобиться больше времени.',
  },
  {
    question: 'С какими валютами вы работаете?',
    answer:
      'Основные направления: USDT, BTC, ETH и другие популярные активы. Если нужен редкий токен или сложный маршрут, лучше сразу написать в Telegram и уточнить детали.',
  },
  {
    question: 'Как формируется курс?',
    answer:
      'Курс обсуждается до начала сделки. Мы стараемся зафиксировать понятные условия заранее, чтобы на финальном этапе не возникало неожиданностей.',
  },
  {
    question: 'Можно ли провести крупную сделку?',
    answer:
      'Да, но для крупных сумм лучше заранее написать менеджеру. Это нужно, чтобы согласовать время, формат встречи и маршрут расчета без спешки.',
  },
  {
    question: 'Вы помогаете с международными платежами?',
    answer:
      'Да. Если задача выходит за рамки обычного обмена, мы сначала разбираем кейс, а уже потом предлагаем рабочий сценарий. Не обещаем невозможное и не ведем клиента по шаблону.',
  },
  {
    question: 'Что делать, если у меня остались вопросы до сделки?',
    answer:
      'Проще всего написать в Telegram. Так можно быстро обсудить сумму, валюту, город, желаемый формат и понять, подходит ли вам наш сценарий работы.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-shell section-tint">
      <div className="section-inner max-w-5xl">
        <div className="surface-accent fade-in p-8 md:p-10">
          <div className="section-head">
            <div className="section-kicker">
              <span className="eyebrow-dot" />
              Вопросы и ответы
            </div>
            <h2 className="display-title mt-6 max-w-3xl text-4xl font-semibold leading-tight text-[rgba(31,26,20,0.95)] md:text-5xl">
              Частые вопросы
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
              Коротко о сроках, курсе, формате встречи и том, как начинается работа.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-[26px] border transition-all duration-300 ${
                    isOpen
                      ? 'border-[rgba(17,94,89,0.14)] bg-[rgba(255,255,255,0.82)] shadow-[0_18px_42px_rgba(77,57,37,0.08)]'
                      : 'border-[rgba(73,53,35,0.08)] bg-[rgba(255,255,255,0.58)]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left md:px-7 md:py-6"
                    aria-expanded={isOpen}
                  >
                    <span className="pr-2 text-lg font-semibold text-[rgba(31,26,20,0.95)] md:text-[1.35rem]">
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-11 w-11 flex-none items-center justify-center rounded-full text-xl transition ${
                        isOpen
                          ? 'bg-[rgba(15,118,110,0.12)] text-[rgba(17,94,89,0.94)]'
                          : 'bg-[rgba(255,255,255,0.72)] text-[rgba(17,94,89,0.88)]'
                      }`}
                    >
                      {isOpen ? '\u2212' : '+'}
                    </span>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ${
                      isOpen ? 'opacity-100 [grid-template-rows:1fr]' : 'opacity-0 [grid-template-rows:0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 pt-0 md:px-7 md:pb-7">
                        <div className="section-divider mb-5" />
                        <p className="max-w-3xl text-base leading-8 text-muted">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-[26px] border border-[rgba(73,53,35,0.08)] bg-[rgba(255,255,255,0.54)] p-6 md:flex md:items-center md:justify-between md:gap-6">
            <div>
              <div className="text-sm font-medium uppercase tracking-[0.18em] text-[rgba(17,94,89,0.76)]">
                Остались вопросы
              </div>
              <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
                Если нужен быстрый ответ по сумме, валюте или формату встречи, проще всего написать в Telegram.
              </p>
            </div>
            <a href="#contact" className="btn-primary mt-5 md:mt-0">
              Задать свой вопрос
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
