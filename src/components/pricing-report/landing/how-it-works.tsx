const steps = [
  {
    n: 1,
    title: 'Zamawiasz subskrypcję',
    body: 'Krótki formularz, płatność, gotowe. Bez instalacji ani konfiguracji.',
  },
  {
    n: 2,
    title: 'Analizujemy codziennie',
    body: 'Codzienny monitoring cen, weryfikacja przez analityków FashionHero.',
  },
  {
    n: 3,
    title: 'Raport co tydzień + alerty',
    body: 'Cotygodniowy raport dostępny w systemie + alerty o nagłych obniżkach konkurencji w czasie rzeczywistym.',
  },
] as const

export function LandingHowItWorks() {
  return (
    <section className="px-4 py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-light text-charcoal mb-12">Jak to działa</h2>
        <ol className="grid md:grid-cols-3 gap-8">
          {steps.map(s => (
            <li key={s.n} className="border-t border-black/20 pt-6">
              <p className="text-xs tracking-[0.08em] uppercase text-warm-gray mb-2">Krok {s.n}</p>
              <h3 className="text-xl font-medium text-charcoal mb-3">{s.title}</h3>
              <p className="text-charcoal/80 text-sm">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
