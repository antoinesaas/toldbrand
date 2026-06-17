const STOCK: Record<string, number> = {
  'porsche-star-wars': 4,
  'moto': 6,
  'ski': 5,
  'porsche-white': 3,
  'nissan-gtr': 5,
  'supra-cine': 7,
  'porsche-black': 4,
  'mercedes': 3,
  'f1': 6,
  'konigsegg': 4,
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
