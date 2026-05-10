import Link from 'next/link'

export function LandingHero() {
  return (
    <section className="bg-stone-100 px-4 py-20 md:py-28">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-[11px] tracking-[0.12em] uppercase text-warm-gray mb-6">
          Nowy moduł FashionHero
        </p>
        <h1 className="text-4xl md:text-6xl font-light text-charcoal leading-tight mb-6">
          Przestań ręcznie śledzić ceny konkurencji
        </h1>
        <p className="text-lg text-charcoal/80 max-w-2xl mx-auto mb-10">
          Codzienny monitoring 100 Twoich produktów i 5 największych konkurentów w kategorii Fashion.
          Co tydzień gotowy raport z rekomendacjami cenowymi.
        </p>
        <Link
          href="/pricing-report/checkout"
          className="inline-flex items-center justify-center bg-charcoal text-white px-8 py-4 rounded-full text-sm tracking-wide hover:bg-charcoal/90 transition-colors"
        >
          Zamów raport – 49 PLN/mies
        </Link>
        <p className="text-xs text-warm-gray mt-4">
          Dostęp aktywowany natychmiast po płatności. Pierwszy raport otrzymasz w ciągu 24h.
        </p>
      </div>
    </section>
  )
}
