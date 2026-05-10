'use client'

import { useEffect, useState } from 'react'

interface Tab {
  id: string
  label: string
  badge?: string | number
}

interface Props {
  tabs: Tab[]
}

export function StickyTabsNav({ tabs }: Props) {
  const [active, setActive] = useState(tabs[0]?.id ?? '')

  useEffect(() => {
    const sections = tabs
      .map(t => document.getElementById(t.id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [tabs])

  function handleClick(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActive(id)
  }

  return (
    <nav className="sticky top-0 z-20 bg-white border-b border-black/10 -mx-4 px-4">
      <ul className="flex gap-6 overflow-x-auto whitespace-nowrap text-sm py-3">
        {tabs.map(t => {
          const isActive = active === t.id
          return (
            <li key={t.id}>
              <button
                type="button"
                onClick={() => handleClick(t.id)}
                className={`relative inline-flex items-center gap-2 pb-2 border-b-2 transition-colors ${isActive ? 'border-charcoal text-charcoal' : 'border-transparent text-warm-gray hover:text-charcoal'}`}
              >
                <span className={isActive ? 'font-medium' : ''}>{t.label}</span>
                {t.badge !== undefined && (
                  <span className="text-[10px] bg-charcoal text-white rounded-full px-1.5 py-0.5">{t.badge}</span>
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
