"use client";

import { DailyMetric } from "@/types/analytics";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TrendLineChartProps {
  trend90d: DailyMetric[];
  title?: string;
}

export function TrendLineChart({
  trend90d,
  title = "90-Day Return Rate Trend",
}: TrendLineChartProps) {
  // Format data for chart
  const chartData = trend90d.map((metric) => ({
    date: metric.date,
    displayDate: new Date(metric.date).toLocaleDateString("pl-PL", {
      month: "short",
      day: "numeric",
    }),
    returnRate: metric.return_rate * 100,
  }));

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">{title}</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="colorReturnRate" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="displayDate"
            stroke="#64748b"
            style={{ fontSize: "12px" }}
          />
          <YAxis
            stroke="#64748b"
            style={{ fontSize: "12px" }}
            label={{ value: "Return Rate (%)", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
            }}
            formatter={(value) => `${(value as number).toFixed(1)}%`}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="returnRate"
            stroke="#0d9488"
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
            fillOpacity={1}
            fill="url(#colorReturnRate)"
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-6 p-4 bg-slate-50 rounded-lg">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-xs text-slate-600">Starting Rate</div>
            <div className="text-xl font-bold text-slate-900">
              {(chartData[0]?.returnRate ?? 0).toFixed(1)}%
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-600">Current Rate</div>
            <div className="text-xl font-bold text-slate-900">
              {(chartData[chartData.length - 1]?.returnRate ?? 0).toFixed(1)}%
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-600">Trend</div>
            <div className="text-xl font-bold text-slate-900">
              {(
                (chartData[chartData.length - 1]?.returnRate ?? 0) -
                (chartData[0]?.returnRate ?? 0)
              ).toFixed(1)}
              %
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
