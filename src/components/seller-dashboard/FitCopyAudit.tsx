import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface CopyAuditResult {
  score: number;
  checks: {
    name: string;
    passed: boolean;
    description: string;
  }[];
  benchmark: number;
}

function getScoreColor(score: number) {
  if (score >= 80) return "bg-green-100 text-green-900";
  if (score >= 60) return "bg-amber-100 text-amber-900";
  return "bg-red-100 text-red-900";
}

function getScoreLabel(score: number) {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  return "Needs Improvement";
}

const sampleResults: CopyAuditResult = {
  score: 72,
  benchmark: 85,
  checks: [
    {
      name: "Description Length",
      passed: true,
      description: "150+ characters ✓",
    },
    {
      name: "Key Features Listed",
      passed: true,
      description: "Material, fit, care instructions mentioned",
    },
    {
      name: "Size Guidance",
      passed: false,
      description: "Add recommendations for sizing",
    },
    {
      name: "Brand Voice",
      passed: true,
      description: "Clear and engaging tone",
    },
    {
      name: "SEO Keywords",
      passed: false,
      description: "Include more relevant search terms",
    },
  ],
};

export function FitCopyAudit() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Copy Quality Score
            </h3>
            <p className="text-sm text-slate-600">
              Your product description quality compared to top sellers
            </p>
          </div>
          <div
            className={cn(
              "px-4 py-2 rounded-lg font-bold text-2xl",
              getScoreColor(sampleResults.score)
            )}
          >
            {sampleResults.score}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">
              Your Score
            </span>
            <span className="text-sm text-slate-600">
              Benchmark: {sampleResults.benchmark}
            </span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
              style={{ width: `${sampleResults.score}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-slate-50 rounded-lg">
            <div className="text-xs text-slate-600 mb-1">Gap to Benchmark</div>
            <div className="text-2xl font-bold text-slate-900">
              {sampleResults.benchmark - sampleResults.score}
            </div>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <div className="text-xs text-slate-600 mb-1">Rating</div>
            <div className="text-lg font-bold text-slate-900">
              {getScoreLabel(sampleResults.score)}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Quality Checklist
        </h3>
        <div className="space-y-3">
          {sampleResults.checks.map((check) => (
            <div
              key={check.name}
              className="flex items-start gap-3 p-3 rounded-lg border border-slate-200"
            >
              {check.passed ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <div className="font-medium text-slate-900">{check.name}</div>
                <div className="text-sm text-slate-600">
                  {check.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-3">
          Top Recommendations
        </h3>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">1.</span>
            <span>
              Add sizing guidance: &quot;True to size, fits snug through thighs&quot;
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">2.</span>
            <span>
              Include style keywords: &quot;perfect for casual weekends&quot; or &quot;work-friendly&quot;
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">3.</span>
            <span>Mention care instructions prominently</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
