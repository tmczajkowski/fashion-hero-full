"use client";

import { useState } from "react";
import { useFeatureFlagEnabled } from "posthog-js/react";
import { BuyTheLookBox } from "@/components/BuyTheLookBox";
import type { BuyTheLookStyling } from "@/components/BuyTheLookModal";

const DEMO_STYLING: BuyTheLookStyling = {
  id: "styling-trail-pacer",
  products: [
    {
      id: "look-1",
      name: "Ochnik Leather Jacket",
      price: "899 zł",
      image: "/images/ochnik-leather-jacket.png",
      inStock: true,
      slug: "wrap-dress",
      colors: [
        { id: "black", name: "Black", hex: "#1a1a1a" },
      ],
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      id: "look-2",
      name: "Levi's Wool Hat",
      price: "129 zł",
      image: "/images/Levis wool hat.png",
      inStock: true,
      slug: "wool-scarf-womens",
      colors: [
        { id: "pink", name: "Pink", hex: "#e8a0a0" },
        { id: "black", name: "Black", hex: "#1a1a1a" },
        { id: "grey", name: "Grey", hex: "#9ca3af" },
      ],
      sizes: ["One Size"],
    },
  ],
};

const OUTFIT_IMAGE = "/images/buy-the-look-outfit.png";

export function BuyTheLookSection() {
  const isEnabled = useFeatureFlagEnabled("buy_the_look_enabled");
  const [userRating, setUserRating] = useState<"positive" | "negative" | undefined>();

  if (!isEnabled) return null;

  const handleAddToCart = (productId: string, color: string, size: string) => {
    console.log("Add to cart:", { productId, color, size });
  };

  const handleRate = (_stylingId: string, rating: "positive" | "negative") => {
    setUserRating(rating);
  };

  return (
    <BuyTheLookBox
      styling={DEMO_STYLING}
      onAddToCart={handleAddToCart}
      onRate={handleRate}
      userRating={userRating}
      outfitImage={OUTFIT_IMAGE}
    />
  );
}
