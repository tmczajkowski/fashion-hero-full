// src/lib/pricing-report/data.ts
import type {
  Alert,
  Competitor,
  Recommendation,
  Sku,
  SkuCategory,
  WeeklyReport,
} from './types'

export const competitors: Competitor[] = [
  { id: 'comp-1', name: 'ModaPlus', trackedSkus: 25, avgDeltaPercent: -2.3, lastUpdate: '2026-05-10T08:00:00Z' },
  { id: 'comp-2', name: 'TrendyShop', trackedSkus: 25, avgDeltaPercent: 1.2, lastUpdate: '2026-05-10T08:30:00Z' },
  { id: 'comp-3', name: 'FashionLab', trackedSkus: 25, avgDeltaPercent: -4.5, lastUpdate: '2026-05-10T07:45:00Z' },
  { id: 'comp-4', name: 'StyleHub', trackedSkus: 25, avgDeltaPercent: 0.8, lastUpdate: '2026-05-10T08:15:00Z' },
  { id: 'comp-5', name: 'VogueOutlet', trackedSkus: 25, avgDeltaPercent: -1.5, lastUpdate: '2026-05-10T08:05:00Z' },
]

type RawSku = [string, string, SkuCategory, number, number, number, number, number, number]
//             [id,    name,   category,    yours, c1,    c2,    c3,    c4,    c5]

const RAW_SKUS: RawSku[] = [
  ['sku-001', 'Sukienka midi „Liana"',     'odziez',  189, 175, 189, 165, 195, 171],
  ['sku-002', 'Trampki damskie „Cleo"',    'obuwie',  129, 145, 149, 155, 142, 154],
  ['sku-003', 'Bluza oversize „Nord"',     'odziez',  159, 155, 162, 168, 159, 166],
  ['sku-004', 'Torba shopper „Mara"',      'dodatki', 219, 195, 199, 205, 192, 207],
  ['sku-005', 'Spódnica plisowana „Iris"', 'odziez',  149, 139, 145, 135, 142, 138],
  ['sku-006', 'Botki za kostkę „Vega"',    'obuwie',  299, 315, 325, 309, 319, 322],
  ['sku-007', 'T-shirt basic „Luna"',      'odziez',   59,  65,  69,  62,  68,  64],
  ['sku-008', 'Płaszcz wełniany „Astra"',  'odziez',  599, 545, 569, 555, 549, 561],
  ['sku-009', 'Mokasyny „Theo"',           'obuwie',  259, 265, 271, 268, 263, 273],
  ['sku-010', 'Pasek skórzany „Onyx"',     'dodatki',  89,  79,  85,  82,  78,  86],
  ['sku-011', 'Sweter dziany „Helga"',     'odziez',  179, 169, 175, 171, 165, 174],
  ['sku-012', 'Kurtka pikowana „Brava"',   'odziez',  349, 369, 375, 365, 359, 371],
  ['sku-013', 'Sneakersy „Orion"',         'obuwie',  329, 305, 319, 312, 309, 315],
  ['sku-014', 'Torebka kuferek „Selene"',  'dodatki', 269, 285, 295, 279, 289, 282],
  ['sku-015', 'Spodnie szerokie „Maris"',  'odziez',  199, 185, 195, 189, 192, 188],
  ['sku-016', 'Sandały „Calla"',           'obuwie',  159, 155, 165, 161, 158, 166],
  ['sku-017', 'Koszula lniana „Sage"',     'odziez',  139, 145, 149, 142, 138, 147],
  ['sku-018', 'Apaszka jedwabna „Iola"',   'dodatki',  79,  72,  75,  78,  73,  76],
  ['sku-019', 'Koszula oversize „Riva"',   'odziez',  149, 152, 158, 155, 149, 156],
  ['sku-020', 'Mules zamszowe „Nyx"',      'obuwie',  189, 175, 182, 178, 173, 184],
  ['sku-021', 'Kombinezon „Aurora"',       'odziez',  239, 215, 225, 219, 211, 222],
  ['sku-022', 'Czapka beanie „Ash"',       'dodatki',  49,  52,  55,  51,  49,  54],
  ['sku-023', 'Kozaki „Vera"',             'obuwie',  389, 375, 385, 379, 369, 382],
  ['sku-024', 'Bluzka z falbanami „Lia"',  'odziez',  119, 115, 122, 118, 109, 121],
  ['sku-025', 'Plecak skórzany „Atlas"',   'dodatki', 359, 339, 349, 345, 332, 351],
]

function buildRecommendation(your: number, avg: number): Recommendation {
  const diff = your - avg
  const diffPct = (diff / avg) * 100
  if (Math.abs(diffPct) < 3) return { kind: 'hold' }
  if (diff > 0) return { kind: 'lower', deltaPln: Math.round(diff) }
  return { kind: 'raise', deltaPln: Math.round(-diff) }
}

function buildSku(raw: RawSku): Sku {
  const [id, name, category, yourPrice, c1, c2, c3, c4, c5] = raw
  const prices = [c1, c2, c3, c4, c5]
  const avg = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
  const diffPercent = Math.round(((yourPrice - avg) / avg) * 1000) / 10
  return {
    id,
    name,
    category,
    yourPricePln: yourPrice,
    competitorAvgPln: avg,
    diffPercent,
    recommendation: buildRecommendation(yourPrice, avg),
    perCompetitor: competitors.map((c, i) => ({ competitorId: c.id, pricePln: prices[i] })),
  }
}

const skus: Sku[] = RAW_SKUS.map(buildSku)

const alerts: Alert[] = [
  { id: 'a-1', skuId: 'sku-013', skuName: 'Sneakersy „Orion"',        competitorName: 'ModaPlus',    oldPricePln: 329, newPricePln: 279, dropPercent: 15.2, detectedAt: '2026-05-09T14:20:00Z' },
  { id: 'a-2', skuId: 'sku-008', skuName: 'Płaszcz wełniany „Astra"',  competitorName: 'FashionLab',  oldPricePln: 599, newPricePln: 499, dropPercent: 16.7, detectedAt: '2026-05-09T11:05:00Z' },
  { id: 'a-3', skuId: 'sku-021', skuName: 'Kombinezon „Aurora"',       competitorName: 'StyleHub',    oldPricePln: 239, newPricePln: 199, dropPercent: 16.7, detectedAt: '2026-05-09T09:30:00Z' },
  { id: 'a-4', skuId: 'sku-014', skuName: 'Torebka kuferek „Selene"',  competitorName: 'VogueOutlet', oldPricePln: 269, newPricePln: 239, dropPercent: 11.2, detectedAt: '2026-05-08T17:40:00Z' },
  { id: 'a-5', skuId: 'sku-006', skuName: 'Botki za kostkę „Vega"',    competitorName: 'TrendyShop',  oldPricePln: 299, newPricePln: 269, dropPercent: 10.0, detectedAt: '2026-05-08T13:15:00Z' },
  { id: 'a-6', skuId: 'sku-025', skuName: 'Plecak skórzany „Atlas"',   competitorName: 'ModaPlus',    oldPricePln: 359, newPricePln: 319, dropPercent: 11.1, detectedAt: '2026-05-08T08:50:00Z' },
  { id: 'a-7', skuId: 'sku-023', skuName: 'Kozaki „Vera"',             competitorName: 'FashionLab',  oldPricePln: 389, newPricePln: 349, dropPercent: 10.3, detectedAt: '2026-05-07T19:10:00Z' },
  { id: 'a-8', skuId: 'sku-001', skuName: 'Sukienka midi „Liana"',     competitorName: 'StyleHub',    oldPricePln: 189, newPricePln: 165, dropPercent: 12.7, detectedAt: '2026-05-07T15:25:00Z' },
]

const marginByDay = [
  { day: 'Pn', current: 22, optimized: 24 },
  { day: 'Wt', current: 23, optimized: 26 },
  { day: 'Sr', current: 25, optimized: 28 },
  { day: 'Cz', current: 24, optimized: 28 },
  { day: 'Pt', current: 26, optimized: 30 },
  { day: 'So', current: 27, optimized: 32 },
  { day: 'Nd', current: 25, optimized: 30 },
] as const satisfies WeeklyReport['marginByDay']

function buildWeek(week: number, totals: WeeklyReport['totals'], range: WeeklyReport['range']): WeeklyReport {
  return {
    weekNumber: week,
    year: 2026,
    range,
    totals,
    marginByDay: [...marginByDay],
    skus,
    alerts,
  }
}

export const reports: WeeklyReport[] = [
  buildWeek(44, { skuCount: 25, skusToAdjust: 18, weeklyAlerts: 4, marginUpliftPercent: 9 },  { from: '2026-04-23', to: '2026-04-29' }),
  buildWeek(45, { skuCount: 25, skusToAdjust: 21, weeklyAlerts: 6, marginUpliftPercent: 11 }, { from: '2026-04-30', to: '2026-05-06' }),
  buildWeek(46, { skuCount: 25, skusToAdjust: 20, weeklyAlerts: 5, marginUpliftPercent: 12 }, { from: '2026-05-07', to: '2026-05-13' }),
  buildWeek(47, { skuCount: 25, skusToAdjust: 23, weeklyAlerts: 7, marginUpliftPercent: 14 }, { from: '2026-05-14', to: '2026-05-20' }),
]

export const currentReport: WeeklyReport = reports[reports.length - 1]

export function reportByWeek(week: number | null): WeeklyReport {
  if (week == null) return currentReport
  return reports.find(r => r.weekNumber === week) ?? currentReport
}
