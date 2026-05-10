"use client";

import { useState, useMemo } from "react";
import { SKUPerformance } from "@/types/analytics";
import { Card } from "@/components/ui/card";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReturnsHeatmapProps {
  skus: SKUPerformance[];
}

type SortField = "return_rate" | "loss_pln" | "orders";
type SortOrder = "asc" | "desc";

function getHeatmapColor(returnRate: number) {
  if (returnRate < 0.2) return "bg-green-100 text-green-900"; // <20% green
  if (returnRate < 0.35) return "bg-amber-100 text-amber-900"; // 20-35% yellow
  return "bg-red-100 text-red-900"; // >35% red
}

export function ReturnsHeatmap({ skus }: ReturnsHeatmapProps) {
  const [sortField, setSortField] = useState<SortField>("loss_pln");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const categories = useMemo(
    () => ["all", ...new Set(skus.map((s) => s.category))],
    [skus]
  );

  const sortedSKUs = useMemo(() => {
    let filtered = skus;

    if (categoryFilter !== "all") {
      filtered = filtered.filter((s) => s.category === categoryFilter);
    }

    return [...filtered].sort((a, b) => {
      let aVal: number;
      let bVal: number;

      if (sortField === "return_rate") {
        aVal = a.return_rate;
        bVal = b.return_rate;
      } else if (sortField === "loss_pln") {
        aVal = a.total_loss_pln;
        bVal = b.total_loss_pln;
      } else {
        aVal = a.order_count;
        bVal = b.order_count;
      }

      return sortOrder === "desc" ? bVal - aVal : aVal - bVal;
    });
  }, [skus, sortField, sortOrder, categoryFilter]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const exportToCSV = () => {
    const headers = [
      "SKU",
      "Product Name",
      "Category",
      "Return %",
      "Orders",
      "Loss (PLN)",
      "Top Reason",
    ];

    const rows = sortedSKUs.map((sku) => [
      sku.sku_id,
      sku.product_name,
      sku.category,
      `${(sku.return_rate * 100).toFixed(1)}%`,
      sku.order_count,
      sku.total_loss_pln.toLocaleString("pl-PL"),
      sku.top_reason,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    const date = new Date().toISOString().split("T")[0];
    link.setAttribute("href", url);
    link.setAttribute("download", `returns-heatmap-${date}.csv`);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortOrder === "desc" ? (
      <ChevronDown className="w-4 h-4" />
    ) : (
      <ChevronUp className="w-4 h-4" />
    );
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Returns Heatmap</h3>

        {/* Category Filter & Export */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-600">Category:</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={exportToCSV}
            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-slate-200">
              <th className="text-left py-3 px-4 font-semibold text-slate-700">
                SKU
              </th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">
                Category
              </th>
              <th className="text-right py-3 px-4 font-semibold text-slate-700">
                <button
                  onClick={() => handleSort("return_rate")}
                  className="flex items-center gap-2 ml-auto hover:text-teal-600"
                >
                  Return %
                  <SortIcon field="return_rate" />
                </button>
              </th>
              <th className="text-right py-3 px-4 font-semibold text-slate-700">
                <button
                  onClick={() => handleSort("orders")}
                  className="flex items-center gap-2 ml-auto hover:text-teal-600"
                >
                  Orders
                  <SortIcon field="orders" />
                </button>
              </th>
              <th className="text-right py-3 px-4 font-semibold text-slate-700">
                <button
                  onClick={() => handleSort("loss_pln")}
                  className="flex items-center gap-2 ml-auto hover:text-teal-600"
                >
                  Loss (PLN)
                  <SortIcon field="loss_pln" />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">
                Top Reason
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedSKUs.map((sku) => (
              <tr key={sku.sku_id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-4 px-4">
                  <div>
                    <div className="font-medium text-slate-900">
                      {sku.product_name}
                    </div>
                    <div className="text-xs text-slate-500">{sku.sku_id}</div>
                  </div>
                </td>
                <td className="py-4 px-4 text-slate-600">{sku.category}</td>
                <td className="py-4 px-4 text-right">
                  <div
                    className={cn(
                      "inline-block px-3 py-1 rounded-lg font-semibold",
                      getHeatmapColor(sku.return_rate)
                    )}
                  >
                    {(sku.return_rate * 100).toFixed(0)}%
                  </div>
                </td>
                <td className="py-4 px-4 text-right text-slate-900 font-medium">
                  {sku.order_count}
                </td>
                <td className="py-4 px-4 text-right text-slate-900 font-medium">
                  {sku.total_loss_pln.toLocaleString("pl-PL")} zł
                </td>
                <td className="py-4 px-4">
                  <span className="inline-block px-2 py-1 bg-slate-100 rounded text-slate-700 text-xs font-medium capitalize">
                    {sku.top_reason}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-slate-600">
        <p>
          Total SKUs: {sortedSKUs.length} | Total Loss:{" "}
          <span className="font-semibold">
            {sortedSKUs
              .reduce((sum, sku) => sum + sku.total_loss_pln, 0)
              .toLocaleString("pl-PL")}{" "}
            zł
          </span>
        </p>
      </div>
    </Card>
  );
}
