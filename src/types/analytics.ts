export type PricingTier = "Start" | "Growth" | "Scale";

export interface ReasonBreakdown {
  reason: string;
  count: number;
  pct: number;
}

export interface DailyMetric {
  date: string; // YYYY-MM-DD
  return_rate: number;
}

export interface SKUPerformance {
  sku_id: string;
  product_name: string;
  category: string;
  return_rate: number; // 0.0-1.0
  return_count: number;
  order_count: number;
  margin_per_unit: number; // PLN
  total_loss_pln: number;
  top_reason: string; // "size" | "fit" | "color" | "quality" | "other"
  reason_breakdown: ReasonBreakdown[];
  trend_90d: DailyMetric[];
}

export interface SellerAnalytics {
  seller_id: string;
  seller_name: string;
  tier: PricingTier;
  monthly_gmv: number;
  return_rate: number; // 0.0-1.0
  return_count: number;
  order_count: number;
  health_score: number; // 0-100
  skus: SKUPerformance[];
  top_return_reasons: ReasonBreakdown[];
  trend_90d: DailyMetric[];
}

export interface HealthScoreBreakdown {
  return_rate: number; // 40%
  support_tickets: number; // 30%
  review_rating: number; // 20%
  repeat_rate: number; // 10%
}

export interface HealthScoreData {
  score: number; // 0-100
  breakdown: HealthScoreBreakdown;
  color: "green" | "yellow" | "red"; // >70 green, 50-70 yellow, <50 red
}
