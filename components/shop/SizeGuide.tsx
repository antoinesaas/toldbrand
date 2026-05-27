'use client'

interface Props {
  onClose: () => void
}

const sizes = [
  { size: 'S', chest: '96–102', length: '70', shoulder: '48' },
  { size: 'M', chest: '102–108', length: '72', shoulder: '50' },
  { size: 'L', chest: '108–116', length: '74', shoulder: '52' },
  { size: 'XL', chest: '116–124', length: '76', shoulder: '54' },
  { size: '2XL', chest: '124–132', length: '78', shoulder: '56' },
]

export default function SizeGuide({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} />
      <div className="relative bg-cream w-full max-w-lg p-8 md:p-12">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-serif text-2xl text-ink">Size Guide</h2>
          <button
            onClick={onClose}
            className="font-sans text-xs tracking-[0.2em] uppercase text-ink-light hover:text-ink"
          >
            Close
          </button>
        </div>
        <p className="font-sans text-xs text-ink-light mb-6">
          All measurements in cm. Our tees are unisex oversized — size down for a regular fit.
        </p>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gold/30">
              {['Size', 'Chest', 'Length', 'Shoulder'].map((h) => (
                <th key={h} className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink-light pb-3 pr-4">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sizes.map(({ size, chest, length, shoulder }) => (
              <tr key={size} className="border-b border-gold/10">
                {[size, chest, length, shoulder].map((val, i) => (
                  <td key={i} className="font-sans text-xs text-ink py-3 pr-4">
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
