import { X, Check } from 'lucide-react';
import { useState } from 'react';
import posthog from 'posthog-js';

interface StylingProduct {
  id: string;
  name: string;
  price: string;
  image: string;
  inStock: boolean;
  colors: Array<{ id: string; name: string; hex: string }>;
  sizes: string[];
}

interface Styling {
  id: string;
  products: StylingProduct[];
}

interface AddToBagModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productImage: string;
  styling: Styling | null;
  onAddStylingProduct: (productId: string, color: string, size: string) => void;
  onGoToCheckout: () => void;
  outfitImage?: string;
}

export function AddToBagModal({
  isOpen,
  onClose,
  productName,
  productImage,
  styling,
  onAddStylingProduct,
  onGoToCheckout,
  outfitImage
}: AddToBagModalProps) {
  const [selectedProduct, setSelectedProduct] = useState<StylingProduct | null>(null);

  if (!isOpen) return null;

  const availableProducts = styling?.products.filter(p => p.inStock) || [];

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center bg-black/50" onClick={onClose}>
        <div
          className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto md:rounded-lg md:m-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-green-700" />
              </div>
              <h2 className="text-lg">Added to bag</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Product Added Confirmation */}
          <div className="px-6 py-4 border-b">
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                <img src={productImage} alt={productName} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{productName}</h3>
                <p className="text-sm text-gray-600 mt-1">Successfully added to your bag</p>
              </div>
            </div>
          </div>

          {/* Buy the Look Section */}
          {availableProducts.length > 0 && (
            <div className="px-6 py-6">
              <h3 className="text-lg mb-4">Complete the look</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Full Outfit Photo */}
                <div className="bg-white border rounded-lg overflow-hidden h-full">
                  <img
                    src={outfitImage || 'https://images.unsplash.com/photo-1611043481649-3dd586f37e12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'}
                    alt="Full outfit"
                    className="w-full h-full object-cover block"
                  />
                </div>

                {/* Individual Products */}
                {availableProducts.map((product) => (
                  <div key={product.id} className="bg-white border rounded-lg overflow-hidden">
                    <div className="aspect-square">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3 space-y-3">
                      <div>
                        <h4 className="text-sm mb-1">{product.name}</h4>
                        <p className="text-sm">{product.price}</p>
                      </div>
                      <button
                        onClick={() => { setSelectedProduct(product); posthog.capture('buy_the_look_popup_add_to_bag'); }}
                        data-ph-capture="buy-the-look-popup-add-to-bag"
                        className="w-full bg-black text-white py-2 px-4 rounded text-sm hover:bg-gray-800 transition-colors"
                      >
                        Add to bag
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="sticky bottom-0 bg-white border-t px-6 py-4 space-y-3">
            <button
              onClick={onGoToCheckout}
              className="w-full bg-black text-white py-4 rounded text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors"
            >
              Go to checkout
            </button>
            <button
              onClick={onClose}
              className="w-full border border-gray-300 py-4 rounded text-sm uppercase tracking-wide hover:border-black transition-colors"
            >
              Continue shopping
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal for Styling Products */}
      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(color, size) => {
            onAddStylingProduct(selectedProduct.id, color, size);
            setSelectedProduct(null);
          }}
        />
      )}
    </>
  );
}

interface QuickViewModalProps {
  product: StylingProduct;
  onClose: () => void;
  onAddToCart: (color: string, size: string) => void;
}

function QuickViewModal({ product, onClose, onAddToCart }: QuickViewModalProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.id || '');
  const [selectedSize, setSelectedSize] = useState('');

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) return;
    onAddToCart(selectedColor, selectedSize);
  };

  const canAddToCart = selectedColor && selectedSize;

  return (
    <div className="fixed inset-0 z-[60] flex items-start md:items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-white w-full max-w-2xl max-h-[100vh] md:max-h-[90vh] overflow-y-auto md:rounded-lg md:m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="bg-gray-100">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover aspect-square" />
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
                    {product.colors.find(c => c.id === selectedColor)?.name || ''}
                  </span>
                </div>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className={`w-10 h-10 rounded-full border-2 ${
                        selectedColor === color.id ? 'border-black' : 'border-gray-300'
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
                      className={`py-3 px-4 border rounded text-sm ${
                        selectedSize === size
                          ? 'bg-black text-white border-black'
                          : 'bg-white border-gray-300 hover:border-black'
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
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
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
