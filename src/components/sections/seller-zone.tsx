import Link from "next/link";
import { Store, ArrowRight } from "lucide-react";

export function SellerZone() {
  return (
    <section className="px-6 py-16 bg-gradient-to-r from-teal-50 to-cyan-50 border-t border-teal-200">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Content */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-teal-600 rounded-lg">
                <Store className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-teal-600 uppercase tracking-wider">
                For Sellers
              </span>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Seller Portal
            </h2>

            <p className="text-lg text-slate-600 mb-6">
              Access your dashboard to track sales, analyze product performance,
              and get AI-powered recommendations to reduce returns and boost your
              business.
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-slate-700">
                <span className="text-teal-600">✓</span>
                Real-time analytics & health scoring
              </li>
              <li className="flex items-center gap-2 text-slate-700">
                <span className="text-teal-600">✓</span>
                SKU-level deep dive analysis
              </li>
              <li className="flex items-center gap-2 text-slate-700">
                <span className="text-teal-600">✓</span>
                Quality tools & pro services (Growth plan)
              </li>
            </ul>

            <Link
              href="/seller-portal"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-semibold"
            >
              Explore Seller Portal
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right side - Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-6 border border-teal-200">
              <div className="text-3xl font-bold text-teal-600 mb-2">100+</div>
              <p className="text-sm text-slate-600">Active Sellers</p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-teal-200">
              <div className="text-3xl font-bold text-teal-600 mb-2">10K+</div>
              <p className="text-sm text-slate-600">Products Tracked</p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-teal-200">
              <div className="text-3xl font-bold text-teal-600 mb-2">25%</div>
              <p className="text-sm text-slate-600">Avg Return Reduction</p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-teal-200">
              <div className="text-3xl font-bold text-teal-600 mb-2">4.8★</div>
              <p className="text-sm text-slate-600">Seller Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
