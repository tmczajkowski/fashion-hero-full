import Link from "next/link";

export function ReferBanner() {
  return (
    <section className="bg-charcoal py-16 px-4">
      <div className="max-w-2xl mx-auto text-center space-y-5">
        <p className="text-xs font-medium uppercase tracking-[1px] text-white/50">Referral Program</p>
        <h2 className="text-3xl md:text-4xl font-light text-white leading-snug">
          Love FashionHero?<br />
          <span className="font-semibold">Recommend us</span> and save 10%.
        </h2>
        <p className="text-sm text-white/60 leading-relaxed">
          Refer a friend and get 10% off your next order when they make their first purchase.
        </p>
        <Link
          href="/refer"
          className="inline-block mt-2 px-10 py-4 bg-white text-charcoal text-sm font-semibold rounded-full hover:bg-white/90 transition-colors"
        >
          Recommend Our Shop
        </Link>
      </div>
    </section>
  );
}
