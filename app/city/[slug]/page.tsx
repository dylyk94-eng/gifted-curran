import { notFound } from 'next/navigation';
import Contact from '@/components/Contact';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';

const cities = {
  'ulan-ude': {
    name: 'Улан-Удэ',
    title: 'Офлайн криптообмен в Улан-Удэ',
    description:
      'Обмен USDT, BTC, ETH и других активов через офис. Подходит для разовых сделок, регулярного обмена и переводов за рубеж.',
    officeLabel: 'Офис на Балтахинова, 17',
    leadCta: 'Обсудить обмен в Улан-Удэ',
    stats: {
      clients: '5 000+',
      transactions: '80 000+',
      rating: '4.9/5',
    },
  },
  chita: {
    name: 'Чита',
    title: 'Криптообмен в Чите по предварительной заявке',
    description:
      'Для клиентов из Читы работаем по заявке: заранее подтверждаем сумму, направление обмена и формат связи.',
    officeLabel: 'Работаем по согласованной заявке',
    leadCta: 'Оставить заявку в Чите',
    stats: {
      clients: '2 000+',
      transactions: '20 000+',
      rating: '4.8/5',
    },
  },
};

const cityBenefits = [
  {
    icon: 'Офис',
    title: 'Понятный формат',
    description: 'До начала обмена вы знаете, где проходит встреча и на каких условиях.',
  },
  {
    icon: 'Срок',
    title: 'Быстрая коммуникация',
    description: 'Большинство вопросов решаем в Telegram.',
  },
  {
    icon: 'Курс',
    title: 'Прозрачные условия',
    description: 'Сначала согласуем детали, потом проводим сделку.',
  },
  {
    icon: 'Маршрут',
    title: 'Переводы за рубеж',
    description: 'Если нужен перевод, сначала уточняем детали и формат.',
  },
  {
    icon: 'Связь',
    title: 'Связь с менеджером',
    description: 'Можно быстро уточнить детали и получить ответ по сделке.',
  },
  {
    icon: 'Темп',
    title: 'Подходит для постоянных клиентов',
    description: 'Если вы меняете криптовалюту часто, можно быстро наладить удобный порядок работы.',
  },
];

export default function CityPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const city = cities[slug as keyof typeof cities];

  if (!city) {
    notFound();
  }

  return (
    <div className="relative">
      <Header />

      <main id="main" className="relative" tabIndex={-1}>
        <section className="section-shell pt-32 md:pt-36">
          <div className="section-inner">
            <div className="surface-strong fade-in max-w-5xl">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                {city.name} • {city.officeLabel}
              </div>
              <h1 className="max-w-4xl text-5xl font-semibold leading-tight text-[rgba(31,26,20,0.96)] md:text-6xl">
                <span className="gradient-text">{city.title}</span>
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
                {city.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://t.me/Crypto_u_u"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Написать в Telegram
                </a>
                <a href="#contact" className="btn-secondary">
                  Оставить заявку
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell py-12">
          <div className="section-inner grid gap-6 md:grid-cols-3">
            {[
              { value: city.stats.clients, label: 'Клиентов обратились повторно или по рекомендации' },
              { value: city.stats.transactions, label: 'Сделок проведено по основным направлениям' },
              { value: city.stats.rating, label: 'Средняя оценка сервиса по отзывам клиентов' },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="surface-soft fade-in"
                style={{ transitionDelay: `${index * 0.08}s` }}
              >
                <div className="text-sm font-medium uppercase tracking-[0.18em] text-[rgba(17,94,89,0.76)]">
                  Показатель
                </div>
                <div className="mt-3 text-4xl font-semibold text-[rgba(31,26,20,0.95)]">
                  {stat.value}
                </div>
                <p className="mt-3 text-sm leading-6 text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-shell pt-8">
          <div className="section-inner">
            <div className="section-head fade-in">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                Почему выбирают нас
              </div>
              <h2 className="text-4xl font-semibold leading-tight text-[rgba(31,26,20,0.95)] md:text-5xl">
                Почему клиентам подходит такой формат работы
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
                Коротко о том, как проходит работа и почему такой формат удобен.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {cityBenefits.map((item, index) => (
                <div
                  key={item.title}
                  className="surface fade-in"
                  style={{ transitionDelay: `${index * 0.08}s` }}
                >
                  <div className="text-sm font-medium uppercase tracking-[0.18em] text-[rgba(217,119,6,0.92)]">
                    {item.icon}
                  </div>
                  <h3 className="mt-3 text-2xl font-semibold text-[rgba(31,26,20,0.95)]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Services />
        <Testimonials />
        <FAQ />
        <Contact />

        <section className="section-shell pt-8">
          <div className="section-inner">
            <div className="surface-strong fade-in text-center">
              <h3 className="text-3xl font-semibold text-[rgba(31,26,20,0.95)]">
                {city.leadCta}
              </h3>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted">
                Напишите в Telegram или отправьте форму. Дальше согласуем детали и проведем сделку.
              </p>
              <a href="#contact" className="btn-primary mt-8">
                Перейти к заявке
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export function generateStaticParams() {
  return [
    { slug: 'ulan-ude' },
    { slug: 'chita' },
  ];
}
