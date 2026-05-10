import { ReasonBreakdown } from "@/types/analytics";

export interface Recommendation {
  action: string;
  reason: string;
  expected_impact_pct: number;
  effort: "low" | "medium" | "high";
  link?: string;
}

const recommendationRules: Record<string, Recommendation> = {
  size: {
    action: "Add size chart",
    reason: "Size mismatch is the #1 return reason. A clear size table reduces confusion.",
    expected_impact_pct: 18,
    effort: "low",
    link: "/tools/fit-table-generator",
  },
  fit: {
    action: "Book pro-photo session",
    reason: "Professional photos show true fit and build customer confidence in purchase.",
    expected_impact_pct: 10,
    effort: "medium",
    link: "/tools/pro-photo-booking",
  },
  color: {
    action: "Improve lighting in photos",
    reason: "Poor lighting makes colors look different. Better photos = fewer color complaints.",
    expected_impact_pct: 8,
    effort: "low",
    link: "/tools/photo-tips",
  },
  quality: {
    action: "Upgrade materials or QC process",
    reason: "Quality issues require product improvements. Review supplier specs and testing.",
    expected_impact_pct: 12,
    effort: "high",
    link: "/tools/quality-checklist",
  },
};

export function getRecommendations(
  reasonBreakdown: ReasonBreakdown[]
): Recommendation[] {
  // Sort reasons by percentage descending
  const sortedReasons = [...reasonBreakdown].sort((a, b) => b.pct - a.pct);

  // Get top 3 reasons and their recommendations
  const recommendations: Recommendation[] = [];
  for (const reason of sortedReasons.slice(0, 3)) {
    if (
      recommendationRules[reason.reason] &&
      reason.pct > 0.05 // Only recommend if >5% of returns
    ) {
      recommendations.push({
        ...recommendationRules[reason.reason],
        reason: `${reason.reason} — ${(reason.pct * 100).toFixed(0)}% of returns mention this`,
      });
    }
  }

  // If no recommendations from top reasons, add a catch-all
  if (recommendations.length === 0) {
    recommendations.push({
      action: "Review product description",
      reason: "Ensure descriptions are accurate and match customer expectations.",
      expected_impact_pct: 5,
      effort: "low",
      link: "/tools/description-audit",
    });
  }

  return recommendations;
}
