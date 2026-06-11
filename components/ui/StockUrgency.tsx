const STOCK: Record<string, number> = {
  'jewpiter': 4,
  'kanye-west-east': 3,
  'billionaires-backstage': 6,
  'world-peace': 5,
  'breaking-bread': 4,
  'lara-ciste': 7,
  'sybau': 3,
  'the-don': 5,
  'jeffrey': 4,
  'shrock': 6,
}

interface Props {
  productId: string
}

export default function StockUrgency({ productId }: Props) {
  const count = STOCK[productId]
  if (!count) return null

  return (
    <div className="flex items-center gap-2 mt-4">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
      </span>
      <p className="text-[11px] text-white/60 uppercase tracking-[0.15em]">
        Plus que <span className="text-white font-semibold">{count}</span> en stock
      </p>
    </div>
  )
}
