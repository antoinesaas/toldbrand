interface Props {
  variant: 'new' | 'bestseller' | 'sale'
}

const config = {
  new: { label: 'New', className: 'bg-ink text-cream' },
  bestseller: { label: 'Bestseller', className: 'bg-gold text-ink' },
  sale: { label: 'Sale', className: 'bg-red-accent text-white' },
}

export default function Badge({ variant }: Props) {
  const { label, className } = config[variant]
  return (
    <span
      className={`font-sans text-[9px] tracking-[0.2em] uppercase px-2 py-1 ${className}`}
    >
      {label}
    </span>
  )
}
