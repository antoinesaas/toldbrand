'use client'

import { useI18n } from '@/lib/i18n/use-i18n'

interface Props {
  light?: boolean
}

function MessageStrip({ messages }: { messages: readonly string[]; light?: boolean }) {
  return (
    <>
      {messages.map((msg) => (
        <span
          key={msg}
          className="inline-flex items-center shrink-0 text-[10px] tracking-[0.25em] uppercase mx-8"
        >
          {msg}
        </span>
      ))}
    </>
  )
}

export default function AnnouncementBar({ light = false }: Props) {
  const { t, language } = useI18n()
  const messages = t.announcement

  return (
    <div
      className={`overflow-hidden h-8 flex items-center ${
        light ? 'bg-black/30 text-white/80' : 'bg-black text-white/70'
      }`}
    >
      <div key={language} className="flex w-max animate-marquee will-change-transform">
        <div className="flex shrink-0 items-center">
          <MessageStrip messages={messages} light={light} />
        </div>
        <div className="flex shrink-0 items-center" aria-hidden>
          <MessageStrip messages={messages} light={light} />
        </div>
      </div>
    </div>
  )
}
