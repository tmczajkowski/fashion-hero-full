import { ArrowRight, BarChart3, Zap, Shield, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function SellerPortalPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="px-6 py-16 text-center max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Seller Portal
          </h1>
          <p className="text-xl text-slate-600">
            Manage your products, track performance, and grow your sales
          </p>
        </div>

        <div className="flex gap-4 justify-center mb-12">
          <Link
            href="/seller-dashboard"
            className="px-8 py-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-semibold flex items-center gap-2"
          >
            Go to Dashboard
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/"
            className="px-8 py-4 bg-white text-slate-900 rounded-lg hover:bg-slate-50 transition-colors font-semibold border border-slate-200"
          >
            Back to Store
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
          Dashboard Features
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Analytics Card */}
          <div className="bg-white rounded-lg p-8 border border-slate-200 hover:border-teal-300 transition-colors">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-teal-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Analytics Dashboard
                </h3>
                <p className="text-sm text-slate-600">
                  Track real-time sales metrics
                </p>
              </div>
            </div>
            <p className="text-slate-600 mb-4">
              Monitor your health score, return rates, GMV, and product
              performance with interactive visualizations.
            </p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>✓ Health Score tracking</li>
              <li>✓ Return rate analysis</li>
              <li>✓ Sales heatmap by SKU</li>
            </ul>
          </div>

          {/* Deep Dive Card */}
          <div className="bg-white rounded-lg p-8 border border-slate-200 hover:border-teal-300 transition-colors">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Deep Dive Analysis
                </h3>
                <p className="text-sm text-slate-600">
                  Understand product returns
                </p>
              </div>
            </div>
            <p className="text-slate-600 mb-4">
              Dive deep into individual SKUs to understand return reasons, trends,
              and actionable recommendations.
            </p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>✓ Return reason breakdown</li>
              <li>✓ 90-day trend analysis</li>
              <li>✓ AI recommendations</li>
            </ul>
          </div>

          {/* Diagnostics Card */}
          <div className="bg-white rounded-lg p-8 border border-slate-200 hover:border-teal-300 transition-colors">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Diagnostics (Growth+)
                </h3>
                <p className="text-sm text-slate-600">
                  Quality audit tools
                </p>
              </div>
            </div>
            <p className="text-slate-600 mb-4">
              Audit product descriptions and photos with AI-powered scoring to
              reduce returns.
            </p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>✓ Copy quality scoring</li>
              <li>✓ Photo quality analysis (Scale)</li>
            </ul>
          </div>

          {/* Actions Card */}
          <div className="bg-white rounded-lg p-8 border border-slate-200 hover:border-teal-300 transition-colors">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-amber-100 rounded-lg">
                <Zap className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Actions (Growth+)
                </h3>
                <p className="text-sm text-slate-600">
                  Improvement tools
                </p>
              </div>
            </div>
            <p className="text-slate-600 mb-4">
              Get DIY tools and professional services to improve your product
              listings.
            </p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>✓ Size chart generator</li>
              <li>✓ Professional photo booking</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 bg-teal-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Grow Your Sales?
          </h2>
          <p className="text-teal-100 mb-8">
            Access your seller dashboard to monitor performance and implement
            improvements.
          </p>
          <Link
            href="/seller-dashboard"
            className="inline-block px-8 py-4 bg-white text-teal-600 rounded-lg hover:bg-teal-50 transition-colors font-semibold"
          >
            Enter Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
