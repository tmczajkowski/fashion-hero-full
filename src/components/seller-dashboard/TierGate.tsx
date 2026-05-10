import { SellerAnalytics } from "@/types/analytics";
import { Lock } from "lucide-react";

interface TierGateProps {
  seller: SellerAnalytics | null;
  requiredTier: "Start" | "Growth" | "Scale";
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const tierHierarchy: Record<string, number> = {
  Start: 0,
  Growth: 1,
  Scale: 2,
};

export function TierGate({
  seller,
  requiredTier,
  children,
  fallback,
}: TierGateProps) {
  if (!seller) {
    return (
      <div className="bg-slate-50 rounded-lg p-8 text-center border border-slate-200">
        <p className="text-slate-600">Loading seller information...</p>
      </div>
    );
  }

  const hasAccess =
    tierHierarchy[seller.tier] >= tierHierarchy[requiredTier];

  if (!hasAccess) {
    return (
      fallback || (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-8 text-center border border-slate-200">
          <Lock className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-900 font-semibold mb-2">
            Dostępne w planie {requiredTier}
          </p>
          <p className="text-slate-600 text-sm mb-4">
            Zaktualizuj swój plan, aby uzyskać dostęp do tego narzędzia
          </p>
          <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium">
            Upgrade Plan
          </button>
        </div>
      )
    );
  }

  return <>{children}</>;
}
