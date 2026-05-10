import { Card } from "@/components/ui/card";
import { Grid3X3, Plus, Download } from "lucide-react";

const sampleSizeChart = [
  { size: "XS", chest: "32-34", waist: "24-26", length: "24" },
  { size: "S", chest: "34-36", waist: "26-28", length: "25" },
  { size: "M", chest: "36-38", waist: "28-30", length: "26" },
  { size: "L", chest: "38-40", waist: "30-32", length: "27" },
  { size: "XL", chest: "40-42", waist: "32-34", length: "28" },
];

export function FitTableGenerator() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Size Chart Builder
            </h3>
            <p className="text-sm text-slate-600">
              Create a professional size chart that reduces returns by 18-22%
            </p>
          </div>
          <Grid3X3 className="w-8 h-8 text-teal-600 flex-shrink-0" />
        </div>

        <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-teal-900">
            <strong>Sellers with size charts:</strong> 18% fewer return rates on
            sizing issues, 24% higher conversion rate
          </p>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Quick Start Template
        </h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-slate-300">
                <th className="px-4 py-3 text-left font-semibold text-slate-900">
                  Size
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900">
                  Chest (in)
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900">
                  Waist (in)
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900">
                  Length (in)
                </th>
              </tr>
            </thead>
            <tbody>
              {sampleSizeChart.map((row, idx) => (
                <tr
                  key={row.size}
                  className={idx % 2 === 0 ? "bg-slate-50" : ""}
                >
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {row.size}
                  </td>
                  <td className="px-4 py-3 text-slate-700">{row.chest}</td>
                  <td className="px-4 py-3 text-slate-700">{row.waist}</td>
                  <td className="px-4 py-3 text-slate-700">{row.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-900 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium">
            <Download className="w-4 h-4" />
            Download as CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium">
            <Plus className="w-4 h-4" />
            Customize This Template
          </button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          3 Steps to Your First Size Chart
        </h3>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-teal-600 text-white font-bold">
                1
              </div>
            </div>
            <div>
              <h4 className="font-medium text-slate-900 mb-1">
                Measure your sample
              </h4>
              <p className="text-sm text-slate-600">
                Take accurate measurements of a physical garment across all
                sizes you offer
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-teal-600 text-white font-bold">
                2
              </div>
            </div>
            <div>
              <h4 className="font-medium text-slate-900 mb-1">
                Fill in the template
              </h4>
              <p className="text-sm text-slate-600">
                Use the template above or customize with your own measurements
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-teal-600 text-white font-bold">
                3
              </div>
            </div>
            <div>
              <h4 className="font-medium text-slate-900 mb-1">
                Add to your listings
              </h4>
              <p className="text-sm text-slate-600">
                Upload to your product page or include in product descriptions
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-3">
          Pro Tips from Top Sellers
        </h3>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Include fit notes: &quot;runs small&quot; or &quot;relaxed fit&quot; alongside measurements</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Use inches AND centimeters for international buyers</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Add a fit image showing where each measurement is taken</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Update your chart whenever you change suppliers or styles</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
