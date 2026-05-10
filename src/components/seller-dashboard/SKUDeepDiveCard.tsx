import { SKUPerformance } from "@/types/analytics";
import { Recommendation } from "@/data/mock-recommendations";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReasonPieChart } from "@/components/charts/ReasonPieChart";
import { TrendLineChart } from "@/components/charts/TrendLineChart";
import { RecommendationPlaybook } from "@/components/seller-dashboard/RecommendationPlaybook";

interface SKUDeepDiveCardProps {
  sku: SKUPerformance;
  recommendations: Recommendation[];
  margin_per_unit?: number;
}

function getReturnBadgeColor(returnRate: number) {
  if (returnRate < 0.2) return "bg-green-100 text-green-900";
  if (returnRate < 0.35) return "bg-amber-100 text-amber-900";
  return "bg-red-100 text-red-900";
}

export function SKUDeepDiveCard({
  sku,
  recommendations,
  margin_per_unit = 100,
}: SKUDeepDiveCardProps) {
  return (
    <div className="space-y-6">
      {/* Header with SKU metrics */}
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {sku.product_name}
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">{sku.sku_id}</span>
            <span className="text-sm text-slate-500">•</span>
            <span className="text-sm text-slate-500">{sku.category}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Return Rate */}
          <div>
            <div className="text-sm text-slate-600 mb-2">Return Rate</div>
            <div
              className={cn(
                "inline-block px-3 py-2 rounded-lg font-bold text-lg",
                getReturnBadgeColor(sku.return_rate)
              )}
            >
              {(sku.return_rate * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-slate-500 mt-2">
              {sku.return_count} returns
            </div>
          </div>

          {/* Total Loss */}
          <div>
            <div className="text-sm text-slate-600 mb-2">Total Loss</div>
            <div className="text-2xl font-bold text-red-600 mb-1">
              {(sku.total_loss_pln / 1000).toFixed(1)}k zł
            </div>
            <div className="text-xs text-slate-500">30-day period</div>
          </div>

          {/* Orders */}
          <div>
            <div className="text-sm text-slate-600 mb-2">Orders</div>
            <div className="text-2xl font-bold text-slate-900 mb-1">
              {sku.order_count}
            </div>
            <div className="text-xs text-slate-500">in period</div>
          </div>

          {/* Avg Margin */}
          <div>
            <div className="text-sm text-slate-600 mb-2">Avg Margin/Unit</div>
            <div className="text-2xl font-bold text-slate-900 mb-1">
              {margin_per_unit} zł
            </div>
            <div className="text-xs text-slate-500">estimated</div>
          </div>
        </div>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart - Reason Distribution */}
        <ReasonPieChart
          reasonBreakdown={sku.reason_breakdown}
          title="Return Reasons"
        />

        {/* Metrics breakdown list */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">
            Breakdown by Reason
          </h3>
          <div className="space-y-3">
            {sku.reason_breakdown.map((reason) => (
              <div key={reason.reason} className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-900 capitalize">
                    {reason.reason}
                  </div>
                  <div className="text-sm text-slate-600">
                    {reason.count} returns
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900">
                    {(reason.pct * 100).toFixed(1)}%
                  </div>
                  <div className="w-32 h-2 bg-slate-200 rounded-full mt-1">
                    <div
                      className="h-2 bg-teal-600 rounded-full"
                      style={{ width: `${reason.pct * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Trend Line Chart */}
      <TrendLineChart trend90d={sku.trend_90d} title="90-Day Return Rate Trend" />

      {/* Recommendations */}
      <RecommendationPlaybook recommendations={recommendations} />
    </div>
  );
}
