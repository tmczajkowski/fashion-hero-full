import { competitors } from '@/lib/pricing-report/data'
import { formatDelta } from '@/lib/pricing-report/format'

export function CompetitorsList() {
  return (
    <div className="border border-black/10 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wide text-warm-gray bg-stone-50">
            <th className="px-4 py-3 font-medium">Konkurent</th>
            <th className="px-4 py-3 font-medium">Śledzonych SKU</th>
            <th className="px-4 py-3 font-medium">Średnia delta</th>
            <th className="px-4 py-3 font-medium">Ostatnia aktualizacja</th>
          </tr>
        </thead>
        <tbody>
          {competitors.map(c => (
            <tr key={c.id} className="border-t border-black/5">
              <td className="px-4 py-3 text-charcoal">{c.name}</td>
              <td className="px-4 py-3 text-charcoal">{c.trackedSkus}</td>
              <td className={`px-4 py-3 ${c.avgDeltaPercent > 0 ? 'text-red-600' : c.avgDeltaPercent < 0 ? 'text-emerald-700' : 'text-charcoal'}`}>
                {formatDelta(c.avgDeltaPercent)}
              </td>
              <td className="px-4 py-3 text-warm-gray text-xs">{new Date(c.lastUpdate).toLocaleString('pl-PL')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
