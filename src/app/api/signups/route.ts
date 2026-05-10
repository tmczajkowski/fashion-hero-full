import { NextRequest, NextResponse } from "next/server";
import { addSignup } from "@/data/seller-signups";

interface SignupRequest {
  sellerId: string;
  email: string;
  monthlyGmv: number;
  currentReturnRate: number;
  pricingTier: string;
  utmSource?: string;
  utmCampaign?: string;
  utmContent?: string;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateRequest(body: SignupRequest): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!body.sellerId?.trim()) {
    errors.sellerId = "Wymagane pole";
  }

  if (!body.email?.trim()) {
    errors.email = "Wymagane pole";
  } else if (!validateEmail(body.email)) {
    errors.email = "Nieprawidłowy adres email";
  }

  if (!body.monthlyGmv || body.monthlyGmv <= 0) {
    errors.monthlyGmv = "Wymagane pole (liczba > 0)";
  }

  if (body.currentReturnRate === undefined || body.currentReturnRate === null || body.currentReturnRate < 0 || body.currentReturnRate > 100) {
    errors.currentReturnRate = "Wymagane pole (0-100%)";
  }

  if (!body.pricingTier || !["99", "199", "299"].includes(body.pricingTier)) {
    errors.pricingTier = "Wymagane pole";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: SignupRequest = await request.json();

    const validation = validateRequest(body);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          message: "Błędy w formularzu",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    const urlSearchParams = new URLSearchParams(request.nextUrl.search);
    const signup = addSignup({
      sellerId: body.sellerId,
      email: body.email,
      monthlyGmv: body.monthlyGmv,
      currentReturnRate: body.currentReturnRate,
      pricingTier: body.pricingTier as "99" | "199" | "299",
      utmSource: body.utmSource || urlSearchParams.get("utm_source") || undefined,
      utmCampaign: body.utmCampaign || urlSearchParams.get("utm_campaign") || undefined,
      utmContent: body.utmContent || urlSearchParams.get("utm_content") || undefined,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Dziękujemy! Wkrótce się skontaktujemy.",
        data: signup,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Błąd serwera",
        errors: { server: "Internal server error" },
      },
      { status: 500 }
    );
  }
}
