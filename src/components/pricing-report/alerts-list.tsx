import type { Alert } from '@/lib/pricing-report/types'
import { formatPln, formatRelativeTime } from '@/lib/pricing-report/format'

interface Props {
  alerts: Alert[]
}

export function AlertsList({ alerts }: Props) {
  if (alerts.length === 0) {
    return <p className="text-sm text-warm-gray border border-black/10 p-6">Brak alertów w tym tygodniu.</p>
  }
  return (
    <ul className="border border-black/10 divide-y divide-black/5">
      {alerts.map(a => (
        <li key={a.id} className="px-4 py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <span aria-hidden className="text-amber-600 text-lg shrink-0">⚠</span>
          <div className="flex-1">
            <p className="text-sm text-charcoal">{a.skuName}</p>
            <p className="text-xs text-warm-gray">
              {a.competitorName} · {formatPln(a.oldPricePln)} → {formatPln(a.newPricePln)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-red-600 font-medium">-{a.dropPercent.toFixed(1)}%</p>
            <p className="text-[11px] text-warm-gray">{formatRelativeTime(a.detectedAt)}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
