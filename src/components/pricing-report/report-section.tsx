import type { ReactNode } from 'react'

interface Props {
  id: string
  title: string
  badge?: string | number
  children: ReactNode
}

export function ReportSection({ id, title, badge, children }: Props) {
  return (
    <section id={id} className="scroll-mt-32">
      <div className="flex items-baseline gap-2 mb-4">
        <h2 className="text-xl text-charcoal font-medium">{title}</h2>
        {badge !== undefined && (
          <span className="text-xs bg-charcoal text-white rounded-full px-2 py-0.5">{badge}</span>
        )}
      </div>
      {children}
    </section>
  )
}
