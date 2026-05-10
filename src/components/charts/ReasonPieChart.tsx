"use client";

import { ReasonBreakdown } from "@/types/analytics";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

interface ReasonPieChartProps {
  reasonBreakdown: ReasonBreakdown[];
  title?: string;
}

const reasonColors: Record<string, string> = {
  size: "#3b82f6",    // blue
  fit: "#f59e0b",     // amber
  color: "#8b5cf6",   // purple
  quality: "#ef4444", // red
  other: "#64748b",   // slate
};

export function ReasonPieChart({
  reasonBreakdown,
  title = "Return Reasons",
}: ReasonPieChartProps) {
  const chartData = reasonBreakdown.map((reason) => ({
    name: reason.reason,
    value: reason.pct * 100, // Convert to percentage for display
    count: reason.count,
  }));

  const getColor = (reason: string) => reasonColors[reason] || reasonColors.other;

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">{title}</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name} ${value.toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry) => (
              <Cell key={`cell-${entry.name}`} fill={getColor(entry.name)} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `${(value as number).toFixed(1)}%`}
            labelFormatter={(name) => `${name}`}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => `${value}`}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-6 space-y-2">
        {chartData.map((entry) => (
          <div key={entry.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getColor(entry.name) }}
              />
              <span className="text-sm font-medium text-slate-700">
                {entry.name}
              </span>
            </div>
            <div className="text-sm text-slate-600">
              {entry.count} returns ({entry.value.toFixed(1)}%)
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
