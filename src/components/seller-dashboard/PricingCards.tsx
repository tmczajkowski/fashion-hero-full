"use client";

import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const pricingTiers = [
  {
    id: "99",
    price: 99,
    name: "Starter",
    description: "Aby zacząć",
    features: ["Heatmap zwrotów", "Audyt Opisu produktu"],
    popular: false,
  },
  {
    id: "199",
    price: 199,
    name: "Pro",
    description: "Dla rosnącego biznesu",
    features: [
      "Wszystko z Starter",
      "Photo Quality Analysis",
      "20% rabat na studio pro-photo",
    ],
    popular: true,
  },
  {
    id: "299",
    price: 299,
    name: "Enterprise",
    description: "Dla ambitnych seller'ów",
    features: [
      "Wszystko z Pro",
      "Coaching 1:1",
      "40% rabat na studio pro-photo",
    ],
    popular: false,
  },
];

export function PricingCards() {
  return (
    <section className="w-full py-12 md:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
          Wybierz, który plan do Ciebie pasuje
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className={cn(
                "relative",
                tier.popular && "md:scale-105"
              )}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-teal-600 text-white px-4 py-1 rounded-full text-sm font-semibold z-10">
                  POPULARNE
                </div>
              )}

              <Card
                className={cn(
                  "p-8 flex flex-col h-full",
                  tier.popular && "border-teal-600 border-2 shadow-lg"
                )}
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">{tier.description}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-slate-900">
                      {tier.price}
                    </span>
                    <span className="text-slate-600">PLN/miesiąc</span>
                  </div>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex gap-2 items-start text-sm">
                      <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    const form = document.getElementById("signup-form");
                    if (form) {
                      const tierInput = form.querySelector(
                        'input[name="pricingTier"]'
                      ) as HTMLInputElement;
                      if (tierInput) {
                        tierInput.value = tier.id;
                        form.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }}
                  className={cn(
                    "w-full py-2.5 px-4 rounded-lg font-semibold transition-colors",
                    tier.popular
                      ? "bg-teal-600 text-white hover:bg-teal-700"
                      : "bg-slate-200 text-slate-900 hover:bg-slate-300"
                  )}
                >
                  Wybierz plan
                </button>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
