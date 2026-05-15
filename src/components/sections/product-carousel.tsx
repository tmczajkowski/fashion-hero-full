"use client";

import { useEffect, useState, useRef } from "react";
import {
  getCarouselCampaign,
  getCarouselProductsForCampaign,
} from "@/data/promotions";
import { ProductCard } from "@/components/product-card";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

/** Replaces legacy "Our Favorites" tabs — promo carousel per docs/specs/promo/shop-rendering.md */
export function ProductCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [now, setNow] = useState<number | undefined>(undefined);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const campaign = now !== undefined ? getCarouselCampaign(now) : undefined;
  const carouselProducts =
    now !== undefined && campaign
      ? getCarouselProductsForCampaign(campaign.id, now, { max: 12, maxPerSeller: 4 })
      : [];

  if (
    now === undefined ||
    carouselProducts.length < 4 ||
    !campaign
  ) {
    return null;
  }

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-12">
      <p className="text-[11px] font-medium uppercase tracking-[0.45em] text-warm-gray text-center mb-2">
        Promowane
      </p>
      <h2 className="text-[40px] font-normal text-charcoal text-center mb-8">{campaign.label}</h2>

      <div className="relative px-4 md:px-8 lg:px-12">
        <button
          type="button"
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/3 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-sm hidden md:flex items-center justify-center"
          aria-label="Scroll left"
        >
          <ChevronLeftIcon />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2 snap-x snap-mandatory"
        >
          {carouselProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              suppressBadges
              className="min-w-[220px] max-w-[220px] flex-shrink-0 snap-start"
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/3 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-sm hidden md:flex items-center justify-center"
          aria-label="Scroll right"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </section>
  );
}
