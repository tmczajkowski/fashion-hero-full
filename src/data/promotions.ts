import type { Product } from "@/types";
import { products } from "@/data/products";

/** See docs/specs/promo/umbrella.md */
export type PromoTag = "polecane" | "best-seller" | "nowosc" | "users-pick";

export const PROMO_LABEL: Record<PromoTag, string> = {
  polecane: "WYBÓR FH",
  "best-seller": "ULUBIONE",
  nowosc: "PREMIERA",
  "users-pick": "WYBÓR KLIENTÓW",
};

export interface PromoCampaign {
  id: string;
  tag: PromoTag;
  label: string;
  category: string | "global";
  pricingModel: "fixed-daily" | "dynamic-auction";
  pricePerDay: number;
  maxSlots: number;
  active: boolean;
}

export interface PromoAssignment {
  productId: string;
  campaignId: string;
  sellerId: string;
  startDate: string;
  endDate: string;
}

export const promoCampaigns: PromoCampaign[] = [
  {
    id: "camp-ulubione",
    tag: "best-seller",
    label: PROMO_LABEL["best-seller"],
    category: "womens",
    pricingModel: "fixed-daily",
    pricePerDay: 29,
    maxSlots: 50,
    active: true,
  },
  {
    id: "camp-wybor-fh",
    tag: "polecane",
    label: PROMO_LABEL.polecane,
    category: "womens",
    pricingModel: "fixed-daily",
    pricePerDay: 24,
    maxSlots: 50,
    active: true,
  },
  {
    id: "camp-premiera",
    tag: "nowosc",
    label: PROMO_LABEL.nowosc,
    category: "womens",
    pricingModel: "fixed-daily",
    pricePerDay: 19,
    maxSlots: 50,
    active: true,
  },
];

const windowStart = "2026-01-01";
const windowEnd = "2027-12-31";

/** 36 unique product IDs across pilot sellers (womens); one tag per product. */
const assignmentsByCampaign: Record<string, string[]> = {
  "camp-ulubione": [
    "2",
    "4",
    "11",
    "6",
    "85",
    "86",
    "87",
    "88",
    "18",
    "20",
    "73",
    "74",
  ],
  "camp-wybor-fh": [
    "16",
    "26",
    "28",
    "30",
    "89",
    "90",
    "92",
    "94",
    "21",
    "75",
    "76",
    "77",
  ],
  "camp-premiera": [
    "47",
    "48",
    "49",
    "50",
    "31",
    "32",
    "33",
    "101",
    "51",
    "110",
    "111",
    "112",
  ],
};

function sellerIdForProduct(productId: string): string | undefined {
  return products.find((p) => p.id === productId)?.sellerId;
}

export const promoAssignments: PromoAssignment[] = Object.entries(assignmentsByCampaign).flatMap(
  ([campaignId, ids]) =>
    ids.map((productId) => ({
      productId,
      campaignId,
      sellerId: sellerIdForProduct(productId) ?? "",
      startDate: windowStart,
      endDate: windowEnd,
    }))
);

export function promotionsSeedMinute(nowMs: number): number {
  return Math.floor(nowMs / 60_000);
}

export function mulberry32(seed: number): () => number {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function assignmentActive(a: PromoAssignment, nowMs: number): boolean {
  const start = Date.parse(a.startDate);
  const end = Date.parse(a.endDate);
  return nowMs >= start && nowMs <= end;
}

function campaignById(id: string): PromoCampaign | undefined {
  return promoCampaigns.find((c) => c.id === id);
}

export function activeAssignmentsForCategory(categorySlug: string, nowMs: number): PromoAssignment[] {
  return promoAssignments.filter((a) => {
    if (!assignmentActive(a, nowMs)) return false;
    const c = campaignById(a.campaignId);
    return c?.active && (c.category === categorySlug || c.category === "global");
  });
}

/** Active campaign for home carousel; rotates per minute over active womens campaigns. */
export function getCarouselCampaign(nowMs: number): PromoCampaign | undefined {
  const rng = mulberry32(promotionsSeedMinute(nowMs));
  const eligible = promoCampaigns.filter((c) => c.active && c.category === "womens");
  if (eligible.length === 0) return undefined;
  const idx = Math.floor(rng() * eligible.length);
  return eligible[idx];
}

/** Ordered product IDs for carousel: campaign assignments, seeded stable order; max countPerSeller per seller; cap `max`. */
export function getCarouselProductsForCampaign(
  campaignId: string,
  nowMs: number,
  options: { max: number; maxPerSeller: number }
): Product[] {
  const ids = assignmentsByCampaign[campaignId];
  if (!ids?.length) return [];

  const seed = promotionsSeedMinute(nowMs);
  const rng = mulberry32(seed ^ 0x9e3779b9);

  const scored = [...ids].map((id) => ({ id, s: rng() }));
  scored.sort((a, b) => a.s - b.s || a.id.localeCompare(b.id));

  const byId = new Map(products.map((p) => [p.id, p]));
  const out: Product[] = [];
  const perSeller = new Map<string, number>();

  for (const { id } of scored) {
    if (out.length >= options.max) break;
    const p = byId.get(id);
    if (!p) continue;
    const n = perSeller.get(p.sellerId) ?? 0;
    if (n >= options.maxPerSeller) continue;
    perSeller.set(p.sellerId, n + 1);
    out.push(p);
  }
  return out;
}

const PROMO_SLUG_PREFIX = "promo-";

export function promoTagFromSlug(slug: string): PromoTag | null {
  if (!slug.startsWith(PROMO_SLUG_PREFIX)) return null;
  const tail = slug.slice(PROMO_SLUG_PREFIX.length);
  switch (tail) {
    case "best-seller":
      return "best-seller";
    case "polecane":
      return "polecane";
    case "nowosc":
      return "nowosc";
    case "premiera":
      return "nowosc";
    case "users-pick":
      return "users-pick";
    default:
      return null;
  }
}

export function promoSlugForTag(tag: PromoTag): string {
  if (tag === "best-seller") return `${PROMO_SLUG_PREFIX}best-seller`;
  return `${PROMO_SLUG_PREFIX}${tag}`;
}

export function allPromoCollectionSlugs(): string[] {
  return promoCampaigns.filter((c) => c.active).map((c) => promoSlugForTag(c.tag));
}

export function getCampaignByTag(tag: PromoTag): PromoCampaign | undefined {
  return promoCampaigns.find((c) => c.tag === tag);
}

export function getProductsForPromoCollection(tag: PromoTag): Product[] {
  const camp = getCampaignByTag(tag);
  if (!camp) return [];
  const ids = assignmentsByCampaign[camp.id] ?? [];
  const byId = new Map(products.map((p) => [p.id, p]));
  return ids.map((id) => byId.get(id)).filter(Boolean) as Product[];
}

export type ListingRow = {
  product: Product;
  /** Promo label for mixed PLP; null = use organic only */
  promoBadgeLabel: string | null;
};

function pickThreeSlotIndices(rng: () => number): number[] {
  const pool = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const out: number[] = [];
  for (let k = 0; k < 3; k++) {
    const j = Math.floor(rng() * pool.length);
    out.push(pool[j]!);
    pool.splice(j, 1);
  }
  return out.sort((a, b) => a - b);
}

/**
 * Mixed Women's PLP: position 1 (index 0) never promo; 3 promo slots among indices 1–9;
 * max 2 promo placements per seller in top 12 (indices 0–11).
 */
export function mergeWomensListingWithPromo(
  filteredProducts: Product[],
  nowMs: number
): ListingRow[] {
  if (filteredProducts.length === 0) return [];

  const seed = promotionsSeedMinute(nowMs);
  const rngSlots = mulberry32(seed ^ 0x11111111);
  const rngCand = mulberry32(seed ^ 0x22222222);
  const promoSlotIndices = new Set(pickThreeSlotIndices(rngSlots));

  const active = activeAssignmentsForCategory("womens", nowMs);
  const promoLabelByProductId = new Map<string, string>();
  for (const a of active) {
    const c = campaignById(a.campaignId);
    if (c) promoLabelByProductId.set(a.productId, c.label);
  }

  const filteredIds = new Set(filteredProducts.map((p) => p.id));

  const candRaw = active
    .map((a) => products.find((p) => p.id === a.productId))
    .filter((p): p is Product => Boolean(p) && filteredIds.has(p!.id));

  const scoredCand = candRaw.map((p) => ({ p, s: rngCand() }));
  scoredCand.sort((a, b) => a.s - b.s || a.p.id.localeCompare(b.p.id));
  let pci = 0;

  const result: ListingRow[] = [];
  let oi = 0;
  const used = new Set<string>();
  const sellerPromoInTop12 = new Map<string, number>();

  const consumeNextOrganic = (): Product | null => {
    while (oi < filteredProducts.length) {
      const p = filteredProducts[oi++];
      if (used.has(p.id)) continue;
      return p;
    }
    return null;
  };

  const canAddPromoSeller = (sellerId: string): boolean => {
    if (result.length >= 12) return true;
    return (sellerPromoInTop12.get(sellerId) ?? 0) < 2;
  };

  const takePromoForSlot = (): Product | null => {
    while (pci < scoredCand.length) {
      const p = scoredCand[pci++]!.p;
      if (used.has(p.id)) continue;
      if (!canAddPromoSeller(p.sellerId)) continue;
      return p;
    }
    return null;
  };

  for (let i = 0; i < filteredProducts.length; i++) {
    const usePromoSlot = i < 10 && i !== 0 && promoSlotIndices.has(i);

    if (usePromoSlot) {
      const p = takePromoForSlot();
      if (p) {
        used.add(p.id);
        if (result.length < 12) {
          sellerPromoInTop12.set(p.sellerId, (sellerPromoInTop12.get(p.sellerId) ?? 0) + 1);
        }
        const label = promoLabelByProductId.get(p.id) ?? PROMO_LABEL["best-seller"];
        result.push({ product: p, promoBadgeLabel: label });
        continue;
      }
    }

    const p = consumeNextOrganic();
    if (!p) break;
    used.add(p.id);
    const pl = promoLabelByProductId.get(p.id);
    result.push({ product: p, promoBadgeLabel: pl ?? null });
  }

  return result;
}
