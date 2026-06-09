export default function ContactPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-[#0a0a0a] px-6">
      <div className="max-w-md mx-auto text-center">
        <p className="text-white/30 text-[9px] uppercase tracking-[0.4em] mb-4">TOLD— · CONTACT</p>
        <h1 className="text-white text-3xl font-bold uppercase tracking-tight mb-10">
          Nous contacter
        </h1>

        <p className="text-white/50 text-sm mb-8 leading-relaxed">
          Une question sur ta commande, un souci avec ta livraison, ou juste envie de nous dire
          que le merch est top ?
        </p>

        <a
          href="mailto:antoine08.pro@gmail.com"
          className="inline-block w-full h-12 bg-white text-black text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-white/90 transition-colors leading-[3rem]"
        >
          Envoyer un email
        </a>

        <p className="text-white/30 text-xs mt-6 select-all">antoine08.pro@gmail.com</p>

        <div className="mt-14 border-t border-white/10 pt-8">
          <p className="text-white/20 text-[10px] uppercase tracking-[0.2em]">
            On repond sous 24-48h
          </p>
        </div>
      </div>
    </div>
  )
}
