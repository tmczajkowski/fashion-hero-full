import { currentReport } from '@/lib/pricing-report/data'
import { formatDelta, formatPln, formatRecommendation } from '@/lib/pricing-report/format'

export function LandingReportPreview() {
  const previewSkus = currentReport.skus.slice(0, 4)
  return (
    <section className="px-4 py-20">
      <div className="max-w-5xl mx-auto">
        <p className="text-[11px] tracking-[0.12em] uppercase text-warm-gray mb-3">Podgląd</p>
        <h2 className="text-3xl md:text-4xl font-light text-charcoal mb-10">
          Zobacz, jak wygląda Twój raport
        </h2>
        <div className="border border-black/10 p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6">
            <div>
              <p className="text-[11px] tracking-[0.08em] uppercase text-warm-gray">
                Pricing Report · Panel sprzedawcy
              </p>
              <p className="text-lg text-charcoal mt-1">
                Tydzień {currentReport.weekNumber} · {currentReport.year}
              </p>
            </div>
            <p className="text-[12px] text-warm-gray mt-2 md:mt-0">
              {currentReport.totals.skuCount} z 100 produktów
            </p>
          </div>
          <p className="text-[12px] text-warm-gray mb-3">Porównanie cen (próbka)</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-warm-gray text-xs">
                  <th className="py-2 pr-4 font-medium">Produkt</th>
                  <th className="py-2 pr-4 font-medium">Twoja</th>
                  <th className="py-2 pr-4 font-medium">Konkurencja</th>
                  <th className="py-2 pr-4 font-medium">Δ%</th>
                  <th className="py-2 font-medium">Rekomendacja</th>
                </tr>
              </thead>
              <tbody>
                {previewSkus.map(sku => (
                  <tr key={sku.id} className="border-t border-black/5">
                    <td className="py-3 pr-4 text-charcoal">{sku.name}</td>
                    <td className="py-3 pr-4 text-charcoal">{formatPln(sku.yourPricePln)}</td>
                    <td className="py-3 pr-4 text-charcoal">{formatPln(sku.competitorAvgPln)}</td>
                    <td className={`py-3 pr-4 ${sku.diffPercent > 0 ? 'text-red-600' : sku.diffPercent < 0 ? 'text-emerald-700' : 'text-charcoal'}`}>
                      {formatDelta(sku.diffPercent)}
                    </td>
                    <td className="py-3 text-charcoal">{formatRecommendation(sku.recommendation)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-warm-gray mt-4">
            W pełnym raporcie: 100 produktów × 5 konkurentów + dodatkowe wnioski jakościowe.
          </p>
        </div>
      </div>
    </section>
  )
}
