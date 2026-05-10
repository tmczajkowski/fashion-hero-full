import Link from 'next/link'

const features = [
  {
    title: 'Monitoring do 100 produktów',
    body: 'Najpopularniejsze SKU z Twojego sklepu – wybierane wspólnie przy starcie.',
  },
  {
    title: '5 największych konkurentów',
    body: 'Codzienne śledzenie cen w Twojej kategorii Fashion.',
  },
  {
    title: 'Raport dostępny w systemie',
    body: 'Co tydzień nowy raport w panelu online. W każdej chwili eksport do PDF lub Excel do dalszej analizy w Twoim zespole.',
  },
  {
    title: 'Alerty o nagłych obniżkach',
    body: 'E-mail i powiadomienie, gdy konkurent obniży cenę o więcej niż 5%.',
  },
] as const

export function LandingOfferCard() {
  return (
    <section className="bg-stone-100 px-4 py-20">
      <div className="max-w-3xl mx-auto">
        <p className="text-[11px] tracking-[0.12em] uppercase text-warm-gray text-center mb-3">
          Co dokładnie kupujesz
        </p>
        <h2 className="text-3xl md:text-4xl font-light text-charcoal text-center mb-12">
          Raport cen konkurencji
        </h2>
        <div className="bg-white border border-black/10 p-8 md:p-12">
          <ul className="space-y-6 mb-10">
            {features.map(f => (
              <li key={f.title} className="border-b border-black/5 pb-6 last:border-b-0 last:pb-0">
                <h3 className="text-lg font-medium text-charcoal mb-2">{f.title}</h3>
                <p className="text-charcoal/80 text-sm">{f.body}</p>
              </li>
            ))}
          </ul>
          <div className="text-center">
            <p className="text-4xl font-light text-charcoal mb-1">
              49 <span className="text-lg text-warm-gray">PLN / mies</span>
            </p>
            <p className="text-xs text-warm-gray mb-6">
              Faktura VAT · Anulujesz kiedy chcesz
            </p>
            <Link
              href="/pricing-report/checkout"
              className="inline-flex items-center justify-center bg-charcoal text-white px-8 py-4 rounded-full text-sm tracking-wide hover:bg-charcoal/90 transition-colors"
            >
              Zamów raport
            </Link>
            <p className="text-xs text-warm-gray mt-3">
              Dostęp aktywowany natychmiast po płatności. Pierwszy raport otrzymasz w ciągu 24h.
            </p>
            <ul className="text-[11px] text-warm-gray mt-6 flex flex-wrap justify-center gap-x-6 gap-y-1">
              <li>Bez zobowiązań długoterminowych</li>
              <li>Wsparcie e-mail w 24h</li>
              <li>Anulujesz jednym mailem</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
