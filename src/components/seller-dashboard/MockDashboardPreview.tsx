export function MockDashboardPreview() {
  return (
    <section className="w-full py-12 md:py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
          Zobacz jak to wygląda
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
              <div className="text-center">
                <p className="text-slate-600 text-lg font-semibold">Returns Heatmap</p>
                <p className="text-slate-500 text-sm mt-2">[Mock Dashboard Image 1]</p>
              </div>
            </div>
            <div className="p-4 border-t">
              <p className="text-sm text-slate-600">Heatmapa zwrotów — zobacz dokładnie które produkty tracą Ci pieniądze</p>
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
              <div className="text-center">
                <p className="text-slate-600 text-lg font-semibold">SKU Deep Dive</p>
                <p className="text-slate-500 text-sm mt-2">[Mock Dashboard Image 2]</p>
              </div>
            </div>
            <div className="p-4 border-t">
              <p className="text-sm text-slate-600">Analiza poszczególnych produktów — dlaczego ludzie ich zwracają</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
