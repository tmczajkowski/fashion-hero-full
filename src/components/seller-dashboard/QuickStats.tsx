import { SellerAnalytics } from "@/types/analytics";
import { BarChart3, AlertCircle, TrendingDown } from "lucide-react";

interface QuickStatsProps {
  seller: SellerAnalytics | null;
}

export function QuickStats({ seller }: QuickStatsProps) {
  if (!seller) {
    return (
      <div className="bg-white rounded-lg p-6 border border-slate-200">
        <p className="text-slate-600">Loading stats...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">Quick Stats</h3>
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
            <BarChart3 className="w-4 h-4" />
            Miesięczny GMV
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {seller.monthly_gmv.toLocaleString("pl-PL")} zł
          </p>
        </div>
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
            <AlertCircle className="w-4 h-4" />
            Stopa zwrotów
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {(seller.return_rate * 100).toFixed(1)}%
          </p>
        </div>
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
            <TrendingDown className="w-4 h-4" />
            Total Loss (30d)
          </div>
          <p className="text-2xl font-bold text-red-600">
            {seller.skus
              .reduce((sum, sku) => sum + sku.total_loss_pln, 0)
              .toLocaleString("pl-PL")}{" "}
            zł
          </p>
        </div>
      </div>
    </div>
  );
}
