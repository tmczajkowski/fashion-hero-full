import Link from "next/link";
import { getAllSellers } from "@/data/sellers";
import { sellerMonthlyStats } from "@/data/transactions";

function TrendBadge({ trend, percent }: { trend: "up" | "down" | "flat"; percent: number }) {
  if (trend === "up") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
        ↑ {percent}%
      </span>
    );
  }
  if (trend === "down") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-red-700 bg-red-50 px-2 py-0.5 rounded-full">
        ↓ {percent}%
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
      → {percent}%
    </span>
  );
}

export default function AdminPage() {
  const sellers = getAllSellers();

  const rows = sellers.map((seller) => {
    const stats = sellerMonthlyStats.find((s) => s.sellerId === seller.id);
    return { seller, stats };
  });

  const totalRevenue = rows.reduce((sum, r) => sum + (r.stats?.revenue ?? 0), 0);
  const totalTransactions = rows.reduce((sum, r) => sum + (r.stats?.transactionCount ?? 0), 0);
  const activeSellers = rows.filter((r) => (r.stats?.transactionCount ?? 0) > 0).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <Link href="/" className="hover:text-gray-900 transition-colors">
              FashionHero
            </Link>
            <span>/</span>
            <span className="text-gray-900">Panel administratora</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Panel administratora</h1>
          <p className="text-sm text-gray-500 mt-1">
            Przegląd sprzedawców · Dane za ostatnie 30 dni (kwiecień 2026)
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Łączne obroty</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {totalRevenue.toLocaleString("pl-PL")} zł
            </p>
            <p className="text-xs text-gray-400 mt-1">ostatnie 30 dni</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Liczba transakcji</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {totalTransactions.toLocaleString("pl-PL")}
            </p>
            <p className="text-xs text-gray-400 mt-1">ostatnie 30 dni</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Aktywni sprzedawcy</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{activeSellers}</p>
            <p className="text-xs text-gray-400 mt-1">z {sellers.length} zarejestrowanych</p>
          </div>
        </div>

        {/* Sellers table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-900">Sprzedawcy</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Sprzedawca
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide text-right">
                    Transakcje
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide text-right">
                    Obrót (30 dni)
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide text-right">
                    Śr. wartość zam.
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Top kategoria
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Ocena
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows
                  .sort((a, b) => (b.stats?.revenue ?? 0) - (a.stats?.revenue ?? 0))
                  .map(({ seller, stats }) => (
                    <tr key={seller.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{seller.name}</p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            od {seller.joinedYear} · {seller.slug}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-gray-900">
                        {stats ? stats.transactionCount.toLocaleString("pl-PL") : "—"}
                      </td>
                      <td className="px-6 py-4 text-right font-semibold text-gray-900">
                        {stats ? `${stats.revenue.toLocaleString("pl-PL")} zł` : "—"}
                      </td>
                      <td className="px-6 py-4 text-right text-gray-600">
                        {stats ? `${stats.avgOrderValue} zł` : "—"}
                      </td>
                      <td className="px-6 py-4">
                        {stats ? (
                          <span className="inline-block text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                            {stats.topCategory}
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {seller.rating > 0 ? (
                          <div className="flex items-center gap-1">
                            <span className="text-amber-400 text-xs">★</span>
                            <span className="font-medium text-gray-900">{seller.rating.toFixed(1)}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">brak ocen</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {stats ? (
                          <TrendBadge trend={stats.trend} percent={stats.trendPercent} />
                        ) : (
                          "—"
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center pb-4">
          Dane demonstracyjne · FashionHero Admin Panel
        </p>
      </div>
    </div>
  );
}
