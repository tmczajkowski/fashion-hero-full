"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/seller-dashboard/DashboardLayout";
import { HealthScoreCard } from "@/components/seller-dashboard/HealthScoreCard";
import { ReturnsHeatmap } from "@/components/seller-dashboard/ReturnsHeatmap";
import { SellerAnalytics, HealthScoreData } from "@/types/analytics";

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("analytics");
  const [seller, setSeller] = useState<SellerAnalytics | null>(null);
  const [healthScore, setHealthScore] = useState<HealthScoreData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sellerId = localStorage.getItem("seller_id") || "s1";

    fetch(`/api/seller/${sellerId}/analytics`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSeller(data.data);
          setHealthScore(data.data.health_score_data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Ładowanie...</p>
          </div>
        </div>
      );
    }

    if (!seller || !healthScore) {
      return (
        <div className="text-center text-slate-600">
          <p>Nie znaleziono danych sprzedawcy</p>
        </div>
      );
    }

    switch (activeTab) {
      case "analytics":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <HealthScoreCard data={healthScore} />
              <div className="bg-white rounded-lg p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-6">
                  Quick Stats
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-600">Miesięczny GMV</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {seller.monthly_gmv.toLocaleString("pl-PL")} zł
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Stopa zwrotów</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {(seller.return_rate * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Total Loss (30d)</p>
                    <p className="text-2xl font-bold text-red-600">
                      {seller.skus
                        .reduce((sum, sku) => sum + sku.total_loss_pln, 0)
                        .toLocaleString("pl-PL")}{" "}
                      zł
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <ReturnsHeatmap skus={seller.skus} />
          </div>
        );

      case "deep-dive":
        return (
          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <p className="text-slate-600">Deep Dive tab — coming soon</p>
          </div>
        );

      case "diagnostics":
        return (
          <div className="bg-white rounded-lg p-6 border border-slate-200">
            {seller.tier === "Start" ? (
              <div className="text-center py-12">
                <p className="text-slate-900 font-semibold mb-2">
                  Zaktualizuj na Growth
                </p>
                <p className="text-slate-600 text-sm">
                  Narzędzia diagnostyczne są dostępne dla planów Growth i Scale
                </p>
              </div>
            ) : (
              <p className="text-slate-600">Diagnostics tab — coming soon</p>
            )}
          </div>
        );

      case "actions":
        return (
          <div className="bg-white rounded-lg p-6 border border-slate-200">
            {seller.tier === "Start" ? (
              <div className="text-center py-12">
                <p className="text-slate-900 font-semibold mb-2">
                  Zaktualizuj na Growth
                </p>
                <p className="text-slate-600 text-sm">
                  Narzędzia działań są dostępne dla planów Growth i Scale
                </p>
              </div>
            ) : (
              <p className="text-slate-600">Actions tab — coming soon</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </DashboardLayout>
  );
}
