import { NextRequest, NextResponse } from "next/server";
import { getSellerAnalytics, calculateHealthScore } from "@/data/mock-analytics";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ seller_id: string }> }
) {
  try {
    const { seller_id } = await params;

    if (!seller_id) {
      return NextResponse.json(
        { success: false, message: "seller_id required" },
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

    const healthScore = calculateHealthScore(seller);

    return NextResponse.json({
      success: true,
      data: {
        ...seller,
        health_score_data: healthScore,
      },
    });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
