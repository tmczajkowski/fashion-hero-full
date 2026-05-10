import { SKUPerformance } from "@/types/analytics";
import { cn } from "@/lib/utils";

interface SKUSelectorProps {
  skus: SKUPerformance[];
  selectedSku: SKUPerformance | null;
  onSelect: (sku: SKUPerformance) => void;
}

function getReturnColor(returnRate: number) {
  if (returnRate < 0.2) return "bg-green-50 border-green-200 hover:border-green-300";
  if (returnRate < 0.35) return "bg-amber-50 border-amber-200 hover:border-amber-300";
  return "bg-red-50 border-red-200 hover:border-red-300";
}

function getReturnBadgeColor(returnRate: number) {
  if (returnRate < 0.2) return "bg-green-100 text-green-900";
  if (returnRate < 0.35) return "bg-amber-100 text-amber-900";
  return "bg-red-100 text-red-900";
}

export function SKUSelector({
  skus,
  selectedSku,
  onSelect,
}: SKUSelectorProps) {
  // Sort by return rate descending, show top 10
  const topSkus = [...skus]
    .sort((a, b) => b.return_rate - a.return_rate)
    .slice(0, 10);

  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-900 mb-4">
        Select SKU to Deep Dive
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
        {topSkus.map((sku) => (
          <button
            key={sku.sku_id}
            onClick={() => onSelect(sku)}
            className={cn(
              "p-4 rounded-lg border-2 transition-all text-left",
              selectedSku?.sku_id === sku.sku_id
                ? "border-teal-600 bg-teal-50"
                : `border-slate-200 ${getReturnColor(sku.return_rate)}`,
              "hover:shadow-md"
            )}
          >
            <div className="font-medium text-slate-900 mb-2 line-clamp-2">
              {sku.product_name}
            </div>
            <div className="text-xs text-slate-500 mb-3">{sku.sku_id}</div>
            <div className="flex items-center justify-between gap-2">
              <div>
                <div
                  className={cn(
                    "inline-block px-2 py-1 rounded text-sm font-semibold",
                    getReturnBadgeColor(sku.return_rate)
                  )}
                >
                  {(sku.return_rate * 100).toFixed(0)}%
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-600">Loss</div>
                <div className="text-sm font-bold text-slate-900">
                  {(sku.total_loss_pln / 1000).toFixed(0)}k zł
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
