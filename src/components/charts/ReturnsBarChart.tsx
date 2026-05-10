"use client";

import { SKUPerformance } from "@/types/analytics";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface ReturnsBarChartProps {
  skus: SKUPerformance[];
  metric?: "loss_pln" | "return_rate" | "orders";
}

function getHeatmapColor(returnRate: number) {
  if (returnRate < 0.2) return "#22c55e"; // green
  if (returnRate < 0.35) return "#eab308"; // yellow
  return "#ef4444"; // red
}

export function ReturnsBarChart({
  skus,
  metric = "loss_pln",
}: ReturnsBarChartProps) {
  // Get top 10 SKUs sorted by metric
  const topSkus = [...skus]
    .sort((a, b) => {
      if (metric === "loss_pln") return b.total_loss_pln - a.total_loss_pln;
      if (metric === "return_rate") return b.return_rate - a.return_rate;
      return b.order_count - a.order_count;
    })
    .slice(0, 10);

  // Format data for chart
  const chartData = topSkus.map((sku) => ({
    name: sku.product_name.substring(0, 20),
    value:
      metric === "loss_pln"
        ? sku.total_loss_pln
        : metric === "return_rate"
          ? sku.return_rate * 100
          : sku.order_count,
    returnRate: sku.return_rate,
  }));

  const getMetricLabel = () => {
    if (metric === "loss_pln") return "Loss (PLN)";
    if (metric === "return_rate") return "Return Rate (%)";
    return "Orders";
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">
        Top 10 SKUs by {getMetricLabel()}
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis type="number" stroke="#64748b" style={{ fontSize: "12px" }} />
          <YAxis
            dataKey="name"
            type="category"
            stroke="#64748b"
            style={{ fontSize: "12px" }}
            width={145}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
            }}
            formatter={(value) => {
              if (metric === "loss_pln") return `${value.toLocaleString("pl-PL")} zł`;
              if (metric === "return_rate") return `${value.toFixed(1)}%`;
              return value;
            }}
          />
          <Bar dataKey="value" fill="#0d9488" radius={4}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getHeatmapColor(entry.returnRate)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
