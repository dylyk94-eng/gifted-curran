import Link from 'next/link';

const heroFacts = [
  { label: 'Формат', value: 'Офис в Улан-Удэ и работа по заявке в Чите' },
  { label: 'Скорость', value: 'Обычный обмен от 15 минут после согласования' },
  { label: 'Связь', value: 'Основной канал связи: Telegram' },
];

const supportedCurrencies = ['USDT', 'BTC', 'ETH', 'LTC', 'TRX', 'BNB', 'USD', 'CNY'];

export default function Hero() {
  return (
    <section className="section-shell pt-32 md:pt-36">
      <div className="section-inner">
        <div className="surface-accent reveal overflow-hidden p-8 md:p-10">
          <div className="max-w-4xl">
            <div className="section-kicker">
              <span className="eyebrow-dot" />
              Обмен криптовалюты и переводы
            </div>

            <h1 className="display-title mt-6 max-w-4xl text-5xl font-semibold leading-[0.98] text-[rgba(31,26,20,0.96)] md:text-7xl">
              Обмен криптовалюты в <span className="gradient-text">Улан-Удэ и Чите</span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-[rgba(106,90,73,0.92)] md:text-xl">
              Меняем USDT, BTC и ETH. Если нужен перевод за рубеж, тоже поможем.
              До сделки заранее объясняем порядок, сроки и условия.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#contact" className="btn-primary">
                Оставить заявку
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a href="https://t.me/Crypto_u_u" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Написать в Telegram
              </a>
            </div>
          </div>

          <div className="section-divider mt-12" />

          <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="grid gap-4 md:grid-cols-3">
              {heroFacts.map((item) => (
                <div key={item.label} className="rounded-[24px] border border-[rgba(73,53,35,0.08)] bg-[rgba(255,255,255,0.56)] p-5">
                  <div className="text-sm font-medium uppercase tracking-[0.18em] text-[rgba(17,94,89,0.78)]">
                    {item.label}
                  </div>
                  <p className="mt-3 text-base leading-7 text-[rgba(31,26,20,0.86)]">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[24px] border border-[rgba(73,53,35,0.08)] bg-[rgba(255,255,255,0.56)] p-5">
              <div className="text-sm font-medium uppercase tracking-[0.18em] text-[rgba(106,90,73,0.8)]">
                Валюты
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                {supportedCurrencies.map((currency) => (
                  <span
                    key={currency}
                    className="rounded-full border border-[rgba(62,43,21,0.12)] bg-[rgba(255,255,255,0.84)] px-4 py-2 text-sm font-semibold text-[rgba(31,26,20,0.82)]"
                  >
                    {currency}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
