import type { WeeklyReport } from '@/lib/pricing-report/types'

interface Props {
  report: WeeklyReport
}

export function KpiCards({ report }: Props) {
  const { totals } = report
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="border border-black/10 p-6">
        <p className="text-[11px] tracking-[0.08em] uppercase text-warm-gray">Do korekty</p>
        <p className="text-3xl font-light text-charcoal mt-2">
          {totals.skusToAdjust}
          <span className="text-sm text-warm-gray ml-1">/ {totals.skuCount}</span>
        </p>
        <p className="text-xs text-warm-gray mt-2">SKU z rekomendacją zmiany ceny</p>
      </div>
      <div className="border border-black/10 p-6">
        <p className="text-[11px] tracking-[0.08em] uppercase text-warm-gray">Alerty w tygodniu</p>
        <p className="text-3xl font-light text-charcoal mt-2">{totals.weeklyAlerts}</p>
        <p className="text-xs text-warm-gray mt-2">Obniżki konkurencji &gt; 5%</p>
      </div>
      <div className="bg-charcoal text-white p-6">
        <p className="text-[11px] tracking-[0.08em] uppercase opacity-70">Potencjalny +marża</p>
        <p className="text-3xl font-light mt-2">+{totals.marginUpliftPercent}%</p>
        <p className="text-xs opacity-70 mt-2">Po zastosowaniu rekomendacji</p>
      </div>
    </div>
  )
}
