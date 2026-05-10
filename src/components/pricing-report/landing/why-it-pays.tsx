export function LandingWhyItPays() {
  return (
    <section className="bg-stone-50 px-4 py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-light text-charcoal mb-3">
          Dlaczego to się opłaca?
        </h2>
        <p className="text-charcoal/70 mb-12">
          Dwa realne problemy każdego sprzedawcy w Fashion – jedno rozwiązanie.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-black/10 p-8">
            <h3 className="text-xl font-medium text-charcoal mb-3">Oszczędność czasu</h3>
            <p className="text-charcoal/80 mb-6">
              Zamiast poświęcać 4 godziny tygodniowo na ręczne sprawdzanie cen u konkurencji – otrzymujesz gotowe dane i rekomendacje w 5 sekund po otwarciu maila.
            </p>
            <p className="text-sm text-warm-gray">~16h / mies → 5 sekund</p>
          </div>
          <div className="bg-white border border-black/10 p-8">
            <h3 className="text-xl font-medium text-charcoal mb-3">Większy zysk</h3>
            <p className="text-charcoal/80 mb-6">
              Nie trać marży tam, gdzie konkurencja jest droższa od Ciebie. Nie trać sprzedaży tam, gdzie jest tańsza. Każda rekomendacja to konkretna kwota w PLN.
            </p>
            <p className="text-sm text-warm-gray">+8–14% marży na zoptymalizowanych SKU</p>
          </div>
        </div>
      </div>
    </section>
  )
}
