import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Криптообмен | Улан-Удэ и Чита',
  description:
    'Офлайн обмен USDT, BTC и ETH, переводы за рубеж и согласование сделки в Улан-Удэ и Чите.',
  keywords: [
    'криптообмен',
    'USDT',
    'BTC',
    'ETH',
    'Улан-Удэ',
    'Чита',
    'международные платежи',
  ],
  authors: [{ name: 'Криптообмен' }],
  openGraph: {
    title: 'Криптообмен | Офлайн обмен криптовалюты',
    description:
      'Офлайн обмен криптовалюты и переводы за рубеж в Улан-Удэ и Чите.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <a href="#main" className="skip-link">
          Перейти к содержимому
        </a>
        {children}
      </body>
    </html>
  );
}
