'use client'

import { useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { MarginPoint } from '@/lib/pricing-report/types'

interface Props {
  data: MarginPoint[]
}

type ChartKind = 'bar' | 'line'

export function MarginChart({ data }: Props) {
  const [kind, setKind] = useState<ChartKind>('bar')
  return (
    <div className="border border-black/10 p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] tracking-[0.08em] uppercase text-warm-gray">
          Marża w czasie — obecna vs po optymalizacji
        </p>
        <div className="inline-flex border border-black/15 rounded-full p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setKind('bar')}
            className={`px-3 py-1 rounded-full transition-colors ${kind === 'bar' ? 'bg-charcoal text-white' : 'text-charcoal/60 hover:text-charcoal'}`}
          >
            Bar
          </button>
          <button
            type="button"
            onClick={() => setKind('line')}
            className={`px-3 py-1 rounded-full transition-colors ${kind === 'line' ? 'bg-charcoal text-white' : 'text-charcoal/60 hover:text-charcoal'}`}
          >
            Line
          </button>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {kind === 'bar' ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#00000010" />
              <XAxis dataKey="day" stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} unit="%" />
              <Tooltip />
              <Legend />
              <Bar dataKey="current" name="Obecna" fill="#cccccc" />
              <Bar dataKey="optimized" name="Po optymalizacji" fill="#1F1F1F" />
            </BarChart>
          ) : (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#00000010" />
              <XAxis dataKey="day" stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} unit="%" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="current" name="Obecna" stroke="#999999" strokeWidth={2} dot />
              <Line type="monotone" dataKey="optimized" name="Po optymalizacji" stroke="#1F1F1F" strokeWidth={2} dot />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  )
}
