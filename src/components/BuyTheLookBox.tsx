"use client";

import { useState } from "react";
import Link from "next/link";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import posthog from "posthog-js";
import type { BuyTheLookProduct, BuyTheLookStyling } from "./BuyTheLookModal";

interface QuickViewModalProps {
  product: BuyTheLookProduct;
  onClose: () => void;
  onAddToCart: (color: string, size: string) => void;
}

function QuickViewModal({ product, onClose, onAddToCart }: QuickViewModalProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.id ?? "");
  const [selectedSize, setSelectedSize] = useState("");

  const canAddToCart = selectedColor && selectedSize;

  const handleAddToCart = () => {
    if (!canAddToCart) return;
    onAddToCart(selectedColor, selectedSize);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start md:items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl max-h-[100vh] md:max-h-[90vh] overflow-y-auto md:rounded-lg md:m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover aspect-square"
            />
          </div>

          {/* Details */}
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl mb-2">{product.name}</h2>
              <p className="text-xl">{product.price}</p>
            </div>

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm uppercase tracking-wide">Color</span>
                  <span className="text-sm text-gray-600">
                    {product.colors.find((c) => c.id === selectedColor)?.name ?? ""}
                  </span>
                </div>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className={`w-10 h-10 rounded-full border-2 transition-colors ${
                        selectedColor === color.id ? "border-black" : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div>
                <span className="text-sm uppercase tracking-wide block mb-3">Size</span>
                <div className="grid grid-cols-4 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-4 border rounded text-sm transition-colors ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "bg-white border-gray-300 hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-3 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={!canAddToCart}
                className={`w-full py-4 rounded text-sm uppercase tracking-wide transition-colors ${
                  canAddToCart
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Add to bag
              </button>
              <button
                onClick={onClose}
                className="w-full py-4 border border-gray-300 rounded text-sm uppercase tracking-wide hover:border-black transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface BuyTheLookBoxProps {
  styling: BuyTheLookStyling | null;
  onAddToCart: (productId: string, color: string, size: string) => void;
  onRate: (stylingId: string, rating: "positive" | "negative") => void;
  userRating?: "positive" | "negative";
  outfitImage?: string;
}

export function BuyTheLookBox({
  styling,
  onAddToCart,
  onRate,
  userRating,
  outfitImage,
}: BuyTheLookBoxProps) {
  const [selectedProduct, setSelectedProduct] = useState<BuyTheLookProduct | null>(null);

  if (!styling || styling.products.length === 0) return null;

  const availableProducts = styling.products.filter((p) => p.inStock);

  if (availableProducts.length === 0) return null;

  const handleRate = (rating: "positive" | "negative") => {
    onRate(styling.id, rating);
  };

  return (
    <>
      <section className="mt-12 mb-16">
        <div className="mb-6">
          <h3 className="text-xl">Buy the look</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Full Outfit Photo with Rating */}
          <div className="bg-white rounded-lg overflow-hidden border border-gray-100">
            <div className="aspect-square">
              <img
                src={
                  outfitImage ??
                  "https://images.unsplash.com/photo-1611043481649-3dd586f37e12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                }
                alt="Full outfit"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
              <p className="text-sm mb-3">Do you like this look?</p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    handleRate("positive");
                    posthog.capture("buy_the_look_like_up");
                  }}
                  data-ph-capture="buy-the-look-like-up"
                  className={`flex-1 p-3 border rounded transition-colors flex items-center justify-center ${
                    userRating === "positive"
                      ? "bg-green-100 border-green-500 text-green-700"
                      : "border-gray-300 hover:border-green-500 hover:text-green-700"
                  }`}
                  aria-label="I like it"
                >
                  <ThumbsUp className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    handleRate("negative");
                    posthog.capture("buy_the_look_like_down");
                  }}
                  data-ph-capture="buy-the-look-like-down"
                  className={`flex-1 p-3 border rounded transition-colors flex items-center justify-center ${
                    userRating === "negative"
                      ? "bg-red-100 border-red-500 text-red-700"
                      : "border-gray-300 hover:border-red-500 hover:text-red-700"
                  }`}
                  aria-label="I don't like it"
                >
                  <ThumbsDown className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Individual Products */}
          {availableProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden border border-gray-100"
            >
              <div className="aspect-square">
                {product.slug ? (
                  <Link href={`/products/${product.slug}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
                    />
                  </Link>
                ) : (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-3 space-y-3">
                <div>
                  {product.slug ? (
                    <Link href={`/products/${product.slug}`} className="hover:underline">
                      <h4 className="text-sm mb-1">{product.name}</h4>
                    </Link>
                  ) : (
                    <h4 className="text-sm mb-1">{product.name}</h4>
                  )}
                  <p className="text-sm">{product.price}</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    posthog.capture("buy_the_look_page_add_to_bag");
                  }}
                  data-ph-capture="buy-the-look-page-add-to-bag"
                  className="w-full bg-black text-white py-2 px-4 rounded text-sm hover:bg-gray-800 transition-colors"
                >
                  Add to bag
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(color, size) => {
            onAddToCart(selectedProduct.id, color, size);
            setSelectedProduct(null);
          }}
        />
      )}
    </>
  );
}
