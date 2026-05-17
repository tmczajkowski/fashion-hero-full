import Link from "next/link";

export const metadata = {
  title: "Refer a Friend — FashionHero",
  description: "Recommend FashionHero to a friend and get 10% off your next order.",
};

export default function ReferPage() {
  return (
    <div className="min-h-screen bg-cream-light flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-charcoal flex items-center justify-center">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-[1px] text-warm-gray">Referral Program</p>
          <h1 className="text-4xl md:text-5xl font-light text-charcoal leading-tight">
            Give a friend FashionHero.<br />
            Get <span className="font-semibold">10% off</span> your next order.
          </h1>
        </div>

        {/* Description */}
        <p className="text-base text-warm-gray leading-relaxed max-w-lg mx-auto">
          When you recommend FashionHero to a friend and they make their first purchase,
          you&apos;ll automatically receive a <strong>10% discount code</strong> for your next order.
          No limits — the more friends you refer, the more you save.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left mt-4">
          {[
            { step: "1", title: "Share your link", desc: "Send your unique referral link to a friend." },
            { step: "2", title: "They shop", desc: "Your friend creates an account and places their first order." },
            { step: "3", title: "You save 10%", desc: "A 10% discount code lands in your inbox automatically." },
          ].map(({ step, title, desc }) => (
            <div key={step} className="bg-white rounded-xl p-5 border border-black/5">
              <div className="w-8 h-8 rounded-full bg-charcoal text-white text-sm font-semibold flex items-center justify-center mb-3">
                {step}
              </div>
              <p className="font-medium text-charcoal mb-1">{title}</p>
              <p className="text-sm text-warm-gray leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="space-y-3 pt-2">
          <button className="w-full sm:w-auto px-10 py-4 bg-charcoal text-white text-sm font-medium rounded-full hover:bg-charcoal/80 transition-colors">
            Get My Referral Link
          </button>
          <p className="text-xs text-warm-gray">
            Already have an account?{" "}
            <Link href="/account/login" className="underline hover:opacity-70 transition-opacity">
              Log in
            </Link>{" "}
            to access your referral dashboard.
          </p>
        </div>

        {/* Fine print */}
        <p className="text-xs text-warm-gray/70 pt-4 border-t border-black/5">
          Discount applies to your next order and cannot be combined with other promotions.
          Referral is valid for 90 days after the friend&apos;s first purchase.
        </p>
      </div>
    </div>
  );
}
