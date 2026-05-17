"use client";

import { useState } from "react";
import { BuyTheLookBox } from "@/components/BuyTheLookBox";
import type { BuyTheLookStyling } from "@/components/BuyTheLookModal";

// Demo styling data — replace with real data from your API/CMS
const DEMO_STYLING: BuyTheLookStyling = {
  id: "styling-1",
  products: [
    {
      id: "look-1",
      name: "Slim Chino",
      price: "299 zł",
      image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      inStock: true,
      colors: [
        { id: "beige", name: "Beige", hex: "#c8b49a" },
        { id: "navy", name: "Navy", hex: "#1e2d4f" },
      ],
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      id: "look-2",
      name: "Cotton Crew Tee",
      price: "149 zł",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      inStock: true,
      colors: [
        { id: "white", name: "White", hex: "#ffffff" },
        { id: "black", name: "Black", hex: "#1a1a1a" },
      ],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    {
      id: "look-3",
      name: "Canvas Belt",
      price: "89 zł",
      image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      inStock: true,
      colors: [
        { id: "tan", name: "Tan", hex: "#b5895a" },
      ],
      sizes: ["S/M", "L/XL"],
    },
  ],
};

const OUTFIT_IMAGE =
  "https://images.unsplash.com/photo-1611043481649-3dd586f37e12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

export function BuyTheLookSection() {
  const [userRating, setUserRating] = useState<"positive" | "negative" | undefined>();

  const handleAddToCart = (productId: string, color: string, size: string) => {
    // TODO: integrate with your cart context/store
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
