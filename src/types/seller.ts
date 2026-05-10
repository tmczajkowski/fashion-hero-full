export interface Seller {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  joinedYear: number;
  rating: number;
}

export interface SellerSignup {
  id: string;
  sellerId: string;
  email: string;
  monthlyGmv: number;
  currentReturnRate: number;
  pricingTier: "99" | "199" | "299";
  utmSource?: string;
  utmCampaign?: string;
  utmContent?: string;
  createdAt: string;
}
