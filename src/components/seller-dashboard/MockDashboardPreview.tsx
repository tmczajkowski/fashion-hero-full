"use client";

import { TrendingDown, BarChart3 } from "lucide-react";

export function MockDashboardPreview() {
  return (
    <section className="w-full py-12 md:py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
          Zobacz jak to wygląda
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Returns Heatmap Mock */}
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="aspect-video bg-gradient-to-b from-white to-slate-50 p-6 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <TrendingDown className="w-5 h-5 text-red-600" />
                <h3 className="font-semibold text-slate-900">Returns Heatmap</h3>
              </div>

              {/* Simple heatmap visualization */}
              <div className="flex-1 space-y-3 justify-center flex flex-col">
                {[
                  ["bg-red-500", "bg-orange-300", "bg-yellow-200", "bg-red-500", "bg-orange-300", "bg-red-500", "bg-orange-300", "bg-green-200"],
                  ["bg-green-200", "bg-yellow-200", "bg-red-500", "bg-green-200", "bg-green-200", "bg-red-500", "bg-green-200", "bg-red-500"],
                  ["bg-yellow-200", "bg-green-200", "bg-red-500", "bg-orange-300", "bg-green-200", "bg-red-500", "bg-orange-300", "bg-green-200"],
                  ["bg-red-500", "bg-yellow-200", "bg-red-500", "bg-red-500", "bg-orange-300", "bg-orange-300", "bg-orange-300", "bg-yellow-200"],
                ].map((colors, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="text-xs text-slate-600 font-medium">
                      {["Product A", "Product B", "Product C", "Product D"][idx]}
                    </p>
                    <div className="flex gap-1">
                      {colors.map((color, i) => (
                        <div
                          key={i}
                          className={`h-8 flex-1 rounded ${color}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-xs text-slate-500 mt-4 flex gap-3">
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-200 rounded" /> OK
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded" /> High Risk
                </span>
              </div>
            </div>
            <div className="p-4 border-t bg-slate-50">
              <p className="text-sm text-slate-600">
                Heatmapa zwrotów — zobacz dokładnie które produkty tracą Ci
                pieniądze
              </p>
            </div>
          </div>

          {/* SKU Deep Dive Mock */}
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="aspect-video bg-gradient-to-b from-white to-slate-50 p-6 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-teal-600" />
                <h3 className="font-semibold text-slate-900">SKU Analysis</h3>
              </div>

              {/* Simple pie chart mock */}
              <div className="flex-1 flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full transform -rotate-90"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#fca5a5"
                      strokeWidth="15"
                      strokeDasharray="70 283"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="15"
                      strokeDasharray="100 283"
                      strokeDashoffset="-70"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#60a5fa"
                      strokeWidth="15"
                      strokeDasharray="113 283"
                      strokeDashoffset="-170"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-lg font-bold text-slate-900">38%</p>
                      <p className="text-xs text-slate-600">Powroty</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-xs space-y-1 mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full" />
                  <span className="text-slate-600">Wrong size: 25%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full" />
                  <span className="text-slate-600">Quality issue: 35%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span className="text-slate-600">Other: 40%</span>
                </div>
              </div>
            </div>
            <div className="p-4 border-t bg-slate-50">
              <p className="text-sm text-slate-600">
                Analiza zwrotów — czemu klienci zwracają Twoje produkty
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
