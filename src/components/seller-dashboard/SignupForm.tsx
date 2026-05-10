"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitSignup } from "@/lib/api";
import { Card } from "@/components/ui/card";

const signupSchema = z.object({
  sellerId: z.string().min(1, "Wymagane pole"),
  email: z.string().email("Nieprawidłowy adres email"),
  monthlyGmv: z.coerce.number().min(1, "Wymagane pole (liczba > 0)"),
  currentReturnRate: z.coerce
    .number()
    .min(0, "Liczba musi być >= 0")
    .max(100, "Liczba musi być <= 100"),
  pricingTier: z.enum(["99", "199", "299"], {
    errorMap: () => ({ message: "Wymagane pole" }),
  }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export function SignupForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const selectedTier = watch("pricingTier");

  const onSubmit = async (data: SignupFormValues) => {
    setIsSubmitting(true);
    setSuccessMessage("");

    const response = await submitSignup({
      sellerId: data.sellerId,
      email: data.email,
      monthlyGmv: data.monthlyGmv,
      currentReturnRate: data.currentReturnRate,
      pricingTier: data.pricingTier,
    });

    if (response.success) {
      setSuccessMessage(response.message);
      reset();
      setTimeout(() => setSuccessMessage(""), 5000);
    }

    setIsSubmitting(false);
  };

  return (
    <section className="w-full py-12 md:py-16 bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8 md:p-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Zainteresowany?
          </h2>

          {successMessage && (
            <div className="mb-6 p-4 bg-teal-50 border border-teal-200 rounded-lg">
              <p className="text-teal-800 font-medium">{successMessage}</p>
            </div>
          )}

          <form id="signup-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Seller ID */}
            <div>
              <label htmlFor="sellerId" className="block text-sm font-semibold text-slate-900 mb-2">
                Seller ID
              </label>
              <input
                id="sellerId"
                type="text"
                placeholder="np. SELLER_12345"
                {...register("sellerId")}
                className={`w-full px-4 py-2 rounded-lg border-2 transition-colors focus:outline-none ${
                  errors.sellerId
                    ? "border-red-500 focus:border-red-500 bg-red-50"
                    : "border-slate-200 focus:border-teal-600 bg-white"
                }`}
              />
              {errors.sellerId && (
                <p className="text-red-600 text-sm mt-1">{errors.sellerId.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="ty@example.com"
                {...register("email")}
                className={`w-full px-4 py-2 rounded-lg border-2 transition-colors focus:outline-none ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 bg-red-50"
                    : "border-slate-200 focus:border-teal-600 bg-white"
                }`}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Monthly GMV */}
            <div>
              <label htmlFor="monthlyGmv" className="block text-sm font-semibold text-slate-900 mb-2">
                Miesięczny GMV (PLN)
              </label>
              <input
                id="monthlyGmv"
                type="number"
                placeholder="50000"
                {...register("monthlyGmv")}
                className={`w-full px-4 py-2 rounded-lg border-2 transition-colors focus:outline-none ${
                  errors.monthlyGmv
                    ? "border-red-500 focus:border-red-500 bg-red-50"
                    : "border-slate-200 focus:border-teal-600 bg-white"
                }`}
              />
              {errors.monthlyGmv && (
                <p className="text-red-600 text-sm mt-1">{errors.monthlyGmv.message}</p>
              )}
            </div>

            {/* Return Rate */}
            <div>
              <label htmlFor="currentReturnRate" className="block text-sm font-semibold text-slate-900 mb-2">
                Aktualna stopa zwrotów (%)
              </label>
              <input
                id="currentReturnRate"
                type="number"
                placeholder="38"
                step="0.1"
                {...register("currentReturnRate")}
                className={`w-full px-4 py-2 rounded-lg border-2 transition-colors focus:outline-none ${
                  errors.currentReturnRate
                    ? "border-red-500 focus:border-red-500 bg-red-50"
                    : "border-slate-200 focus:border-teal-600 bg-white"
                }`}
              />
              {errors.currentReturnRate && (
                <p className="text-red-600 text-sm mt-1">{errors.currentReturnRate.message}</p>
              )}
            </div>

            {/* Pricing Tier */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Wybierz tier
              </label>
              <div className="space-y-3">
                {["99", "199", "299"].map((tier) => (
                  <label key={tier} className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors"
                    style={{
                      borderColor: selectedTier === tier ? '#14b8a6' : '#e2e8f0',
                      backgroundColor: selectedTier === tier ? '#f0fdfa' : '#ffffff'
                    }}
                  >
                    <input
                      type="radio"
                      value={tier}
                      {...register("pricingTier")}
                      className="w-4 h-4"
                    />
                    <span className="ml-3 text-slate-900 font-medium">{tier} PLN/miesiąc</span>
                  </label>
                ))}
              </div>
              {errors.pricingTier && (
                <p className="text-red-600 text-sm mt-2">{errors.pricingTier.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
            >
              {isSubmitting ? "Wysyłanie..." : "Dołącz do early access"}
            </button>

            <p className="text-xs text-slate-500 text-center">
              Twoje dane będą bezpieczne. Nie będziemy ich sprzedawać ani spam'ować.
            </p>
          </form>
        </Card>
      </div>
    </section>
  );
}
