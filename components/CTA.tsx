'use client';

export default function CTA() {
  return (
    <section className="section-shell">
      <div className="section-inner max-w-4xl">
        <div className="surface-strong fade-in text-center">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            Связаться сейчас
          </div>
          <h2 className="text-4xl font-semibold leading-tight text-[rgba(31,26,20,0.95)] md:text-5xl">
            Если задача понятна, не нужно читать дальше
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted">
            Напишите в Telegram или оставьте заявку. Мы ответим и уточним детали.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="surface-soft">
              <div className="text-3xl font-semibold text-[rgba(31,26,20,0.95)]">15 мин</div>
              <div className="mt-2 text-sm leading-6 text-muted">Ориентир по типовой сделке после согласования деталей</div>
            </div>
            <div className="surface-soft">
              <div className="text-3xl font-semibold text-[rgba(31,26,20,0.95)]">2 города</div>
              <div className="mt-2 text-sm leading-6 text-muted">Улан-Удэ и Чита как базовые точки работы</div>
            </div>
            <div className="surface-soft">
              <div className="text-3xl font-semibold text-[rgba(31,26,20,0.95)]">Telegram</div>
              <div className="mt-2 text-sm leading-6 text-muted">Основной канал связи для быстрых уточнений</div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href="#contact" className="btn-primary">
              Оставить заявку
            </a>
            <a
              href="https://t.me/Crypto_u_u"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Написать в Telegram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
