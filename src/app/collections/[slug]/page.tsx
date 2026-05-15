import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCollection } from "@/data/collections";
import { collections } from "@/data/collections";
import { getProductsByCollection } from "@/data/products";
import { CollectionHero } from "@/components/collection-hero";
import { CollectionView } from "@/components/collection-view";
import type { Collection } from "@/types";
import {
  allPromoCollectionSlugs,
  getCampaignByTag,
  getProductsForPromoCollection,
  promoTagFromSlug,
} from "@/data/promotions";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ seller?: string }>;
}

export async function generateStaticParams() {
  return [
    ...collections.map((c) => ({ slug: c.slug })),
    ...allPromoCollectionSlugs().map((slug) => ({ slug })),
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const promoTag = promoTagFromSlug(slug);
  if (promoTag) {
    const camp = getCampaignByTag(promoTag);
    if (!camp) {
      return { title: "Collection Not Found" };
    }
    return {
      title: `${camp.label} | Women's | FashionHero`,
      description: `Curated women's selection — ${camp.label}.`,
    };
  }

  const collection = getCollection(slug);

  if (!collection) {
    return { title: "Collection Not Found" };
  }

  return {
    title: `${collection.name} | FashionHero`,
    description: collection.description,
  };
}

function promoCollectionOverlay(slug: string, label: string): Collection {
  const base = getCollection("womens");
  return {
    id: slug,
    name: label,
    slug,
    description: `Women's pilot — curated campaign ${label}.`,
    heroImage: base?.heroImage ?? "/images/hero/collection-hero-2.jpg",
  };
}

export default async function CollectionPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { seller } = await searchParams;

  const promoTag = promoTagFromSlug(slug);
  if (promoTag) {
    const camp = getCampaignByTag(promoTag);
    if (!camp) {
      notFound();
    }
    const products = getProductsForPromoCollection(promoTag);
    const collection = promoCollectionOverlay(slug, camp.label);
    return (
      <>
        <CollectionHero collection={collection} />
        <CollectionView
          products={products}
          collectionName={collection.name}
          collectionSlug={slug}
          initialSellerSlug={seller}
          suppressProductBadges
        />
      </>
    );
  }

  const collection = getCollection(slug);

  if (!collection) {
    notFound();
  }

  const products = getProductsByCollection(slug);

  return (
    <>
      <CollectionHero collection={collection} />
      <CollectionView
        products={products}
        collectionName={collection.name}
        collectionSlug={slug}
        initialSellerSlug={seller}
      />
    </>
  );
}
