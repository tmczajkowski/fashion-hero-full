import { SellerSignup } from "@/types";

const signups: SellerSignup[] = [];

export function addSignup(signup: Omit<SellerSignup, "id" | "createdAt">): SellerSignup {
  const newSignup: SellerSignup = {
    ...signup,
    id: `signup_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
  };
  signups.push(newSignup);
  return newSignup;
}

export function getSignups(): SellerSignup[] {
  return [...signups];
}
