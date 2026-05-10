import { SellerSignup } from "@/types";

interface SignupPayload {
  sellerId: string;
  email: string;
  monthlyGmv: number;
  currentReturnRate: number;
  pricingTier: "99" | "199" | "299";
  utmSource?: string;
  utmCampaign?: string;
  utmContent?: string;
}

interface SignupResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
  data?: SellerSignup;
}

export async function submitSignup(payload: SignupPayload): Promise<SignupResponse> {
  try {
    const response = await fetch("/api/signups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: "Błąd sieci. Spróbuj ponownie.",
      errors: { submit: "Network error" },
    };
  }
}
