import { Search, ShoppingCart, Heart, Star, ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { useState } from 'react';
import posthog from 'posthog-js';
import { StylingSection } from './components/styling-section';
import { AddToBagModal } from './components/add-to-bag-modal';
import leatherJacketImg from '../imports/image-1.png';
import beanieImg from '../imports/image-2.png';
import outfitImg from '../imports/image-3.png';

export default function App() {
  const [selectedSize, setSelectedSize] = useState('8');
  const [selectedColor, setSelectedColor] = useState('blush');
  const [mainImage, setMainImage] = useState(0);
  const [stylingRating, setStylingRating] = useState<'positive' | 'negative' | undefined>(undefined);
  const [showAddToBagModal, setShowAddToBagModal] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    'https://images.unsplash.com/photo-1625860191460-10a66c7384fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
  ];

  const sizes = ['5', '6', '7', '8', '9', '10', '11'];

  const relatedProducts = [
    { id: 1, name: 'Speed Trainer', price: '349 zł', image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400', badge: 'BESTSELLER', rating: 4 },
    { id: 2, name: 'Urban Jogger', price: '429 zł', image: 'https://images.unsplash.com/photo-1608229751021-ed4bd8677753?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400', badge: 'NEW', rating: 5 },
    { id: 3, name: 'Light Sneaker', price: '399 zł', image: 'https://images.unsplash.com/photo-1591175359374-12dba73cd4b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400', rating: 4 },
    { id: 4, name: 'Summit Hiker', price: '639 zł', image: 'https://images.unsplash.com/photo-1603808033596-5d1fa1629eae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400', rating: 5 },
    { id: 5, name: 'Essential Slides', price: '179 zł', image: 'https://images.unsplash.com/photo-1617602269951-f41db1a32e09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400', rating: 4 }
  ];

  const recentlyViewed = [
    { id: 1, name: 'Classic High-Top', price: '399 zł', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400', rating: 4 },
    { id: 2, name: 'Retro Runner', price: '459 zł', image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400', rating: 5 }
  ];

  const styling = {
    id: 'styling-1',
    products: [
      {
        id: 'leather-jacket-1',
        name: 'Ochnik Leather Jacket',
        price: '899 zł',
        image: leatherJacketImg,
        inStock: true,
        colors: [
          { id: 'black', name: 'Black', hex: '#000000' },
          { id: 'brown', name: 'Brown', hex: '#8B4513' }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL']
      },
      {
        id: 'beanie-1',
        name: 'Levis wool hat',
        price: '129 zł',
        image: beanieImg,
        inStock: true,
        colors: [
          { id: 'pink', name: 'Pink', hex: '#FFC0CB' },
          { id: 'black', name: 'Black', hex: '#000000' },
          { id: 'green', name: 'Green', hex: '#2F4F2F' }
        ],
        sizes: ['One Size']
      }
    ]
  };

  const handleAddToCart = (productId: string, color: string, size: string) => {
    console.log('Added to cart:', { productId, color, size });
    // Mock implementation - in real app would update cart state
  };

  const handleRateStyling = (stylingId: string, rating: 'positive' | 'negative') => {
    setStylingRating(rating);
    console.log('Styling rated:', { stylingId, rating });
    // Mock implementation - in real app would send to backend
  };

  const handleMainProductAddToBag = () => {
    console.log('Main product added to bag:', { color: selectedColor, size: selectedSize });
    setShowAddToBagModal(true);
  };

  const handleGoToCheckout = () => {
    console.log('Going to checkout');
    // Mock implementation - in real app would navigate to checkout
    setShowAddToBagModal(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f3f0] flex flex-col">
      {/* Top Banner */}
      <div className="bg-[#2a2a2a] text-white text-center py-1 text-xs">
        Free Shipping on orders over 299 zł — Free Returns
      </div>

      {/* Header */}
      <header className="bg-[#1a1a1a] text-white sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-semibold italic">Fashionhero</h1>
            <nav className="hidden md:flex gap-6 text-sm">
              <a href="#" className="hover:text-gray-300">MEN</a>
              <a href="#" className="hover:text-gray-300">WOMEN</a>
              <a href="#" className="hover:text-gray-300">KIDS</a>
              <a href="#" className="hover:text-gray-300">SALE</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Search className="w-5 h-5 cursor-pointer hover:text-gray-300" />
            <Heart className="w-5 h-5 cursor-pointer hover:text-gray-300" />
            <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-gray-300" />
            <Menu className="md:hidden w-5 h-5 cursor-pointer hover:text-gray-300" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1400px] mx-auto px-6 py-8">
        {/* Product Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg overflow-hidden aspect-square flex items-center justify-center">
              <img
                src={images[mainImage]}
                alt="Cloud Runner"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(idx)}
                  className={`bg-white rounded-lg overflow-hidden w-20 h-20 flex-shrink-0 border-2 ${
                    mainImage === idx ? 'border-black' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl mb-2">Cloud Runner</h2>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex">
                  {[1, 2, 3, 4].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-black" />
                  ))}
                  <Star className="w-4 h-4" />
                </div>
                <span className="text-sm text-gray-600">(287)</span>
              </div>
              <p className="text-2xl mb-4">479 zł</p>
              <p className="text-sm text-gray-700 mb-1">Seller: Bella DonnaPro</p>
              <p className="text-sm text-green-700">In Stock — Ready to Ship</p>
            </div>

            {/* Color Selection */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm uppercase tracking-wide">Select Color</span>
                <span className="text-sm text-gray-600">Blush Pink</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedColor('blush')}
                  className={`w-10 h-10 rounded-full bg-[#f5d4c8] border-2 ${
                    selectedColor === 'blush' ? 'border-black' : 'border-gray-300'
                  }`}
                />
                <button
                  onClick={() => setSelectedColor('black')}
                  className={`w-10 h-10 rounded-full bg-black border-2 ${
                    selectedColor === 'black' ? 'border-black' : 'border-gray-300'
                  }`}
                />
                <button
                  onClick={() => setSelectedColor('charcoal')}
                  className={`w-10 h-10 rounded-full bg-[#4a4a4a] border-2 ${
                    selectedColor === 'charcoal' ? 'border-black' : 'border-gray-300'
                  }`}
                />
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm uppercase tracking-wide">Select Size</span>
                <span className="text-sm text-gray-600">Women's Size</span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {sizes.map((size) => (
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

            {/* Add to Bag Button */}
            <button
              onClick={() => { handleMainProductAddToBag(); posthog.capture('main_add_to_bag'); }}
              data-ph-capture="main-add-to-bag"
              className="w-full bg-black text-white py-4 rounded text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors"
            >
              Add to Bag
            </button>

            {/* Shipping Info */}
            <div className="text-sm text-gray-700 pt-4 border-t">
              <p>Delivery: Apr 22-24</p>
              <p className="text-xs mt-1">Free shipping on orders over 299 zł</p>
            </div>
          </div>
        </div>

        {/* Product Details Accordion */}
        <div className="max-w-2xl mb-16 space-y-0 border-t border-b">
          <AccordionItem title="DESCRIPTION" defaultOpen>
            <p className="text-sm text-gray-700 leading-relaxed">
              A lightweight everyday runner with a breathable knit upper and cushioned sole. Built for comfort from morning to night.
            </p>
          </AccordionItem>
          <AccordionItem title="FEATURES">
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Breathable mesh upper</li>
              <li>• Cushioned insole</li>
              <li>• Lightweight EVA midsole</li>
              <li>• Natural rubber outsole</li>
            </ul>
          </AccordionItem>
          <AccordionItem title="MATERIALS">
            <p className="text-sm text-gray-700 leading-relaxed">
              Upper: Recycled polyester mesh<br />
              Midsole: Sugarcane-based EVA<br />
              Outsole: Natural rubber
            </p>
          </AccordionItem>
          <AccordionItem title="CARE">
            <p className="text-sm text-gray-700 leading-relaxed">
              Spot clean with mild soap and water. Air dry away from direct heat.
            </p>
          </AccordionItem>
        </div>

        {/* Styling Section */}
        <StylingSection
          styling={styling}
          onAddToCart={handleAddToCart}
          onRate={handleRateStyling}
          userRating={stylingRating}
          outfitImage={outfitImg}
        />

        {/* You May Also Like */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl">You May Also Like</h3>
            <div className="flex gap-2">
              <button className="p-2 border border-gray-300 rounded hover:border-black">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-2 border border-gray-300 rounded hover:border-black">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {relatedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden group cursor-pointer">
                <div className="relative aspect-square">
                  {product.badge && (
                    <div className={`absolute top-2 left-2 px-2 py-1 text-xs text-white rounded ${
                      product.badge === 'BESTSELLER' ? 'bg-red-600' : 'bg-black'
                    }`}>
                      {product.badge}
                    </div>
                  )}
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <h4 className="text-sm mb-1">{product.name}</h4>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < product.rating ? 'fill-black' : ''}`} />
                    ))}
                  </div>
                  <p className="text-sm">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recently Viewed */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl">Recently Viewed</h3>
            <div className="flex gap-2">
              <button className="p-2 border border-gray-300 rounded hover:border-black">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-2 border border-gray-300 rounded hover:border-black">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {recentlyViewed.map((product) => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden group cursor-pointer">
                <div className="aspect-square">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <h4 className="text-sm mb-1">{product.name}</h4>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < product.rating ? 'fill-black' : ''}`} />
                    ))}
                  </div>
                  <p className="text-sm">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#2a2a2a] text-white mt-auto">
        <div className="max-w-[1400px] mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-sm uppercase tracking-wide mb-4">Follow Our Stories</h4>
              <p className="text-sm text-gray-400 mb-4">
                Get the latest on new releases, exclusive promotions and more.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 px-3 py-2 bg-white text-black text-sm rounded"
                />
                <button className="px-4 py-2 bg-white text-black text-sm rounded hover:bg-gray-200">
                  Join
                </button>
              </div>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-wide mb-4">Help</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">FAQ/Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Track Order</a></li>
                <li><a href="#" className="hover:text-white">Shipping</a></li>
                <li><a href="#" className="hover:text-white">Order Status</a></li>
                <li><a href="#" className="hover:text-white">Returns</a></li>
                <li><a href="#" className="hover:text-white">Best Sellers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-wide mb-4">About</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Men's Shoes</a></li>
                <li><a href="#" className="hover:text-white">Women's Shoes</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Wholesale</a></li>
                <li><a href="#" className="hover:text-white">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-wide mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Our Story</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Corporate Gifting</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
            <p className="mb-4 md:mb-0">© 2026 Fashionhero Inc. All rights reserved.</p>
            <div className="flex gap-4 italic">
              <span>Fashionhero</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Add to Bag Modal */}
      <AddToBagModal
        isOpen={showAddToBagModal}
        onClose={() => setShowAddToBagModal(false)}
        productName="Cloud Runner"
        productImage={images[0]}
        styling={styling}
        onAddStylingProduct={handleAddToCart}
        onGoToCheckout={handleGoToCheckout}
        outfitImage={outfitImg}
      />
    </div>
  );
}

function AccordionItem({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left hover:bg-gray-50"
      >
        <span className="text-sm uppercase tracking-wide">{title}</span>
        <span className="text-xl">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div className="pb-4 px-0">
          {children}
        </div>
      )}
    </div>
  );
}