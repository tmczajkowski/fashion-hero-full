"use client";

import { useState } from "react";
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
      colors: [
        { id: "black", name: "Black", hex: "#1a1a1a" },
      ],
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      id: "look-2",
      name: "Levi's Wool Hat",
      price: "129 zł",
      image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      inStock: true,
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
  const [userRating, setUserRating] = useState<"positive" | "negative" | undefined>();

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
