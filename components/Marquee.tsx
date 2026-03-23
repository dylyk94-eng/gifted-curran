'use client';

const items = [
  'Офлайн обмен через офис',
  'Условия согласуем заранее',
  'Быстрая связь в Telegram',
  'Обмен и переводы',
  'Улан-Удэ и Чита',
];

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-[rgba(62,43,21,0.08)] bg-[rgba(255,252,247,0.55)] py-4">
      <div className="flex gap-8 whitespace-nowrap animate-marquee">
        {[...items, ...items, ...items].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center gap-3 text-sm font-medium text-[rgba(31,26,20,0.76)]"
          >
            <span className="h-2 w-2 rounded-full bg-[rgba(15,118,110,0.78)]" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
