export interface SellerStats {
  sellerId: string;
  transactionCount: number;
  revenue: number;
  avgOrderValue: number;
  topCategory: string;
  trend: "up" | "down" | "flat";
  trendPercent: number;
}

// Mock stats for the last 30 days (April 2026)
export const sellerMonthlyStats: SellerStats[] = [
  {
    sellerId: "s1",
    transactionCount: 284,
    revenue: 87430,
    avgOrderValue: 308,
    topCategory: "Buty",
    trend: "up",
    trendPercent: 12,
  },
  {
    sellerId: "s2",
    transactionCount: 319,
    revenue: 104920,
    avgOrderValue: 329,
    topCategory: "Odzież",
    trend: "up",
    trendPercent: 8,
  },
  {
    sellerId: "s3",
    transactionCount: 196,
    revenue: 62150,
    avgOrderValue: 317,
    topCategory: "Buty",
    trend: "down",
    trendPercent: 4,
  },
  {
    sellerId: "s4",
    transactionCount: 412,
    revenue: 78340,
    avgOrderValue: 190,
    topCategory: "Odzież",
    trend: "up",
    trendPercent: 21,
  },
  {
    sellerId: "s5",
    transactionCount: 138,
    revenue: 93760,
    avgOrderValue: 679,
    topCategory: "Buty",
    trend: "flat",
    trendPercent: 1,
  },
  {
    sellerId: "s6",
    transactionCount: 271,
    revenue: 115200,
    avgOrderValue: 425,
    topCategory: "Odzież",
    trend: "up",
    trendPercent: 35,
  },
  {
    sellerId: "s7",
    transactionCount: 153,
    revenue: 48920,
    avgOrderValue: 320,
    topCategory: "Odzież",
    trend: "down",
    trendPercent: 7,
  },
  {
    sellerId: "s8",
    transactionCount: 64,
    revenue: 38400,
    avgOrderValue: 600,
    topCategory: "Akcesoria",
    trend: "up",
    trendPercent: 15,
  },
  {
    sellerId: "s9",
    transactionCount: 89,
    revenue: 21350,
    avgOrderValue: 240,
    topCategory: "Buty",
    trend: "down",
    trendPercent: 11,
  },
  {
    sellerId: "s10",
    transactionCount: 207,
    revenue: 39330,
    avgOrderValue: 190,
    topCategory: "Odzież",
    trend: "flat",
    trendPercent: 2,
  },
  {
    sellerId: "s11",
    transactionCount: 43,
    revenue: 12900,
    avgOrderValue: 300,
    topCategory: "Akcesoria",
    trend: "up",
    trendPercent: 44,
  },
  {
    sellerId: "s12",
    transactionCount: 11,
    revenue: 2860,
    avgOrderValue: 260,
    topCategory: "Odzież",
    trend: "up",
    trendPercent: 100,
  },
];

export function getSellerStats(sellerId: string): SellerStats | undefined {
  return sellerMonthlyStats.find((s) => s.sellerId === sellerId);
}
