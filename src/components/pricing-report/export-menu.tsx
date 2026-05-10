'use client'

import { Download, FileSpreadsheet, FileText } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { skusToCsv } from '@/lib/pricing-report/csv'
import type { WeeklyReport } from '@/lib/pricing-report/types'

interface Props {
  report: WeeklyReport
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export function ExportMenu({ report }: Props) {
  const fileBase = `pricing-report-w${report.weekNumber}-${report.year}`

  function downloadPdf() {
    const a = document.createElement('a')
    a.href = '/pricing-report-placeholder.pdf'
    a.download = `${fileBase}.pdf`
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  function downloadCsv() {
    const csv = skusToCsv(report.skus)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    downloadBlob(blob, `${fileBase}.csv`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button
          type="button"
          className="inline-flex items-center gap-2 border border-charcoal text-charcoal px-4 py-2 rounded-full text-sm hover:bg-charcoal hover:text-white transition-colors"
        >
          <Download className="w-4 h-4" />
          Eksportuj
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={downloadPdf} className="cursor-pointer">
          <FileText className="w-4 h-4 mr-2" />
          Pobierz PDF (placeholder)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={downloadCsv} className="cursor-pointer">
          <FileSpreadsheet className="w-4 h-4 mr-2" />
          Pobierz Excel (CSV)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
