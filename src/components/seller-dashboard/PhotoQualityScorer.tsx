import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  AlertCircle,
  Image,
  Lightbulb,
  Zap,
} from "lucide-react";

interface PhotoQualityScore {
  metric: string;
  score: number;
  feedback: string;
  importance: "critical" | "high" | "medium";
}

const photoMetrics: PhotoQualityScore[] = [
  {
    metric: "Lighting Quality",
    score: 85,
    feedback: "Natural light is excellent. Consider adding fill light for shadows.",
    importance: "critical",
  },
  {
    metric: "Background Clarity",
    score: 72,
    feedback: "Clean background. Consider a solid color backdrop.",
    importance: "high",
  },
  {
    metric: "Focus & Sharpness",
    score: 91,
    feedback: "Excellent sharpness on product. This drives conversions.",
    importance: "critical",
  },
  {
    metric: "Color Accuracy",
    score: 78,
    feedback: "Colors are close. Consider white balance adjustment.",
    importance: "high",
  },
  {
    metric: "Composition & Framing",
    score: 82,
    feedback: "Good product-to-frame ratio. Perfect for gallery layout.",
    importance: "medium",
  },
];

const overallScore = Math.round(
  photoMetrics.reduce((sum, m) => sum + m.score, 0) / photoMetrics.length
);

function getMetricColor(score: number) {
  if (score >= 80) return "bg-green-100";
  if (score >= 60) return "bg-amber-100";
  return "bg-red-100";
}

function getImportanceBadge(importance: string) {
  if (importance === "critical") return "bg-red-100 text-red-900";
  if (importance === "high") return "bg-orange-100 text-orange-900";
  return "bg-blue-100 text-blue-900";
}

export function PhotoQualityScorer() {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">
              Photo Quality Analysis
            </h3>
            <p className="text-sm text-slate-600">
              AI-powered photo scoring (Scale tier feature)
            </p>
          </div>
          <div className="text-4xl font-bold text-purple-600">{overallScore}</div>
        </div>

        <div className="text-sm text-slate-700">
          Your photos rank in the <strong>top 28%</strong> of sellers in Fashion.
          High-quality images increase conversion rates by 35%.
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Detailed Metrics
        </h3>
        <div className="space-y-4">
          {photoMetrics.map((metric) => (
            <div key={metric.metric} className="border-b border-slate-200 pb-4 last:border-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-slate-900">
                      {metric.metric}
                    </span>
                    <span
                      className={cn(
                        "inline-block px-2 py-1 rounded text-xs font-medium",
                        getImportanceBadge(metric.importance)
                      )}
                    >
                      {metric.importance === "critical"
                        ? "Critical"
                        : metric.importance === "high"
                          ? "High Priority"
                          : "Optimize"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{metric.feedback}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900">
                    {metric.score}
                  </div>
                </div>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full transition-all",
                    metric.score >= 80
                      ? "bg-green-500"
                      : metric.score >= 60
                        ? "bg-amber-500"
                        : "bg-red-500"
                  )}
                  style={{ width: `${metric.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">
              Quick Wins (Try These First)
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>
                  Add fill light or reflector to reduce harsh shadows on fabric
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>
                  White balance adjustment: colors feel slightly warm, cool by 2-3%
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>Consider a neutral gray backdrop for lifestyle shots</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-2 border-purple-300 bg-purple-50">
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-slate-900 mb-1">
              Premium Coaching Available
            </h3>
            <p className="text-sm text-slate-700 mb-3">
              Book a 1-on-1 session with a professional product photographer
            </p>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
              Schedule Photo Coaching
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
