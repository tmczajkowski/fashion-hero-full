// src/lib/pricing-report/format.ts
import type { Recommendation } from './types'

export function formatPln(value: number): string {
  return `${value.toLocaleString('pl-PL')} zł`
}

export function formatDelta(pct: number): string {
  const sign = pct > 0 ? '+' : ''
  return `${sign}${pct.toFixed(1)}%`
}

export function formatRecommendation(rec: Recommendation): string {
  if (rec.kind === 'hold') return 'Trzymaj cenę'
  if (rec.kind === 'lower') return `Obniż o ${rec.deltaPln} PLN`
  return `Podnieś o ${rec.deltaPln} PLN`
}

export function formatRelativeTime(iso: string, now = new Date()): string {
  const diffMs = now.getTime() - new Date(iso).getTime()
  const minutes = Math.floor(diffMs / 60000)
  if (minutes < 1) return 'przed chwilą'
  if (minutes < 60) return `${minutes} min temu`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} godz. temu`
  const days = Math.floor(hours / 24)
  return `${days} dni temu`
}
