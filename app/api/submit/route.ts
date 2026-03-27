import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';
import logger from '@/lib/logger';

const DIRECTION_LABELS: Record<string, string> = {
  sell: 'Продать крипту за рубли',
  buy: 'Купить крипту за рубли',
  transfer: 'Международный перевод',
};

const submitSchema = z.object({
  direction: z.string().min(1).max(100),
  name: z.string().min(1, 'Укажите имя').max(100),
  phone: z
    .string()
    .min(1, 'Укажите телефон')
    .regex(/^[\d\s\+\-\(\)]{7,20}$/, 'Некорректный формат телефона'),
  telegram: z.string().max(100).optional(),
  currency: z.string().max(20).optional(),
  amount: z.string().min(1, 'Укажите сумму').max(100),
  message: z.string().max(1000).optional(),
});

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT = process.env.TELEGRAM_CHAT_ID;

const isConfigured =
  !!TELEGRAM_TOKEN &&
  !!TELEGRAM_CHAT &&
  TELEGRAM_TOKEN !== 'DEMO_BOT_TOKEN' &&
  TELEGRAM_CHAT !== '123456789';

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  const limit = rateLimit(ip, { limit: 5, windowMs: 10 * 60 * 1000 });

  if (!limit.allowed) {
    logger.warn({ ip }, 'Rate limit exceeded on /api/submit');
    return NextResponse.json(
      { error: 'Слишком много запросов. Попробуйте через несколько минут.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((limit.resetAt - Date.now()) / 1000)),
        },
      }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Некорректный формат запроса.' }, { status: 400 });
  }

  const parsed = submitSchema.safeParse(body);
  if (!parsed.success) {
    const issues = 'issues' in parsed.error ? parsed.error.issues : (parsed.error as { errors?: { message: string }[] }).errors;
    const firstError = issues?.[0]?.message ?? 'Ошибка валидации.';
    return NextResponse.json({ error: firstError }, { status: 400 });
  }

  const { direction, name, phone, telegram, currency, amount, message } = parsed.data;

  const telegramMessage = [
    'Новая заявка с сайта',
    '',
    `Направление: ${DIRECTION_LABELS[direction] ?? direction}`,
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    `Telegram: ${telegram ?? 'Не указан'}`,
    `Валюта: ${currency ?? 'Не указана'}`,
    `Сумма: ${amount}`,
    `Комментарий: ${message ?? 'Нет'}`,
  ].join('\n');

  try {
    if (isConfigured) {
      const tgResponse = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT,
            text: telegramMessage,
            disable_web_page_preview: true,
          }),
        }
      );

      if (!tgResponse.ok) {
        const tgBody = await tgResponse.text();
        logger.error({ status: tgResponse.status, body: tgBody }, 'Telegram API error');
        return NextResponse.json(
          { error: 'Не удалось отправить заявку. Попробуйте ещё раз.' },
          { status: 502 }
        );
      }

      logger.info({ direction, name, currency, amount }, 'Lead submitted via Telegram');
    } else {
      logger.warn({ direction, name, currency, amount }, 'Lead received in demo mode (Telegram not configured)');
    }

    return NextResponse.json({ success: true, demo: !isConfigured });
  } catch (error) {
    logger.error({ error }, 'Unexpected error in /api/submit');
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера.' },
      { status: 500 }
    );
  }
}
