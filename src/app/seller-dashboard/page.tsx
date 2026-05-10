"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/seller-dashboard/DashboardLayout";
import { Header } from "@/components/seller-dashboard/Header";
import { HealthScoreCard } from "@/components/seller-dashboard/HealthScoreCard";
import { QuickStats } from "@/components/seller-dashboard/QuickStats";
import { ReturnsHeatmap } from "@/components/seller-dashboard/ReturnsHeatmap";
import { ReturnsBarChart } from "@/components/charts/ReturnsBarChart";
import { SKUSelector } from "@/components/seller-dashboard/SKUSelector";
import { SKUDeepDiveCard } from "@/components/seller-dashboard/SKUDeepDiveCard";
import { TierGate } from "@/components/seller-dashboard/TierGate";
import { FitCopyAudit } from "@/components/seller-dashboard/FitCopyAudit";
import { PhotoQualityScorer } from "@/components/seller-dashboard/PhotoQualityScorer";
import { FitTableGenerator } from "@/components/seller-dashboard/FitTableGenerator";
import { ProPhotoBooking } from "@/components/seller-dashboard/ProPhotoBooking";
import { Recommendation } from "@/data/mock-recommendations";
import { SellerAnalytics, HealthScoreData, SKUPerformance } from "@/types/analytics";

interface DeepDiveData {
  sku_id: string;
  product_name: string;
  category: string;
  return_rate: number;
  return_count: number;
  order_count: number;
  total_loss_pln: number;
  reason_breakdown: any[];
  trend_90d: any[];
  recommendations: Recommendation[];
  top_reason: string;
}

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("analytics");
  const [seller, setSeller] = useState<SellerAnalytics | null>(null);
  const [healthScore, setHealthScore] = useState<HealthScoreData | null>(null);
  const [loading, setLoading] = useState(true);

  // Deep Dive tab state
  const [selectedSku, setSelectedSku] = useState<SKUPerformance | null>(null);
  const [deepDiveData, setDeepDiveData] = useState<DeepDiveData | null>(null);
  const [deepDiveLoading, setDeepDiveLoading] = useState(false);
  const [deepDiveError, setDeepDiveError] = useState<string | null>(null);

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

  const handleSkuSelect = async (sku: SKUPerformance) => {
    setSelectedSku(sku);
    setDeepDiveLoading(true);
    setDeepDiveError(null);

    try {
      const sellerId = localStorage.getItem("seller_id") || "s1";
      const response = await fetch(
        `/api/seller/${sellerId}/sku/${sku.sku_id}/deep-dive`
      );
      const data = await response.json();

      if (data.success) {
        setDeepDiveData(data.data);
      } else {
        setDeepDiveError(data.message || "Failed to load SKU details");
      }
    } catch (error) {
      setDeepDiveError("Error loading SKU details");
      console.error(error);
    } finally {
      setDeepDiveLoading(false);
    }
  };

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
        if (!seller) return null;
        return (
          <div className="space-y-6">
            <SKUSelector
              skus={seller.skus}
              selectedSku={selectedSku}
              onSelect={handleSkuSelect}
            />

            {deepDiveLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
                  <p className="text-slate-600">Loading SKU details...</p>
                </div>
              </div>
            )}

            {deepDiveError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">{deepDiveError}</p>
              </div>
            )}

            {deepDiveData && !deepDiveLoading && (
              <SKUDeepDiveCard
                sku={deepDiveData as any}
                recommendations={deepDiveData.recommendations}
              />
            )}

            {!selectedSku && !deepDiveLoading && (
              <div className="bg-slate-50 rounded-lg p-8 text-center border-2 border-dashed border-slate-300">
                <p className="text-slate-600">
                  Select a SKU above to view detailed analysis
                </p>
              </div>
            )}
          </div>
        );

      case "diagnostics":
        return (
          <div className="space-y-6">
            <TierGate seller={seller} requiredTier="Growth">
              <div className="space-y-6">
                <FitCopyAudit />
                <TierGate seller={seller} requiredTier="Scale">
                  <PhotoQualityScorer />
                </TierGate>
              </div>
            </TierGate>
          </div>
        );

      case "actions":
        return (
          <div className="space-y-6">
            <TierGate seller={seller} requiredTier="Growth">
              <div className="space-y-6">
                <FitTableGenerator />
                <ProPhotoBooking />
              </div>
            </TierGate>
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
