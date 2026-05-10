import { HealthScoreData } from "@/types/analytics";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface HealthScoreCardProps {
  data: HealthScoreData;
}

export function HealthScoreCard({ data }: HealthScoreCardProps) {
  const colorClass =
    data.color === "green"
      ? "bg-green-100 text-green-900"
      : data.color === "yellow"
        ? "bg-amber-100 text-amber-900"
        : "bg-red-100 text-red-900";

  const metrics = [
    {
      label: "Return Rate",
      value: Math.round(data.breakdown.return_rate),
      weight: "40%",
    },
    {
      label: "Support Tickets",
      value: Math.round(data.breakdown.support_tickets),
      weight: "30%",
    },
    {
      label: "Review Rating",
      value: Math.round(data.breakdown.review_rating),
      weight: "20%",
    },
    {
      label: "Repeat Rate",
      value: Math.round(data.breakdown.repeat_rate),
      weight: "10%",
    },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">Health Score</h3>

      {/* Main Score */}
      <div className={cn("rounded-lg p-8 text-center mb-8", colorClass)}>
        <div className="text-5xl font-bold">{data.score}</div>
        <div className="text-sm font-medium mt-2">
          {data.color === "green"
            ? "Excellent"
            : data.color === "yellow"
              ? "Fair"
              : "At Risk"}
        </div>
      </div>

      {/* Metric Breakdown */}
      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-700">
                {metric.label}
              </span>
              <span className="text-sm text-slate-600">
                {metric.value} <span className="text-xs text-slate-500">({metric.weight})</span>
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-teal-600 h-2 rounded-full transition-all"
                style={{ width: `${metric.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
