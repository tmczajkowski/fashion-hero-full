# Pricing Report (demo) — design

> **Status:** spec, do implementacji.
> **Data:** 2026-05-10.
> **Kontekst:** [fake door prototype](https://competitor-price-report-fd-v2.lovable.app), fake door spec (`fashion-hero/prototypes/fake-door-pricing-report-spec.md`), week 3 decyzja (`fashion-hero/discovery/feature-pick-week-3-prototype.md`).

## 1. Cel

Zbudować w sklonowanym repo **FashionHero** (Next.js 16 + React 19 + Tailwind v4 + shadcn) demo feature'a **Raport Cen Konkurencji** — wewnętrzny widok dostępny w panelu sprzedawcy, z mock danymi i mock eksportem. Feature uzupełnia walidację z fake door (49 PLN/mies, segment Workhorses) o pełny user journey: discovery → fake checkout → użycie raportu w panelu.

Deliverable końcowy: link do publicznego forka na GitHubie + Vercel deploy.

## 2. Zakres

### W zakresie

- Banner promujący feature w istniejącym panelu `/account` (warunkowo, jeśli brak subskrypcji).
- Landing publiczny `/pricing-report` (replika fake door, copy 1:1).
- Fake checkout `/pricing-report/checkout` z imitowaną płatnością (button „Zapłać" → 800 ms loading → success). Bez realnej bramki, bez zbierania danych karty.
- Success `/pricing-report/success` z CTA do raportu.
- Widok raportu `/account/pricing-report` (pełny zakres: KPI cards + wykres marży + tabela 25 SKU + alerty + historia + konkurenci).
- Sticky tabs nav ze scrollspy w widoku raportu.
- Toggle wykresu marży **bar ↔ line**.
- Pojedynczy przycisk eksportu z dropdown: PDF (placeholder) + Excel/CSV (rzeczywisty CSV z mock danych).
- Wszystkie strony pod istniejącym `Shell` (topbar + footer FashionHero).

### Poza zakresem

- Realne integracje płatnicze, automatyczny scraping cen konkurencji, prawdziwy product graph.
- Auth: stan subskrypcji w `localStorage` (nie konto użytkownika).
- Panel sprzedawcy oddzielny od istniejącego `/account`.
- Backend, baza danych, fake API routes (pomijamy wariant „full product-feel").
- Testy jednostkowe (manualny smoke test wystarczy do demo).

## 3. User flow

```
/account
  └─ <PricingReportBanner/> (jeśli !subscription.isActive)
        klik „Aktywuj raport" →
              /pricing-report               (landing — replika fake door)
                klik „Zamów raport" →
                      /pricing-report/checkout    (fake)
                        klik „Zapłać" → activate() →
                              /pricing-report/success
                                klik „Otwórz raport" →
                                      /account/pricing-report   (widok raportu)
```

Wszystko z istniejącym topbarem (`Header` + `AnnouncementBar`) i footerem, bo `Shell` jest globalny w `app/layout.tsx`.

## 4. Architektura

### Struktura plików

```
src/
  app/
    account/
      page.tsx                       # + warunkowy <PricingReportBanner/>
      pricing-report/
        page.tsx                     # widok raportu
    pricing-report/
      page.tsx                       # landing
      checkout/page.tsx              # fake checkout
      success/page.tsx               # success
  components/
    pricing-report/
      banner.tsx
      sticky-tabs-nav.tsx
      kpi-cards.tsx
      margin-chart.tsx               # toggle bar/line
      sku-table.tsx                  # sort + filter kategorii
      alerts-list.tsx
      history-list.tsx               # drill-down do innego tygodnia
      competitors-list.tsx
      export-menu.tsx                # dropdown PDF/CSV
      landing/
        hero.tsx
        report-preview.tsx
        why-it-pays.tsx
        how-it-works.tsx
        offer-card.tsx
        faq.tsx
    ui/                              # doinstalowane shadcn-y
      card.tsx
      table.tsx
      tabs.tsx
      badge.tsx
      dropdown-menu.tsx
      accordion.tsx                  # do FAQ
  lib/pricing-report/
    types.ts
    data.ts
    use-subscription.ts
    subscription-provider.tsx        # opakowuje /account/layout.tsx
```

### Nowe zależności

| Paczka | Po co |
|---|---|
| `recharts` | Wykres marży (bar + line) |
| shadcn `card`, `table`, `tabs`, `badge`, `dropdown-menu`, `accordion`, `sonner` | Komponenty UI (instalowane via `npx shadcn add`). `sonner` na toast po blokadzie wejścia bez subskrypcji. |

Brak innych nowych dependencies. `@base-ui/react` już jest, służy jako warstwa pod shadcn.

### Stan subskrypcji

```ts
// src/lib/pricing-report/use-subscription.ts
type SubscriptionState = { isActive: boolean; activatedAt: string | null }
```

- `SubscriptionProvider` osadzony w globalnym `app/layout.tsx`, zaraz pod `Shell`. Inne strony go nie czytają, więc nie boli. Pojedyncze miejsce dla całej aplikacji, łatwo dotrzeć z każdej podstrony.
- Persistencja: `localStorage['pricing-report:subscription']`.
- API hooka: `{ isActive, activatedAt, activate(), deactivate() }`.
- SSR safe: pierwszy render zwraca `isActive: false` (bezpieczna domyślna), `useEffect` synchronizuje z `localStorage` po hydratacji.

## 5. Mock dane

### Typy (`lib/pricing-report/types.ts`)

```ts
export type Recommendation =
  | { kind: 'lower'; deltaPln: number }
  | { kind: 'raise'; deltaPln: number }
  | { kind: 'hold' }

export interface CompetitorPrice { competitorId: string; pricePln: number }

export interface Sku {
  id: string
  name: string
  category: 'odziez' | 'obuwie' | 'dodatki'
  yourPricePln: number
  competitorAvgPln: number
  diffPercent: number
  recommendation: Recommendation
  perCompetitor: CompetitorPrice[]
}

export interface Competitor {
  id: string
  name: string
  trackedSkus: number
  avgDeltaPercent: number
  lastUpdate: string  // ISO
}

export interface Alert {
  id: string
  skuId: string
  skuName: string
  competitorName: string
  oldPricePln: number
  newPricePln: number
  dropPercent: number  // ≥ 5
  detectedAt: string   // ISO
}

export type DayOfWeek = 'Pn'|'Wt'|'Sr'|'Cz'|'Pt'|'So'|'Nd'

export interface WeeklyReport {
  weekNumber: number
  year: number
  range: { from: string; to: string }
  totals: {
    skuCount: number
    skusToAdjust: number
    weeklyAlerts: number
    marginUpliftPercent: number
  }
  marginByDay: { day: DayOfWeek; current: number; optimized: number }[]
  skus: Sku[]
  alerts: Alert[]
}
```

### Skala mocków

- **25 SKU** w bieżącym raporcie. Polskie nazwy w stylu fake door („Sukienka midi „Liana"", „Trampki damskie „Cleo""…). Mix kategorii: ~10 odzież, ~10 obuwie, ~5 dodatki.
- **5 konkurentów** (np. ModaPlus, TrendyShop, FashionLab, StyleHub, VogueOutlet). Per SKU mapping cen.
- **8 alertów** (różne SKU, różni konkurenci, drop 5–22%).
- **4 historyczne tygodnie** (44, 45, 46, 47-current). Każdy z innym snapshot KPI; tabela SKU może być ta sama (uproszczenie: oszczędza nam 75 osobnych SKU).

### Bieżący tydzień (ścisłe wartości KPI z fake door)

```
totals: {
  skuCount: 25,        // wyświetlamy "25 z 100" w nagłówku, żeby narracja z fake door (100 produktów)
  skusToAdjust: 23,    // zgodnie z preview fake door
  weeklyAlerts: 7,
  marginUpliftPercent: 14,
}
```

## 6. Widok raportu — szczegół

### Header

```
┌─ Eyebrow ────────────────────────────────────────┐
│ PRICING REPORT · PANEL SPRZEDAWCY                │
│ Tydzień 47 · 2026                  [Eksportuj ▾] │
│ 14–20 maja 2026 · 25 z 100 produktów             │
└──────────────────────────────────────────────────┘
```

`[Eksportuj ▾]` = shadcn `DropdownMenu`:
- „Pobierz PDF" → pobiera statyczny plik z `public/pricing-report-placeholder.pdf` (jednorazowo wygenerowany 1-stronicowy PDF z napisem „Demo report — placeholder", commitowany do repo) jako `pricing-report-w47-2026.pdf`. Generowanie PDF-a z biblioteki na klientcie pomijamy — to demo.
- „Pobierz Excel (CSV)" → realny CSV generowany na bieżąco z `Blob([csv], { type: 'text/csv' })`, 25 wierszy z mock danych, kolumny: id, nazwa, kategoria, twoja_cena, srednia_konkurencji, delta_proc, rekomendacja. Plik: `pricing-report-w47-2026.csv`.

### Sticky tabs nav

```
[Raport] [Alerty 8] [Historia] [Konkurenci]
```

- Przyklejony do góry po przewinięciu hero.
- `IntersectionObserver` na `<section id="raport|alerty|historia|konkurenci">` ustawia aktywny tab.
- Klik tab → `element.scrollIntoView({ behavior: 'smooth', block: 'start' })`.
- Mobile: scroll horyzontalny.

### Sekcje (single scroll, każda osadzona w `<section id>`)

1. **Raport** — `KpiCards` (3 karty: do korekty / alerty / +marża, ostatnia inverted czarne tło) + `MarginChart` z toggle bar/line + `SkuTable` (25 wierszy, sort po kolumnach, filter kategorii).
2. **Alerty** — `AlertsList`, każdy item: ikona ⚠ + SKU + konkurent + `199 zł → 159 zł (-20%)` + relative time (np. „2 godziny temu").
3. **Historia** — `HistoryList`, 4 wiersze (Tydzień 44–47), aktualny zaznaczony. Klik nieaktualny → state-based view (przełącza widok na wybrany tydzień przez query string `?week=46`).
4. **Konkurenci** — tabela 5 wierszy: nazwa, śledzonych SKU, średnia delta %, ostatnia aktualizacja.

### Toggle wykresu

```
┌── Marża w czasie ─── [bar | line] ──┐
│                                     │
│   <BarChart/> lub <LineChart/>      │
│                                     │
└─────────────────────────────────────┘
```

Stan w `useState<'bar'|'line'>('bar')`, rendering switch. Dane: `marginByDay`, dwie serie `current` i `optimized`.

### Tabela SKU

| Produkt | Twoja | Konkurencja | Δ% | Rekomendacja |
|---|---|---|---|---|
| Sukienka midi „Liana" | 189 zł | 179 zł | <span style="color:red">+5.6%</span> | Obniż o 12 PLN |
| Trampki damskie „Cleo" | 129 zł | 149 zł | <span style="color:green">-13.4%</span> | Podnieś o 15 PLN |
| Bluza oversize „Nord" | 159 zł | 162 zł | -1.9% | Trzymaj cenę |

- Nagłówki klikalne → sort asc/desc po kolumnie.
- Filtr kategorii nad tabelą: `Wszystkie | Odzież | Obuwie | Dodatki`.
- Mobile: tabela → karty (jeden SKU = jedna karta z tymi samymi danymi).

## 7. Landing — sekcje

Komponenty w `components/pricing-report/landing/*`. Copy 1:1 z fake door.

1. **Hero** — eyebrow „Nowy moduł FashionHero", H1 „Przestań ręcznie śledzić ceny konkurencji", lead, CTA „Zamów raport – 49 PLN/mies".
2. **ReportPreview** — kafelek z fragmentem tabeli (4 wiersze, statyczne) + KPI cards inline. Ilustracja oferty.
3. **WhyItPays** — 2 karty: Oszczędność czasu (16h/mies → 5 sek), Większy zysk (+8–14% marży).
4. **HowItWorks** — 3 kroki numerowane.
5. **OfferCard** — bullets („Monitoring 100 produktów", „5 konkurentów", „Raport w systemie + alerty"…), cena 49 PLN/mies, CTA.
6. **Faq** — accordion z 4 pytaniami.

CTA z sekcji 1 i 5 → `/pricing-report/checkout`.

Jeśli `subscription.isActive`, na górze landingu pasek „Masz aktywną subskrypcję — [Otwórz raport]". Reszta landingu wciąż widoczna (do prezentacji).

## 8. Fake checkout

`/pricing-report/checkout`:

- Box: „Subskrypcja Pricing Report — 49 PLN/mies"
- Bullets co user dostaje
- Disclaimer: „To jest demo — nie zostaniesz obciążony"
- Przycisk: „Zapłać 49 PLN" — na klik:
  1. `setIsLoading(true)` (spinner na buttonie)
  2. `await new Promise(r => setTimeout(r, 800))`
  3. `subscription.activate()`
  4. `router.push('/pricing-report/success')`

`/pricing-report/success`:

- ✓ ikona, headline „Subskrypcja aktywna. Twój pierwszy raport jest gotowy."
- CTA „Otwórz raport" → `/account/pricing-report`
- Disclaimer: „To jest demo — nie nastąpiła realna transakcja"

## 9. Banner w `/account`

`<PricingReportBanner/>`:

```
┌─────────────────────────────────────────────────────┐
│ NOWE  Raport cen konkurencji          49 PLN/mies   │
│ Codzienny monitoring 100 produktów + 5 konkurentów. │
│ Co tydzień rekomendacje cenowe.                     │
│                            [ Aktywuj raport → ]     │
└─────────────────────────────────────────────────────┘
```

- Renderuje się na `/account/page.tsx` tylko gdy `!subscription.isActive`.
- Po aktywacji znika; jeśli istniejący `/account` ma menu nawigacji panelu, dodajemy w nim link „Pricing Report" gdy `subscription.isActive` (sprawdzić podczas implementacji).

## 10. Edge cases

| Sytuacja | Zachowanie |
|---|---|
| `!subscription.isActive` + wejście na `/account/pricing-report` | Redirect na `/pricing-report` z toastem „Aktywuj subskrypcję, by zobaczyć raport" |
| `subscription.isActive` + wejście na `/pricing-report` | Pasek u góry: „Masz aktywną subskrypcję — [Otwórz raport]". Reszta landingu wciąż widoczna |
| Refresh po aktywacji | Hook czyta `localStorage` w `useEffect`, stan się przywraca |
| Pierwsze wejście (SSR) | `isActive: false` przy SSR; klient hydratuje stan z `localStorage` |
| Pusta historia / brak danych | Komponenty pokazują stan empty z napisem „Brak danych" (nie wystąpi w mockach, ale obsługujemy) |
| Brak JS | SSR pokazuje statyczny content. Eksport / aktywacja nie działają — nie wspieramy, demo wymaga JS |

## 11. Branding

- **Kolory:** używamy tokenów z `globals.css` (oklch, design system FashionHero). Nie forsujemy palety fake door — feature ma być spójny z resztą sklepu, który ma się rebrandować na FashionHero.
- **Typografia:** `Geist` (już zaimportowane w `app/layout.tsx`).
- **Polski w całości** (UI, alerty, tooltipy, toasty).
- **Mobile-first.** Tabela SKU w mobile przechodzi w karty. KPI stack vertical. Sticky nav scroll horyzontalny.

## 12. Plan weryfikacji

Przed claim że gotowe (jako część skill `verification-before-completion`):

1. `npx tsc --noEmit` — czysto (bez błędów typów).
2. `npm run lint` — czysto.
3. `npm run build` — przechodzi.
4. `npm run dev` + manualny smoke test:
   - `/account` (clean localStorage) → widzę banner.
   - Klik banner → `/pricing-report`, copy się ładuje, topbar+footer obecne.
   - Klik „Zamów raport" → `/checkout`, klik „Zapłać" → loading → `/success`.
   - Klik „Otwórz raport" → `/account/pricing-report`, widzę pełny raport.
   - Sticky nav: scroll → tabs się aktualizują, klik tab → smooth scroll.
   - Toggle wykresu bar ↔ line działa.
   - Sort tabeli SKU po Δ% działa, filtr kategorii działa.
   - Dropdown eksportu: PDF pobiera placeholder, CSV pobiera realny CSV.
   - Drill-down historii: klik tydzień 45 → URL `?week=45`, widok się aktualizuje.
   - Mobile (DevTools 375px): wszystko czytelne, tabela → karty.
   - Wyczyść localStorage → wejście na `/account/pricing-report` → redirect na `/pricing-report` + toast.

Brak testów jednostkowych (projekt nie ma frameworku testowego, demo nie wymaga).

## 13. Plan dostarczenia

1. **Fork via `gh repo fork strzalex/fashion-hero-shop --clone=false --remote=true`** — zmienia origin na fork użytkownika, oryginalny strzalex zostaje jako `upstream`.
2. **Implementacja w commitach logicznych** na branchu `main` (nie używamy PR — to jednoosobowy demo):
   - `chore: add deps (recharts, shadcn add card/table/tabs/badge/dropdown-menu/accordion/sonner)`
   - `feat(pricing-report): types, mock data, use-subscription hook`
   - `feat(pricing-report): landing + checkout + success pages`
   - `feat(pricing-report): account banner + report page (KPI, chart, table, alerts, history, competitors)`
   - `feat(pricing-report): sticky tabs nav scrollspy, chart toggle, export dropdown`
   - `docs: README z opisem demo, link do live demo`
3. **Vercel deploy** podpięty pod GitHub (każdy push = update). Link live trafia do README.
4. **README.md** rozszerzone o sekcję „Pricing Report (demo)": cel, link do fake door, link do Vercel, jak uruchomić lokalnie, status (demo, mock data, brak backendu).
5. **Końcowa wiadomość** z dwoma linkami: GitHub repo + Vercel.

## 14. Otwarte sprawy

- Sprawdzić podczas implementacji, czy `/account` ma już nawigację (menu/sidebar) — jeśli tak, dodać link „Pricing Report" w nawigacji aktywny po subskrypcji. Jeśli nie ma, banner + bezpośrednie linki wystarczą.
- Token kolorystyczny dla „danger" (czerwony Δ% gdy zalecenie obniży) i „success" (zielony Δ% gdy podnieś) — sprawdzić czy `globals.css` ma stosowne tokeny. Jeśli nie, użyć Tailwind defaultów (`text-red-600`, `text-emerald-600`).
- Przed rozpoczęciem: weryfikacja, że `gh auth status` jest aktywne dla konta z którego ma być fork (krok pre-flight planu implementacji).

---

*Spec gotowy do przejścia w plan implementacji (`superpowers:writing-plans`).*
