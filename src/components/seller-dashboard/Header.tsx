import { SellerAnalytics, HealthScoreData } from "@/types/analytics";
import { cn } from "@/lib/utils";
import { BarChart3, TrendingDown } from "lucide-react";

interface HeaderProps {
  seller: SellerAnalytics | null;
  healthScore: HealthScoreData | null;
}

const tierColors = {
  Start: "bg-blue-100 text-blue-900",
  Growth: "bg-teal-100 text-teal-900",
  Scale: "bg-purple-100 text-purple-900",
};

export function Header({ seller, healthScore }: HeaderProps) {
  if (!seller || !healthScore) {
    return (
      <div className="px-6 py-4 border-b border-slate-200 bg-white">
        <div className="text-slate-500">Loading...</div>
      </div>
    );
  }

  const scoreColor =
    healthScore.color === "green"
      ? "bg-green-100 text-green-900"
      : healthScore.color === "yellow"
        ? "bg-amber-100 text-amber-900"
        : "bg-red-100 text-red-900";

  return (
    <div className="px-6 py-4 border-b border-slate-200 bg-white">
      <div className="flex items-center justify-between gap-8">
        {/* Left: Seller Name & Tier */}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            {seller.seller_name}
          </h1>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-block px-3 py-1 rounded-lg text-sm font-semibold",
                tierColors[seller.tier]
              )}
            >
              {seller.tier} Tier
            </span>
          </div>
        </div>

        {/* Center: Health Score Card */}
        <div
          className={cn(
            "px-6 py-3 rounded-lg text-center min-w-max",
            scoreColor
          )}
        >
          <div className="text-sm text-opacity-80 mb-1">Health Score</div>
          <div className="text-3xl font-bold">{healthScore.score}</div>
        </div>

        {/* Right: Quick Metrics */}
        <div className="flex gap-8 min-w-max">
          <div>
            <div className="flex items-center gap-1 text-slate-600 text-sm mb-1">
              <BarChart3 className="w-4 h-4" />
              Monthly GMV
            </div>
            <div className="text-xl font-semibold text-slate-900">
              {(seller.monthly_gmv / 1000).toFixed(0)}k zł
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1 text-slate-600 text-sm mb-1">
              <TrendingDown className="w-4 h-4" />
              Return Rate
            </div>
            <div className="text-xl font-semibold text-slate-900">
              {(seller.return_rate * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
