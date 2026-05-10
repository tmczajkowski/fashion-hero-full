// src/lib/pricing-report/types.ts
export type Recommendation =
  | { kind: 'lower'; deltaPln: number }
  | { kind: 'raise'; deltaPln: number }
  | { kind: 'hold' }

export type SkuCategory = 'odziez' | 'obuwie' | 'dodatki'

export interface CompetitorPrice {
  competitorId: string
  pricePln: number
}

export interface Sku {
  id: string
  name: string
  category: SkuCategory
  yourPricePln: number
  competitorAvgPln: number
  diffPercent: number
  recommendation: Recommendation
  perCompetitor: CompetitorPrice[]
}

export interface Competitor {
  id: string
  name: string
  trackedSkus: number
  avgDeltaPercent: number
  lastUpdate: string
}

export interface Alert {
  id: string
  skuId: string
  skuName: string
  competitorName: string
  oldPricePln: number
  newPricePln: number
  dropPercent: number
  detectedAt: string
}

export type DayOfWeek = 'Pn' | 'Wt' | 'Sr' | 'Cz' | 'Pt' | 'So' | 'Nd'

export interface MarginPoint {
  day: DayOfWeek
  current: number
  optimized: number
}

export interface WeeklyReport {
  weekNumber: number
  year: number
  range: { from: string; to: string }
  totals: {
    skuCount: number
    skusToAdjust: number
    weeklyAlerts: number
    marginUpliftPercent: number
  }
  marginByDay: MarginPoint[]
  skus: Sku[]
  alerts: Alert[]
}
