export interface Seller {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  joinedYear: number;
  rating: number;
  /**
   * FashionHero Verified — Stream B (Hipoteza 3 + AT-2A Conditional Floor).
   * Sprzedawcy z niskim return rate / wysokim NCM dostają widoczny badge dla kupującego.
   */
  verified?: boolean;
}
