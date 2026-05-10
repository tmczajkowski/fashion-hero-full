import { HeroSection } from "@/components/seller-dashboard/HeroSection";
import { BenefitsList } from "@/components/seller-dashboard/BenefitsList";
import { MockDashboardPreview } from "@/components/seller-dashboard/MockDashboardPreview";
import { PricingCards } from "@/components/seller-dashboard/PricingCards";
import { SignupForm } from "@/components/seller-dashboard/SignupForm";

export const metadata = {
  title: "Seller Dashboard Early Access | FashionHero",
  description: "Odkryj które SKU tracą Ci pieniądze. Dashboard dla seller'ów FashionHero.",
};

export default function SellerDashboardEarlyAccess() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <BenefitsList />
      <MockDashboardPreview />
      <PricingCards />
      <SignupForm />
    </main>
  );
}
