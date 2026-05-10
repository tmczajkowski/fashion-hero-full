'use client'

import { Suspense, useEffect, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { reportByWeek } from '@/lib/pricing-report/data'
import { useSubscription } from '@/lib/pricing-report/use-subscription'
import { AlertsList } from '@/components/pricing-report/alerts-list'
import { CompetitorsList } from '@/components/pricing-report/competitors-list'
import { ExportMenu } from '@/components/pricing-report/export-menu'
import { HistoryList } from '@/components/pricing-report/history-list'
import { KpiCards } from '@/components/pricing-report/kpi-cards'
import { MarginChart } from '@/components/pricing-report/margin-chart'
import { ReportSection } from '@/components/pricing-report/report-section'
import { SkuTable } from '@/components/pricing-report/sku-table'
import { StickyTabsNav } from '@/components/pricing-report/sticky-tabs-nav'

function LoadingFallback() {
  return <div className="max-w-6xl mx-auto px-4 py-16 text-warm-gray text-sm">Ładowanie raportu…</div>
}

function ReportPageContent() {
  const router = useRouter()
  const params = useSearchParams()
  const { isHydrated, isActive } = useSubscription()

  useEffect(() => {
    if (isHydrated && !isActive) {
      toast.info('Aktywuj subskrypcję, by zobaczyć raport')
      router.replace('/pricing-report')
    }
  }, [isHydrated, isActive, router])

  const weekParam = params.get('week')
  const week = weekParam ? Number(weekParam) : null
  const report = useMemo(() => reportByWeek(week), [week])

  if (!isHydrated) {
    return <LoadingFallback />
  }
  if (!isActive) return null

  const tabs = [
    { id: 'raport',     label: 'Raport' },
    { id: 'alerty',     label: 'Alerty', badge: report.alerts.length },
    { id: 'historia',   label: 'Historia' },
    { id: 'konkurenci', label: 'Konkurenci' },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20">
      <nav className="text-[11px] text-warm-gray pt-8 mb-6 tracking-wide">
        <Link href="/account" className="hover:text-charcoal transition-colors">Account</Link>
        <span className="mx-1.5">/</span>
        <span className="text-charcoal">Pricing Report</span>
      </nav>

      <header className="border-b border-black/10 pb-6 mb-6">
        <p className="text-[11px] tracking-[0.08em] uppercase text-warm-gray">
          Pricing Report · Panel sprzedawcy
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mt-1 gap-3">
          <div>
            <h1 className="text-2xl font-light text-charcoal">
              Tydzień {report.weekNumber} · {report.year}
            </h1>
            <p className="text-xs text-warm-gray mt-1">
              {report.range.from} – {report.range.to} · {report.totals.skuCount} z 100 produktów
            </p>
          </div>
          <ExportMenu report={report} />
        </div>
      </header>

      <StickyTabsNav tabs={tabs} />

      <div className="mt-8 grid gap-12">
        <ReportSection id="raport" title="Raport tygodniowy">
          <div className="grid gap-6">
            <KpiCards report={report} />
            <MarginChart data={report.marginByDay} />
            <SkuTable skus={report.skus} />
          </div>
        </ReportSection>

        <ReportSection id="alerty" title="Alerty" badge={report.alerts.length}>
          <AlertsList alerts={report.alerts} />
        </ReportSection>

        <ReportSection id="historia" title="Historia raportów">
          <HistoryList selectedWeek={report.weekNumber} />
        </ReportSection>

        <ReportSection id="konkurenci" title="Konkurenci">
          <CompetitorsList />
        </ReportSection>
      </div>
    </div>
  )
}

export default function PricingReportPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ReportPageContent />
    </Suspense>
  )
}
