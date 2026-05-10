'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { reports } from '@/lib/pricing-report/data'

interface Props {
  selectedWeek: number
}

export function HistoryList({ selectedWeek }: Props) {
  const router = useRouter()
  const params = useSearchParams()

  function selectWeek(week: number) {
    const next = new URLSearchParams(params)
    next.set('week', String(week))
    router.replace(`/account/pricing-report?${next.toString()}`)
  }

  const reversed = [...reports].reverse()
  return (
    <ul className="border border-black/10 divide-y divide-black/5">
      {reversed.map(r => {
        const isSelected = r.weekNumber === selectedWeek
        return (
          <li key={r.weekNumber}>
            <button
              type="button"
              onClick={() => selectWeek(r.weekNumber)}
              className={`w-full text-left px-4 py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 transition-colors ${isSelected ? 'bg-stone-100' : 'hover:bg-stone-50/60'}`}
            >
              <div className="flex-1">
                <p className="text-sm text-charcoal">
                  Tydzień {r.weekNumber} · {r.year}
                  {isSelected && <span className="ml-2 text-[10px] uppercase tracking-wide text-warm-gray">— wyświetlany</span>}
                </p>
                <p className="text-xs text-warm-gray">{r.range.from} – {r.range.to}</p>
              </div>
              <div className="flex gap-6 text-xs text-warm-gray">
                <span>Do korekty: <span className="text-charcoal">{r.totals.skusToAdjust}</span></span>
                <span>Alerty: <span className="text-charcoal">{r.totals.weeklyAlerts}</span></span>
                <span>+marża: <span className="text-charcoal">{r.totals.marginUpliftPercent}%</span></span>
              </div>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
