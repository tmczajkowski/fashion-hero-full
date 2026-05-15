# Chosen Assumption Test — Q3.1 input

**Test:** **A2.1.3 — Mini-RCT causation propensity-matched dla S2.1 Free 100 PLN credit at activation**

## Format testu (verbatim z Q2.4 map-the-territory.md § Brama 4 — H4d)

100 newcomers (months_active ≤ 3) z 100 PLN credit pool / 100 control bez credit, propensity-matched na LQS proxy + months_active + category. 90-day tracking GMV trajectory per seller.

- **Success:** treatment vs control GMV difference istotna p<0.10.
- **Decision rule:** difference <5% lub p>0.20 → causation niemożliwa do dowodzenia, pivot do adoption-only proxy metrics (per Q2.3 recon-mission "low-risk first move" recommendation).

## Dlaczego ten (revenue-side, jak wymaga Q3.1)

> Wybieramy A2.1.3, ponieważ Q2.3 raport ustalił że Stream 1 jest *unfalsyfikowalny w revenue terms* (Lewis-Rao 2015 QJE meta-analiza: median 95% CI ad ROI >100pp wide; Blake-Nosko-Tadelis 2015 Econometrica: paid search zero ROI dla frequent users) — *jedyną* drogą uniknięcia tego measurement-trap jest proxy-metric design z control group, który A2.1.3 dokładnie operacjonalizuje. Plus: Kamil z Q2.2 dosłownie deklarował *"500 zł, tysiąc — jeśli przyniesie zamówienia, tak"* — testujemy *tę konkretną hipotezę* za niski koszt, bo FH ma już Q2.1 CSV dla propensity matching (LQS proxy z density of listing fields + months_active + category). Plus: pozytywny wynik dla S2.1 jako solution dla O2 (PRES 18, najmocniejsze evidence triangulation: Amazon NSI + Walmart $1k + eBay 80% + Abhishek Flipkart RCT) unlock'uje całą O2 branch tree (S2.3 deferred + S2.5 LQS-gated to potem refinements).

## Kierunek prototypu (verbatim z Q2.4)

> Prototyp = **minimal credit infrastructure** (account credit balance w sellerze panelu, ad spend deduction z balance, 60-day expiry tracker) + **2-arm onboarding flow**: treatment cohort dostaje auto-enrollment w 100 PLN credit przy pierwszym login w month 1, control cohort widzi identyczne UI bez credit (lub z neutralnym placeholder "future feature"). Pomiar: 90-day GMV per seller (treatment vs control) z propensity matching post-hoc z Q2.1 CSV; secondary: redemption rate, ad spend variance, 90-day retention. Build effort: ~2-3 tygodnie dev (credit balance state + ad spend pipeline + tracking dashboard).

## Co adresuje (Outcome z Q2.4 Brama 1)

Outcome: **Zwiększ % newcomer sellerów (months_active ≤ 3) używających Promoted Listings co najmniej 1× w miesiącu z 0% do 35% w aktywnej kohorcie newcomer do końca Q3 2026 (30 września 2026).**

## Source

- `weeks/w2d2-2026-04-30-decide/analyses/map-the-territory.md` § Chosen Assumption Test (H4e — 2026-05-15)
- HITL: `setup/hitl-log.md` § H0g

## Scope-down note for Q3.2

Q3.1 spec targetuje *pełną* wizję RCT (200 sellerów, 90 dni, real credit balance infrastructure). Q3.2 pretotyp natomiast wytnie najtańszy *fragment*: np. smoke-test landing page "Newcomer Boost: 100 PLN ad credit dla pierwszego miesiąca — Claim" → kliknięcia / e-maile zapisów. To dwa różne dokumenty pod dwie różne fazy — patrz `setup/hitl-log.md § H0g`.
