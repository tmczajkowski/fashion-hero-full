import { Card } from "@/components/ui/card";
import { Camera, Star, Clock, DollarSign, ArrowRight } from "lucide-react";

const packages = [
  {
    name: "Starter Pack",
    description: "Perfect for new sellers",
    features: [
      "10 product photos",
      "Basic editing",
      "Flat lay only",
      "1 business day turnaround",
    ],
    price: "199 zł",
    recommended: false,
  },
  {
    name: "Professional Pack",
    description: "Most popular choice",
    features: [
      "25 product photos",
      "Advanced editing",
      "Flat lay + on-model",
      "Same-day turnaround",
      "Lifestyle images",
    ],
    price: "499 zł",
    recommended: true,
  },
  {
    name: "Premium Pack",
    description: "For serious sellers",
    features: [
      "50+ product photos",
      "Professional editing",
      "All angles + on-model",
      "Same-day turnaround",
      "Video reels included",
      "Styling consultation",
    ],
    price: "999 zł",
    recommended: false,
  },
];

export function ProPhotoBooking() {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Professional Photo Sessions
            </h3>
            <p className="text-sm text-slate-600">
              Book a professional photographer to showcase your products
            </p>
          </div>
          <Camera className="w-8 h-8 text-amber-600 flex-shrink-0" />
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span className="text-slate-900">
            <strong>4.8/5</strong> from 340+ sellers who booked
          </span>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {packages.map((pkg) => (
          <Card
            key={pkg.name}
            className={`p-6 relative ${
              pkg.recommended ? "border-2 border-teal-600 bg-teal-50" : ""
            }`}
          >
            {pkg.recommended && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  Recommended
                </span>
              </div>
            )}

            <div className="mb-6">
              <h4 className="text-lg font-bold text-slate-900 mb-1">
                {pkg.name}
              </h4>
              <p className="text-sm text-slate-600 mb-4">{pkg.description}</p>
              <div className="text-3xl font-bold text-slate-900">
                {pkg.price}
              </div>
            </div>

            <ul className="space-y-2 mb-6">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <span className="text-teal-600 font-bold mt-1">✓</span>
                  <span className="text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full px-4 py-2 rounded-lg font-medium transition-colors text-sm flex items-center justify-center gap-2 ${
                pkg.recommended
                  ? "bg-teal-600 text-white hover:bg-teal-700"
                  : "bg-slate-100 text-slate-900 hover:bg-slate-200"
              }`}
            >
              Book Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          What&apos;s Included
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex gap-3">
            <Clock className="w-5 h-5 text-teal-600 flex-shrink-0" />
            <div>
              <div className="font-medium text-slate-900">Fast Turnaround</div>
              <div className="text-sm text-slate-600">Same-day delivery</div>
            </div>
          </div>
          <div className="flex gap-3">
            <Camera className="w-5 h-5 text-teal-600 flex-shrink-0" />
            <div>
              <div className="font-medium text-slate-900">Professional Setup</div>
              <div className="text-sm text-slate-600">Studio quality equipment</div>
            </div>
          </div>
          <div className="flex gap-3">
            <Star className="w-5 h-5 text-teal-600 flex-shrink-0" />
            <div>
              <div className="font-medium text-slate-900">Expert Editing</div>
              <div className="text-sm text-slate-600">Color correction included</div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-slate-50 to-slate-100">
        <h3 className="text-lg font-semibold text-slate-900 mb-3">
          Recent Bookings
        </h3>
        <div className="space-y-3">
          <div className="p-3 bg-white rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium text-slate-900">Sarah&apos;s Eco Basics</div>
              <div className="text-sm text-slate-600">2 weeks ago</div>
            </div>
            <div className="flex items-center gap-1 text-sm text-slate-700">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>&quot;Photos exceeded expectations! Sales up 34%&quot;</span>
            </div>
          </div>

          <div className="p-3 bg-white rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium text-slate-900">
                Marcus Fashion Co.
              </div>
              <div className="text-sm text-slate-600">1 month ago</div>
            </div>
            <div className="flex items-center gap-1 text-sm text-slate-700">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>&quot;Professional and efficient. Highly recommend&quot;</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-2 border-teal-300 bg-teal-50">
        <div className="flex items-start gap-3">
          <Camera className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">
              Ready to Upgrade Your Photos?
            </h3>
            <p className="text-sm text-slate-700 mb-4">
              Professional photos are shown to have 24-35% higher conversion
              rates. Let&apos;s book a session today.
            </p>
            <a
              href="https://example.com/book-photos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium"
            >
              Open Booking Form
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}
