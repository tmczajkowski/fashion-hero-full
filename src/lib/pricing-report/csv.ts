import type { Sku } from './types'
import { formatRecommendation } from './format'

export function skusToCsv(skus: Sku[]): string {
  const header = ['id', 'nazwa', 'kategoria', 'twoja_cena_pln', 'srednia_konkurencji_pln', 'delta_proc', 'rekomendacja']
  const rows = skus.map(s => [
    s.id,
    `"${s.name.replace(/"/g, '""')}"`,
    s.category,
    String(s.yourPricePln),
    String(s.competitorAvgPln),
    s.diffPercent.toFixed(1),
    `"${formatRecommendation(s.recommendation)}"`,
  ])
  return [header.join(','), ...rows.map(r => r.join(','))].join('\n')
}
