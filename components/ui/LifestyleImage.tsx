import Image from 'next/image'

interface Props {
  src: string
  alt: string
  sizes?: string
  priority?: boolean
}

/** Crops bottom edge to hide baked-in watermarks on lifestyle shots */
export default function LifestyleImage({ src, alt, sizes = '50vw', priority }: Props) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover object-[center_12%] scale-[1.12]"
        sizes={sizes}
      />
    </div>
  )
}
