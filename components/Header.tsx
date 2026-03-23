'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '#cities', label: 'Города' },
  { href: '#services', label: 'Услуги' },
  { href: '#contact', label: 'Контакты' },
  { href: '#faq', label: 'Вопросы' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[rgba(73,53,35,0.08)] bg-[rgba(248,243,235,0.78)] backdrop-blur-xl">
      <div
        className={`mx-auto flex max-w-[74rem] items-center justify-between px-4 py-4 transition md:px-8 ${isScrolled ? 'shadow-[0_16px_36px_rgba(77,57,37,0.08)]' : ''}`}
      >
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#115e59,#c67d1f)] text-base font-bold text-white shadow-[0_12px_28px_rgba(17,94,89,0.22)]">
            К
          </div>
          <div>
            <p className="text-sm font-black text-[rgba(36,28,20,0.96)]">Криптообмен</p>
            <p className="text-xs text-[rgba(84,68,53,0.72)]">Офлайн обмен и переводы</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-[rgba(73,53,35,0.08)] bg-[rgba(255,255,255,0.42)] p-1.5 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-[rgba(36,28,20,0.74)] transition hover:bg-[rgba(255,255,255,0.7)] hover:text-[rgba(17,94,89,1)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <a href="https://t.me/Crypto_u_u" target="_blank" rel="noreferrer" className="btn-primary">
            Написать в Telegram
          </a>
        </div>

        <button
          type="button"
          className="relative block rounded-full border border-[rgba(73,53,35,0.14)] bg-[rgba(255,255,255,0.5)] p-2 md:hidden"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={isMobileMenuOpen}
        >
          <span className="block h-0.5 w-5 bg-[rgba(36,28,20,0.88)]" />
          <span className="mt-1 block h-0.5 w-5 bg-[rgba(36,28,20,0.88)]" />
          <span className="mt-1 block h-0.5 w-5 bg-[rgba(36,28,20,0.88)]" />
        </button>
      </div>

      <div
        className={`fixed inset-x-0 top-full z-40 border-b border-[rgba(73,53,35,0.08)] bg-[rgba(248,243,235,0.98)] p-4 transition-all duration-300 md:hidden ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'}`}
      >
        <div className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-2xl border border-transparent bg-[rgba(255,255,255,0.35)] px-4 py-3 text-sm font-medium text-[rgba(36,28,20,0.82)] hover:border-[rgba(73,53,35,0.08)] hover:bg-[rgba(255,255,255,0.65)]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <a href="https://t.me/Crypto_u_u" target="_blank" rel="noreferrer" className="btn-primary block text-center">
            Написать в Telegram
          </a>
        </div>
      </div>
    </header>
  );
}
