import { SellerAnalytics } from "@/types/analytics";

// Generate 90 days of trend data
function generateTrend90d(baseRate: number) {
  const trend = [];
  const today = new Date();
  for (let i = 89; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const variance = (Math.random() - 0.5) * 0.05; // ±2.5% variance
    trend.push({
      date: date.toISOString().split("T")[0],
      return_rate: Math.max(0, baseRate + variance),
    });
  }
  return trend;
}

export const mockSellers: SellerAnalytics[] = [
  {
    seller_id: "s1",
    seller_name: "UrbanEdge",
    tier: "Growth",
    monthly_gmv: 120000,
    return_rate: 0.28,
    return_count: 234,
    order_count: 834,
    health_score: 62,
    skus: [
      {
        sku_id: "j45",
        product_name: "Jeansy Slim S45",
        category: "Apparel",
        return_rate: 0.48,
        return_count: 152,
        order_count: 316,
        margin_per_unit: 45,
        total_loss_pln: 12000,
        top_reason: "size",
        reason_breakdown: [
          { reason: "size", count: 152, pct: 0.65 },
          { reason: "fit", count: 56, pct: 0.24 },
          { reason: "color", count: 23, pct: 0.10 },
        ],
        trend_90d: generateTrend90d(0.48),
      },
      {
        sku_id: "t89",
        product_name: "T-shirt Basic White",
        category: "Apparel",
        return_rate: 0.18,
        return_count: 45,
        order_count: 250,
        margin_per_unit: 20,
        total_loss_pln: 2100,
        top_reason: "fit",
        reason_breakdown: [
          { reason: "fit", count: 45, pct: 1.0 },
        ],
        trend_90d: generateTrend90d(0.18),
      },
      {
        sku_id: "s12",
        product_name: "Socks Bundle Premium",
        category: "Socks",
        return_rate: 0.12,
        return_count: 24,
        order_count: 200,
        margin_per_unit: 15,
        total_loss_pln: 1200,
        top_reason: "quality",
        reason_breakdown: [
          { reason: "quality", count: 24, pct: 1.0 },
        ],
        trend_90d: generateTrend90d(0.12),
      },
      {
        sku_id: "h34",
        product_name: "Hoodie Urban Black",
        category: "Apparel",
        return_rate: 0.35,
        return_count: 21,
        order_count: 60,
        margin_per_unit: 55,
        total_loss_pln: 3850,
        top_reason: "size",
        reason_breakdown: [
          { reason: "size", count: 15, pct: 0.71 },
          { reason: "quality", count: 6, pct: 0.29 },
        ],
        trend_90d: generateTrend90d(0.35),
      },
    ],
    top_return_reasons: [
      { reason: "size", count: 167, pct: 0.714 },
      { reason: "fit", count: 56, pct: 0.239 },
      { reason: "color", count: 23, pct: 0.098 },
      { reason: "quality", count: 30, pct: 0.128 },
    ],
    trend_90d: generateTrend90d(0.28),
  },
  {
    seller_id: "s2",
    seller_name: "FitFirst Apparel",
    tier: "Start",
    monthly_gmv: 85000,
    return_rate: 0.35,
    return_count: 189,
    order_count: 540,
    health_score: 48,
    skus: [
      {
        sku_id: "p67",
        product_name: "Performance Jacket",
        category: "Apparel",
        return_rate: 0.55,
        return_count: 110,
        order_count: 200,
        margin_per_unit: 65,
        total_loss_pln: 11000,
        top_reason: "fit",
        reason_breakdown: [
          { reason: "fit", count: 88, pct: 0.8 },
          { reason: "color", count: 22, pct: 0.2 },
        ],
        trend_90d: generateTrend90d(0.55),
      },
      {
        sku_id: "l23",
        product_name: "Leggings Active",
        category: "Apparel",
        return_rate: 0.28,
        return_count: 42,
        order_count: 150,
        margin_per_unit: 35,
        total_loss_pln: 3150,
        top_reason: "size",
        reason_breakdown: [
          { reason: "size", count: 42, pct: 1.0 },
        ],
        trend_90d: generateTrend90d(0.28),
      },
      {
        sku_id: "c45",
        product_name: "Cap Classic",
        category: "Accessories",
        return_rate: 0.12,
        return_count: 18,
        order_count: 150,
        margin_per_unit: 18,
        total_loss_pln: 900,
        top_reason: "quality",
        reason_breakdown: [
          { reason: "quality", count: 18, pct: 1.0 },
        ],
        trend_90d: generateTrend90d(0.12),
      },
      {
        sku_id: "b90",
        product_name: "Bag Crossbody",
        category: "Accessories",
        return_rate: 0.22,
        return_count: 19,
        order_count: 86,
        margin_per_unit: 45,
        total_loss_pln: 2160,
        top_reason: "fit",
        reason_breakdown: [
          { reason: "fit", count: 15, pct: 0.79 },
          { reason: "color", count: 4, pct: 0.21 },
        ],
        trend_90d: generateTrend90d(0.22),
      },
    ],
    top_return_reasons: [
      { reason: "fit", count: 103, pct: 0.545 },
      { reason: "size", count: 42, pct: 0.222 },
      { reason: "quality", count: 36, pct: 0.190 },
      { reason: "color", count: 26, pct: 0.138 },
    ],
    trend_90d: generateTrend90d(0.35),
  },
  {
    seller_id: "s3",
    seller_name: "SocksMaster",
    tier: "Scale",
    monthly_gmv: 450000,
    return_rate: 0.18,
    return_count: 567,
    order_count: 3150,
    health_score: 78,
    skus: [
      {
        sku_id: "so1",
        product_name: "Wool Blend Socks",
        category: "Socks",
        return_rate: 0.14,
        return_count: 210,
        order_count: 1500,
        margin_per_unit: 12,
        total_loss_pln: 3360,
        top_reason: "quality",
        reason_breakdown: [
          { reason: "quality", count: 147, pct: 0.7 },
          { reason: "fit", count: 63, pct: 0.3 },
        ],
        trend_90d: generateTrend90d(0.14),
      },
      {
        sku_id: "so2",
        product_name: "Cotton Comfort Socks",
        category: "Socks",
        return_rate: 0.1,
        return_count: 150,
        order_count: 1500,
        margin_per_unit: 10,
        total_loss_pln: 1800,
        top_reason: "fit",
        reason_breakdown: [
          { reason: "fit", count: 150, pct: 1.0 },
        ],
        trend_90d: generateTrend90d(0.1),
      },
      {
        sku_id: "so3",
        product_name: "Athletic Performance",
        category: "Socks",
        return_rate: 0.22,
        return_count: 132,
        order_count: 600,
        margin_per_unit: 14,
        total_loss_pln: 2200,
        top_reason: "size",
        reason_breakdown: [
          { reason: "size", count: 132, pct: 1.0 },
        ],
        trend_90d: generateTrend90d(0.22),
      },
      {
        sku_id: "so4",
        product_name: "Bamboo Eco Socks",
        category: "Socks",
        return_rate: 0.16,
        return_count: 75,
        order_count: 469,
        margin_per_unit: 13,
        total_loss_pln: 1200,
        top_reason: "quality",
        reason_breakdown: [
          { reason: "quality", count: 75, pct: 1.0 },
        ],
        trend_90d: generateTrend90d(0.16),
      },
    ],
    top_return_reasons: [
      { reason: "quality", count: 222, pct: 0.392 },
      { reason: "fit", count: 213, pct: 0.376 },
      { reason: "size", count: 132, pct: 0.233 },
    ],
    trend_90d: generateTrend90d(0.18),
  },
];

export function getSellerAnalytics(sellerId: string): SellerAnalytics | null {
  return mockSellers.find((s) => s.seller_id === sellerId) || null;
}

export function calculateHealthScore(seller: SellerAnalytics) {
  // return_rate: 40%, support_tickets: 30% (mock), review_rating: 20% (mock), repeat_rate: 10% (mock)
  const returnRateScore = Math.max(0, 100 - seller.return_rate * 200); // 0% = 100, 50% = 0
  const supportScore = 85; // mock
  const reviewScore = 88; // mock
  const repeatScore = 75; // mock

  const score =
    returnRateScore * 0.4 + supportScore * 0.3 + reviewScore * 0.2 + repeatScore * 0.1;

  return {
    score: Math.round(score),
    breakdown: {
      return_rate: returnRateScore,
      support_tickets: supportScore,
      review_rating: reviewScore,
      repeat_rate: repeatScore,
    },
    color:
      score > 70 ? "green" : score >= 50 ? "yellow" : "red",
  };
}
