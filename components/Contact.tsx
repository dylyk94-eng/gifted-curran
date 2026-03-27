'use client';

import { useRef, useState } from 'react';

interface FormData {
  direction: string;
  name: string;
  phone: string;
  telegram: string;
  currency: string;
  amount: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  amount?: string;
}

const offices = [
  {
    city: 'Улан-Удэ',
    address: 'ул. Балтахинова, 17',
    schedule: 'Ежедневно, 12:00-18:00',
    details: 'Подходит для стандартных обменов и личной консультации.',
  },
];

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    direction: 'sell',
    name: '',
    phone: '',
    telegram: '',
    currency: '',
    amount: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'demo' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const validateForm = () => {
    const nextErrors: FormErrors = {};

    if (formData.name.trim().length < 2) {
      nextErrors.name = 'Укажите имя длиной не меньше 2 символов.';
    }

    if (!/^\+?[\d\s()-]{10,}$/.test(formData.phone.trim())) {
      nextErrors.phone = 'Укажите телефон в корректном формате.';
    }

    if (!formData.amount.trim()) {
      nextErrors.amount = 'Добавьте сумму или ориентир по сделке.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      const firstInvalidField = formRef.current?.querySelector('[aria-invalid="true"]') as HTMLElement | null;
      firstInvalidField?.focus();
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus(result.demo ? 'demo' : 'success');
        formRef.current?.reset();
        setFormData({
          direction: 'sell',
          name: '',
          phone: '',
          telegram: '',
          currency: '',
          amount: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      window.setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="section-shell">
      <div className="section-inner">
        <div className="section-head reveal">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            Оставить заявку
          </div>
          <h2 className="max-w-3xl text-4xl font-semibold leading-tight text-[rgba(31,26,20,0.95)] md:text-5xl">
            Готовы обменять? Напишите нам
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            Укажите валюту и сумму — менеджер свяжется с вами, подтвердит курс и назначит время встречи.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className="space-y-6">
            <div className="surface reveal">
              <div className="text-sm font-medium uppercase tracking-[0.18em] text-[rgba(17,94,89,0.76)]">
                Канал связи
              </div>
              <h3 className="mt-3 text-3xl font-semibold text-[rgba(31,26,20,0.95)]">
                Быстрее всего через Telegram
              </h3>
              <p className="mt-4 text-base leading-7 text-muted">
                Напишите — ответим за несколько минут. Сразу обсудим сумму, курс и удобное время.
              </p>
              <a
                href="https://t.me/Crypto_u_u"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-6"
              >
                Открыть Telegram
              </a>
            </div>

            {offices.map((office, index) => (
              <article
                key={office.city}
                className="surface reveal"
                style={{ transitionDelay: `${0.12 + index * 0.08}s` }}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-2xl font-semibold text-[rgba(31,26,20,0.95)]">{office.city}</h3>
                  <span className="rounded-full bg-[rgba(15,118,110,0.1)] px-3 py-1 text-sm font-semibold text-[rgba(17,94,89,0.88)]">
                    На связи
                  </span>
                </div>
                <div className="mt-5 space-y-4 text-sm leading-6 text-[rgba(31,26,20,0.82)]">
                  <div>
                    <div className="font-semibold text-[rgba(106,90,73,0.84)]">Адрес</div>
                    <div>{office.address}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-[rgba(106,90,73,0.84)]">График</div>
                    <div>{office.schedule}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-[rgba(106,90,73,0.84)]">Комментарий</div>
                    <div>{office.details}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="surface-strong reveal" style={{ transitionDelay: '0.1s' }}>
            <div className="mb-6">
              <div className="text-sm font-medium uppercase tracking-[0.18em] text-[rgba(17,94,89,0.76)]">
                Заявка
              </div>
              <h3 className="mt-3 text-3xl font-semibold text-[rgba(31,26,20,0.95)]">
                Форма заявки
              </h3>
            </div>

            {submitStatus === 'success' && (
              <div className="toast-enter mb-5 rounded-2xl border border-[rgba(47,133,90,0.22)] bg-[rgba(47,133,90,0.1)] px-4 py-3 text-sm text-[rgba(31,26,20,0.84)]">
                Заявка отправлена. Менеджер свяжется с вами в ближайшее время.
              </div>
            )}
            {submitStatus === 'demo' && (
              <div className="toast-enter mb-5 rounded-2xl border border-[rgba(217,119,6,0.22)] bg-[rgba(217,119,6,0.1)] px-4 py-3 text-sm text-[rgba(31,26,20,0.84)]">
                Уведомления временно не настроены. Для связи напишите нам напрямую в{' '}
                <a href="https://t.me/Crypto_u_u" target="_blank" rel="noopener noreferrer" className="font-medium underline">Telegram</a>.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="toast-enter mb-5 rounded-2xl border border-[rgba(185,28,28,0.18)] bg-[rgba(185,28,28,0.08)] px-4 py-3 text-sm text-[rgba(31,26,20,0.84)]">
                Не удалось отправить заявку. Попробуйте еще раз или свяжитесь с нами в Telegram.
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-1">
                <label htmlFor="direction" className="field-label">
                  Направление
                </label>
                <select
                  id="direction"
                  name="direction"
                  value={formData.direction}
                  onChange={handleChange}
                  className="input-base"
                >
                  <option value="sell">Продать крипту за рубли</option>
                  <option value="buy">Купить крипту за рубли</option>
                  <option value="transfer">Международный перевод</option>
                </select>
              </div>

              <div className="md:col-span-1">
                <label htmlFor="currency" className="field-label">
                  Валюта
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="input-base"
                >
                  <option value="">Выберите направление</option>
                  <option value="USDT">USDT</option>
                  <option value="BTC">BTC</option>
                  <option value="ETH">ETH</option>
                  <option value="LTC">LTC</option>
                  <option value="TRX">TRX</option>
                  <option value="BNB">BNB</option>
                  <option value="SOL">SOL</option>
                  <option value="Другое">Другое</option>
                </select>
              </div>

              <div className="md:col-span-1">
                <label htmlFor="name" className="field-label">
                  Имя
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-base"
                  placeholder="Как к вам обращаться"
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && <p className="mt-2 text-sm text-[rgba(185,28,28,0.82)]">{errors.name}</p>}
              </div>

              <div className="md:col-span-1">
                <label htmlFor="phone" className="field-label">
                  Телефон
                </label>
                <input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-base"
                  placeholder="+7 999 999 99 99"
                  aria-invalid={Boolean(errors.phone)}
                />
                {errors.phone && <p className="mt-2 text-sm text-[rgba(185,28,28,0.82)]">{errors.phone}</p>}
              </div>

              <div className="md:col-span-1">
                <label htmlFor="telegram" className="field-label">
                  Telegram
                </label>
                <input
                  id="telegram"
                  name="telegram"
                  value={formData.telegram}
                  onChange={handleChange}
                  className="input-base"
                  placeholder="@username"
                />
              </div>

              <div className="md:col-span-1">
                <label htmlFor="amount" className="field-label">
                  Сумма
                </label>
                <input
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="input-base"
                  placeholder="Например, 5000 USDT или 300 000 RUB"
                  aria-invalid={Boolean(errors.amount)}
                />
                {errors.amount && <p className="mt-2 text-sm text-[rgba(185,28,28,0.82)]">{errors.amount}</p>}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="message" className="field-label">
                  Комментарий <span className="font-normal text-muted">(необязательно)</span>
                </label>
                <input
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="input-base"
                  placeholder="Удобное время или дополнительные детали"
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-6 text-muted">
                  Отправляя форму, вы соглашаетесь с{' '}
                  <a href="/privacy" className="underline hover:text-[rgba(17,94,89,1)]">политикой конфиденциальности</a>.
                </p>
                <button type="submit" className="btn-primary min-w-[12rem]" disabled={isSubmitting}>
                  {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
