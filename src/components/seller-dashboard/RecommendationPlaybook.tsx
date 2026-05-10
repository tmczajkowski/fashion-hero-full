import { Recommendation } from "@/data/mock-recommendations";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, Zap } from "lucide-react";

interface RecommendationPlaybookProps {
  recommendations: Recommendation[];
}

function getEffortColor(effort: string) {
  if (effort === "low") return "bg-green-100 text-green-900";
  if (effort === "medium") return "bg-amber-100 text-amber-900";
  return "bg-red-100 text-red-900";
}

function getEffortLabel(effort: string) {
  if (effort === "low") return "Low effort";
  if (effort === "medium") return "Medium effort";
  return "High effort";
}

export function RecommendationPlaybook({
  recommendations,
}: RecommendationPlaybookProps) {
  const totalImpact = recommendations.reduce(
    (sum, rec) => sum + rec.expected_impact_pct,
    0
  );

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          Recommended Actions
        </h3>
        <p className="text-sm text-slate-600">
          Implement these actions to reduce return rates
        </p>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, idx) => (
          <div
            key={idx}
            className="p-4 rounded-lg border border-slate-200 hover:border-teal-300 hover:bg-teal-50 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">
                  {rec.action}
                </h4>
                <p className="text-sm text-slate-600 italic mb-2">{rec.reason}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-teal-600 font-bold text-lg mb-1">
                  <TrendingUp className="w-4 h-4" />
                  {rec.expected_impact_pct}%
                </div>
                <div className="text-xs text-slate-500">expected reduction</div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <div>
                <span
                  className={cn(
                    "inline-block px-2 py-1 rounded text-xs font-medium",
                    getEffortColor(rec.effort)
                  )}
                >
                  {getEffortLabel(rec.effort)}
                </span>
              </div>
              {rec.link && (
                <a
                  href={rec.link}
                  className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
                >
                  <Zap className="w-3 h-3" />
                  Get started
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-teal-50 rounded-lg border-2 border-teal-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-teal-900 mb-1">
              Combined Expected Impact
            </div>
            <div className="text-xs text-teal-700">
              If you implement all recommendations
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-teal-600">{totalImpact}%</div>
            <div className="text-xs text-teal-700">return rate reduction</div>
          </div>
        </div>
      </div>

      {recommendations.length === 0 && (
        <div className="text-center py-8">
          <p className="text-slate-600">No recommendations available</p>
        </div>
      )}
    </Card>
  );
}
