import { NextRequest, NextResponse } from "next/server";
import { getSellerAnalytics } from "@/data/mock-analytics";
import { getRecommendations } from "@/data/mock-recommendations";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ seller_id: string; sku_id: string }> }
) {
  try {
    const { seller_id, sku_id } = await params;

    if (!seller_id || !sku_id) {
      return NextResponse.json(
        { success: false, message: "seller_id and sku_id required" },
        { status: 400 }
      );
    }

    const seller = getSellerAnalytics(seller_id);

    if (!seller) {
      return NextResponse.json(
        { success: false, message: "Seller not found" },
        { status: 404 }
      );
    }

    const sku = seller.skus.find((s) => s.sku_id === sku_id);

    if (!sku) {
      return NextResponse.json(
        { success: false, message: "SKU not found" },
        { status: 404 }
      );
    }

    const recommendations = getRecommendations(sku.reason_breakdown);

    return NextResponse.json({
      success: true,
      data: {
        sku_id: sku.sku_id,
        product_name: sku.product_name,
        category: sku.category,
        return_rate: sku.return_rate,
        return_count: sku.return_count,
        order_count: sku.order_count,
        total_loss_pln: sku.total_loss_pln,
        margin_per_unit: sku.margin_per_unit,
        reason_breakdown: sku.reason_breakdown,
        trend_90d: sku.trend_90d,
        recommendations,
        top_reason: sku.top_reason,
      },
    });
  } catch (error) {
    console.error("Deep dive error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
