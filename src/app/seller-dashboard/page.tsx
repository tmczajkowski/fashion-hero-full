"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/seller-dashboard/DashboardLayout";
import { Header } from "@/components/seller-dashboard/Header";
import { HealthScoreCard } from "@/components/seller-dashboard/HealthScoreCard";
import { QuickStats } from "@/components/seller-dashboard/QuickStats";
import { ReturnsHeatmap } from "@/components/seller-dashboard/ReturnsHeatmap";
import { ReturnsBarChart } from "@/components/charts/ReturnsBarChart";
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
              <QuickStats seller={seller} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ReturnsHeatmap skus={seller.skus} />
              </div>
              <div className="lg:col-span-1">
                <ReturnsBarChart skus={seller.skus} metric="loss_pln" />
              </div>
            </div>
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
    <DashboardLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      header={<Header seller={seller} healthScore={healthScore} />}
    >
      {renderContent()}
    </DashboardLayout>
  );
}
