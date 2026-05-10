'use client'

import Link from 'next/link'
import { useSubscription } from '@/lib/pricing-report/use-subscription'

export function ActiveSubscriptionBar() {
  const { isHydrated, isActive } = useSubscription()
  if (!isHydrated || !isActive) return null
  return (
    <div className="bg-charcoal text-white text-sm px-4 py-3 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
      <span>Masz aktywną subskrypcję Pricing Report.</span>
      <Link href="/account/pricing-report" className="underline underline-offset-2 hover:no-underline">
        Otwórz raport →
      </Link>
    </div>
  )
}
