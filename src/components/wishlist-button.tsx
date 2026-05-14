"use client";

import { useState } from "react";
import { HeartIcon, HeartFilledIcon } from "./icons";
import { useWishlist } from "./wishlist-provider";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  productId: string;
  className?: string;
}

export function WishlistButton({ productId, className }: WishlistButtonProps) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(productId);
  const [burst, setBurst] = useState(false);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setBurst(true);
    toggleWishlist(productId);
    setTimeout(() => setBurst(false), 400);
  }

  return (
    <div className="relative group/wish">
      <button
        onClick={handleClick}
        aria-label={wishlisted ? "Usuń z listy życzeń" : "Zapisz na później"}
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full bg-white/90 shadow-sm",
          "transition-all duration-200 ease-out hover:bg-white hover:shadow-md",
          burst && "scale-125",
          className
        )}
      >
        {wishlisted ? (
          <HeartFilledIcon className="h-4 w-4 text-[#ff0080]" />
        ) : (
          <HeartIcon className="h-4 w-4 text-charcoal/50 group-hover/wish:text-[#ff0080] transition-colors" />
        )}
      </button>

      {/* Tooltip */}
      <span
        className={cn(
          "pointer-events-none absolute right-9 top-1/2 -translate-y-1/2",
          "whitespace-nowrap rounded px-2 py-1 text-[10px] font-medium uppercase tracking-wide",
          "bg-charcoal text-white opacity-0 group-hover/wish:opacity-100 transition-opacity duration-150",
          "hidden md:block"
        )}
      >
        {wishlisted ? "Usuń z listy" : "Zapisz na później"}
      </span>
    </div>
  );
}
