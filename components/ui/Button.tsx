interface Props {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'ghost'
  fullWidth?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  fullWidth = false,
  type = 'button',
}: Props) {
  const base =
    'font-sans text-xs tracking-[0.2em] uppercase py-4 transition-all duration-200 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-ink text-cream hover:bg-ink/90 border border-ink',
    secondary: 'bg-transparent text-ink border border-ink hover:bg-ink hover:text-cream',
    ghost: 'bg-transparent text-ink-light hover:text-ink border-0',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : 'px-8'}`}
    >
      {children}
    </button>
  )
}
