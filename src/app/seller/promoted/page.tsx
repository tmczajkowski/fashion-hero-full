"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Campaign {
  id: number;
  product: string;
  emoji: string;
  budget: number;
  cpc: number;
  orgPos: number;
  promoPos: number;
  status: "active" | "paused";
  views: number;
  clicks: number;
  spent: number;
}

interface MockProduct {
  name: string;
  price: string;
  emoji: string;
  orgPos: number;
  stock: number;
}

type WizardStep = 1 | 2 | 3;

// ─── Constants ────────────────────────────────────────────────────────────────

const MOCK_PRODUCTS: MockProduct[] = [
  { name: "Koszulka Vintage Wash M", price: "89,99 zł", emoji: "👕", orgPos: 22, stock: 34 },
  { name: "Bluza Oversize Beige",    price: "149,00 zł", emoji: "🧥", orgPos: 18, stock: 12 },
  { name: "Spodnie Cargo Slate",     price: "179,00 zł", emoji: "👖", orgPos: 28, stock: 8  },
  { name: "Czapka Logo Embroidery",  price: "59,99 zł",  emoji: "🧢", orgPos: 36, stock: 22 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return n.toFixed(2).replace(".", ",") + " zł";
}

function calcPromoPos(cpc: number): number {
  return Math.max(1, Math.min(3, Math.floor(10 / cpc)));
}

// ─── Announcement Bar ─────────────────────────────────────────────────────────

function AnnBar() {
  return (
    <div className="bg-[#212121] text-white h-9 flex items-center justify-center text-[11px] font-medium tracking-[0.6px] uppercase">
      Panel Sprzedawcy
      <span className="opacity-40 mx-2.5">·</span>
      Kamil — Vintage Wash Studio
      <span className="opacity-40 mx-2.5">·</span>
      Konto aktywne
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function SellerHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#cdcdcd] h-14 flex items-center px-6 gap-5">
      <Link href="/" className="text-[18px] font-semibold italic tracking-[-0.01em]">
        FashionHero
      </Link>
      <div className="w-px h-[18px] bg-[#cdcdcd]" />
      <span className="text-[11px] font-medium uppercase tracking-[0.8px] text-[#6b6b6b]">
        Panel Sprzedawcy
      </span>
      <div className="ml-auto flex items-center gap-3.5">
        <div className="text-right">
          <div className="text-[13px] font-medium leading-tight">Kamil W.</div>
          <div className="text-[11px] text-[#6b6b6b] uppercase tracking-[0.5px]">
            Vintage Wash Studio
          </div>
        </div>
        <div className="w-8 h-8 bg-[#212121] text-white rounded-full text-[12px] font-semibold flex items-center justify-center shrink-0">
          KW
        </div>
      </div>
    </header>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function SidebarGroup({ label }: { label: string }) {
  return (
    <div className="text-[10px] font-medium uppercase tracking-[1px] text-[#6b6b6b] px-5 pt-[18px] pb-1.5">
      {label}
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  active,
  badge,
}: {
  icon: string;
  label: string;
  active?: boolean;
  badge?: string;
}) {
  return (
    <div
      className={`flex items-center gap-2.5 px-5 py-2 text-[12px] font-medium uppercase tracking-[0.5px] cursor-pointer border-l-2 transition-colors ${
        active
          ? "text-[#212121] border-[#212121] bg-[#f5f4f1]"
          : "text-[#6b6b6b] border-transparent hover:text-[#212121]"
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
      {badge && (
        <span className="ml-auto text-[9px] font-semibold tracking-[1px] px-1.5 py-0.5 bg-[#212121] text-white uppercase">
          {badge}
        </span>
      )}
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="w-[232px] bg-[#ece9e2] border-r border-[#cdcdcd] py-7 sticky top-14 h-[calc(100vh-56px)] overflow-y-auto shrink-0">
      <SidebarGroup label="Sklep" />
      <SidebarItem icon="■" label="Statystyki" />
      <SidebarItem icon="◆" label="Produkty" />
      <SidebarItem icon="○" label="Zamówienia" />
      <SidebarItem icon="◕" label="Wiadomości" />
      <SidebarGroup label="Reklama" />
      <SidebarItem icon="▲" label="Promowane" active badge="New" />
      <SidebarGroup label="Ustawienia" />
      <SidebarItem icon="◇" label="Płatności" />
      <SidebarItem icon="✦" label="Ustawienia" />
    </aside>
  );
}

// ─── Stats Grid ───────────────────────────────────────────────────────────────

interface StatsGridProps {
  campaigns: Campaign[];
}

function StatsGrid({ campaigns }: StatsGridProps) {
  const active = campaigns.filter((c) => c.status === "active").length;
  const totViews = campaigns.reduce((a, c) => a + c.views, 0);
  const totClicks = campaigns.reduce((a, c) => a + c.clicks, 0);
  const totSpent = campaigns.reduce((a, c) => a + c.spent, 0);
  const totBudget = campaigns.reduce((a, c) => a + c.budget, 0);
  const ctr = totViews > 0 ? ((totClicks / totViews) * 100).toFixed(1) : null;

  return (
    <div className="grid grid-cols-4 gap-px bg-[#cdcdcd] border border-[#cdcdcd] mb-6">
      {[
        {
          label: "Wyświetlenia (dziś)",
          value: totViews.toLocaleString("pl-PL"),
          sub: "—",
        },
        {
          label: "Kliknięcia (dziś)",
          value: String(totClicks),
          sub: ctr ? `CTR: ${ctr}%` : "CTR: —",
        },
        {
          label: "Wydany budżet",
          value: fmt(totSpent),
          sub: `pozostało ${fmt(totBudget - totSpent)}`,
        },
        {
          label: "Aktywne kampanie",
          value: String(active),
          sub: `z ${campaigns.length} łącznie`,
        },
      ].map((s) => (
        <div key={s.label} className="bg-white px-6 py-5">
          <div className="text-[10px] font-medium uppercase tracking-[0.8px] text-[#6b6b6b] mb-2">
            {s.label}
          </div>
          <div className="text-[28px] font-normal tracking-[-0.02em]">{s.value}</div>
          <div className="text-[12px] text-[#6b6b6b] mt-1 font-mono">{s.sub}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Campaign Detail ──────────────────────────────────────────────────────────

interface DetailPanelProps {
  campaign: Campaign;
  onTogglePause: () => void;
  onEdit: () => void;
}

function DetailPanel({ campaign: c, onTogglePause, onEdit }: DetailPanelProps) {
  const pct = c.budget > 0 ? Math.round((c.spent / c.budget) * 100) : 0;
  const ctr = c.views > 0 ? ((c.clicks / c.views) * 100).toFixed(1) + "%" : "—";
  const statusTxt =
    c.status === "active"
      ? `Aktywna · ${fmt(c.budget - c.spent)} budżetu dostępne`
      : "Wstrzymana · budżet wyczerpany";

  return (
    <div className="bg-white border border-[#cdcdcd] mt-4 animate-in fade-in duration-200">
      {/* Head */}
      <div className="px-6 py-[18px] border-b border-[#cdcdcd] bg-[#f5f4f1] flex items-center justify-between">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.5px]">
            {c.emoji}&nbsp;&nbsp;{c.product}
          </div>
          <div className="font-mono text-[11px] text-[#6b6b6b] mt-0.5">{statusTxt}</div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onTogglePause}
            className="inline-flex items-center h-7 px-2.5 rounded-[6px] text-[12px] font-medium border border-[#cdcdcd] bg-white hover:bg-[#f5f4f1] hover:border-[#212121] transition-colors"
          >
            {c.status === "active" ? "⏸ Wstrzymaj" : "▶ Wznów"}
          </button>
          <button
            onClick={onEdit}
            className="inline-flex items-center h-7 px-2.5 rounded-[6px] text-[12px] font-medium border border-[#cdcdcd] bg-white hover:bg-[#f5f4f1] hover:border-[#212121] transition-colors"
          >
            ✎ Edytuj
          </button>
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-5 border-b border-[#cdcdcd]">
        {[
          { label: "Wyświetlenia", value: c.views.toLocaleString("pl-PL"), sub: "dziś" },
          { label: "Kliknięcia", value: String(c.clicks), sub: `CTR: ${ctr}` },
          { label: "Wydano", value: fmt(c.spent), sub: `/ ${fmt(c.budget)}`, mono: true },
          { label: "Pozycja promowana", value: `#${c.promoPos}`, sub: `org. #${c.orgPos}` },
          { label: "Stawka CPC", value: c.cpc.toFixed(2).replace(".", ","), sub: "zł / klik", mono: true },
        ].map((k) => (
          <div key={k.label} className="px-5 py-5 border-r border-[#cdcdcd] last:border-r-0 text-center">
            <div className="text-[10px] font-medium uppercase tracking-[0.7px] text-[#6b6b6b] mb-2">
              {k.label}
            </div>
            <div
              className={`font-normal tracking-[-0.02em] ${k.mono ? "font-mono text-[18px]" : "text-[22px]"}`}
            >
              {k.value}
            </div>
            <div className="font-mono text-[11px] text-[#6b6b6b] mt-0.5">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Budget bar */}
      <div className="px-6 py-4">
        <div className="flex justify-between text-[11px] text-[#6b6b6b] uppercase tracking-[0.6px] mb-2">
          <span>Wykorzystanie budżetu dziennego</span>
          <span className="font-mono">{pct}%</span>
        </div>
        <div className="h-1 bg-[#cdcdcd] overflow-hidden">
          <div
            className="h-full bg-[#212121] transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Campaigns Table ──────────────────────────────────────────────────────────

interface TableProps {
  campaigns: Campaign[];
  selectedIdx: number | null;
  onSelect: (i: number) => void;
  onTogglePause: (i: number) => void;
}

function CampaignsTable({ campaigns, selectedIdx, onSelect, onTogglePause }: TableProps) {
  return (
    <div className="bg-white border border-[#cdcdcd]">
      <div className="px-5 py-3.5 border-b border-[#cdcdcd] flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-[0.7px] text-[#6b6b6b]">
          Kampanie
        </span>
        <span className="font-mono text-[11px] text-[#6b6b6b]">Odświeżane co 5 min</span>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {["Produkt", "Status", "CPC", "Wyświetlenia", "Kliknięcia", "Budżet dzienny", "Pozycja", ""].map(
              (h) => (
                <th
                  key={h}
                  className="text-[10px] font-medium uppercase tracking-[0.7px] text-[#6b6b6b] text-left px-5 py-2.5 bg-[#f5f4f1] border-b border-[#cdcdcd]"
                >
                  {h}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {campaigns.map((c, i) => {
            const pct = c.budget > 0 ? Math.round((c.spent / c.budget) * 100) : 0;
            return (
              <tr
                key={c.id}
                onClick={() => onSelect(i)}
                className={`cursor-pointer border-b border-[#f0ede6] last:border-b-0 hover:bg-[#f5f4f1] transition-colors ${
                  selectedIdx === i ? "bg-[#f5f4f1]" : ""
                }`}
              >
                {/* Product */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#ece9e2] border border-[#cdcdcd] flex items-center justify-center text-xl shrink-0">
                      {c.emoji}
                    </div>
                    <div>
                      <div className="text-[11px] font-medium uppercase tracking-[0.5px]">
                        {c.product}
                      </div>
                      <div className="text-[11px] text-[#6b6b6b] mt-0.5">Kampania #{i + 1}</div>
                    </div>
                  </div>
                </td>

                {/* Status */}
                <td className="px-5 py-3.5">
                  {c.status === "active" ? (
                    <span className="text-[10px] font-medium uppercase tracking-[1px] px-1.5 py-0.5 bg-[#e8f4ee] text-[#1a6b3a]">
                      Aktywna
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium uppercase tracking-[1px] px-1.5 py-0.5 bg-[#fdf3e7] text-[#b45309]">
                      Wstrzymana
                    </span>
                  )}
                </td>

                {/* CPC */}
                <td className="px-5 py-3.5 font-mono text-[13px]">
                  {c.cpc.toFixed(2).replace(".", ",")} zł
                </td>

                {/* Views */}
                <td className="px-5 py-3.5 text-[13px]">{c.views.toLocaleString("pl-PL")}</td>

                {/* Clicks */}
                <td className="px-5 py-3.5 text-[13px]">{c.clicks}</td>

                {/* Budget */}
                <td className="px-5 py-3.5">
                  <div className="font-mono text-[12px]">
                    {fmt(c.spent)} / {fmt(c.budget)}
                  </div>
                  <div className="h-0.5 bg-[#cdcdcd] mt-1.5 w-[120px] overflow-hidden">
                    <div
                      className="h-full bg-[#212121] transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </td>

                {/* Position */}
                <td className="px-5 py-3.5">
                  <span className="text-[13px] font-medium">#{c.promoPos}</span>
                  <div className="text-[11px] text-[#6b6b6b] mt-0.5">org. #{c.orgPos}</div>
                </td>

                {/* Action */}
                <td className="px-5 py-3.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onTogglePause(i);
                    }}
                    className="inline-flex items-center h-7 px-2.5 rounded-[6px] text-[12px] font-medium border border-[#cdcdcd] bg-white hover:bg-[#f5f4f1] hover:border-[#212121] transition-colors"
                  >
                    {c.status === "active" ? "⏸" : "▶"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Wizard Modal ─────────────────────────────────────────────────────────────

interface WizardProps {
  step: WizardStep;
  onClose: () => void;
  onGoTo: (s: WizardStep) => void;
  onActivate: (campaign: Omit<Campaign, "id" | "views" | "clicks" | "spent">) => void;
}

function Wizard({ step, onClose, onGoTo, onActivate }: WizardProps) {
  const [confirmed, setConfirmed] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<MockProduct | null>(null);
  const [budget, setBudget] = useState("");
  const [cpc, setCpc] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const budgetNum = parseFloat(budget);
  const cpcNum = parseFloat(cpc);
  const estimatesOk = !isNaN(budgetNum) && !isNaN(cpcNum) && budgetNum >= 10 && cpcNum >= 0.5;
  const estClicks = estimatesOk ? Math.floor(budgetNum / cpcNum) : 0;
  const estViews = estimatesOk ? Math.round(estClicks * 19) : 0;

  function stepperClass(n: number) {
    if (n < step) return "done";
    if (n === step) return "active";
    return "";
  }

  function validateStep2() {
    const errs: Record<string, string> = {};
    if (!selectedProduct) errs.product = "Wybierz produkt.";
    if (isNaN(budgetNum) || budgetNum < 10) errs.budget = "Wpisz min. 10 zł.";
    if (isNaN(cpcNum) || cpcNum < 0.5) errs.cpc = "Wpisz min. 0,50 zł.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleGoTo3() {
    if (!validateStep2()) return;
    onGoTo(3);
  }

  function handleActivate() {
    if (!selectedProduct) return;
    onActivate({
      product: selectedProduct.name,
      emoji: selectedProduct.emoji,
      budget: budgetNum,
      cpc: cpcNum,
      orgPos: selectedProduct.orgPos,
      promoPos: calcPromoPos(cpcNum),
      status: "active",
    });
  }

  const StepNum = ({ n }: { n: number }) => {
    const cls = stepperClass(n);
    return (
      <div
        className={`w-5 h-5 border flex items-center justify-center text-[10px] font-semibold font-mono shrink-0 ${
          cls === "active" || cls === "done"
            ? "bg-[#212121] text-white border-[#212121]"
            : "border-[#cdcdcd]"
        }`}
      >
        {cls === "done" ? "✓" : n}
      </div>
    );
  };

  const StepLabel = ({ n, label }: { n: number; label: string }) => {
    const cls = stepperClass(n);
    return (
      <div
        className={`flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.7px] whitespace-nowrap ${
          cls ? "text-[#212121]" : "text-[#6b6b6b]"
        }`}
      >
        <StepNum n={n} />
        {label}
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 z-[200] flex items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-[560px] max-w-[calc(100vw-32px)] max-h-[calc(100vh-48px)] overflow-y-auto border border-[#cdcdcd] shadow-2xl">
        {/* Stepper */}
        <div className="flex items-center px-6 py-3.5 border-b border-[#cdcdcd] bg-[#f5f4f1] gap-0">
          <StepLabel n={1} label="Model cenowy" />
          <div className="flex-1 h-px bg-[#cdcdcd] mx-3" />
          <StepLabel n={2} label="Konfiguracja" />
          <div className="flex-1 h-px bg-[#cdcdcd] mx-3" />
          <StepLabel n={3} label="Podsumowanie" />
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <>
            <div className="px-6 pt-6 flex items-start justify-between gap-4">
              <div>
                <div className="text-[20px] font-normal tracking-[-0.01em]">Jak działa model CPC?</div>
                <div className="text-[13px] text-[#6b6b6b] mt-1">
                  Zapoznaj się z warunkami przed konfiguracją kampanii.
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 bg-[#f5f4f1] border border-[#cdcdcd] flex items-center justify-center text-[14px] text-[#6b6b6b] hover:bg-[#e0dad0] hover:text-[#212121] transition-colors shrink-0"
              >
                ✕
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              {/* Info panel */}
              <div className="bg-[#f5f4f1] border border-[#cdcdcd] p-[18px]">
                <div className="text-[10px] font-medium uppercase tracking-[0.8px] text-[#6b6b6b] mb-3.5">
                  Warunki cenowe
                </div>
                {[
                  ["Model rozliczenia", "CPC — płacisz za kliknięcia"],
                  ["Minimalna stawka CPC", "0,50 zł / klik"],
                  ["Minimalny budżet dzienny", "10,00 zł / dzień"],
                  ["Kiedy kampania się zatrzymuje?", "Po wyczerpaniu budzetu — status \"Wstrzymana\""],
                  ["Kiedy płacę?", "Tylko gdy kupujący kliknie produkt"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex justify-between items-baseline py-2.5 border-b border-[#cdcdcd] last:border-b-0 gap-4"
                  >
                    <span className="text-[13px] text-[#6b6b6b]">{k}</span>
                    <span className="text-[14px] font-medium text-right">{v}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-[#cdcdcd] p-[18px]">
                <div className="text-[10px] font-medium uppercase tracking-[0.8px] text-[#6b6b6b] mb-3.5">
                  Pozycja w wynikach
                </div>
                <p className="text-[13px] leading-[1.7]">
                  Twój produkt pojawi się <strong>wyżej w wynikach wyszukiwania</strong> dla powiązanych
                  fraz. Im wyższy CPC, tym korzystniejsza pozycja. W dashboardzie zobaczysz{" "}
                  <strong>pozycję promowaną vs organiczną</strong> (np. „pozycja 2 z 47").
                </p>
              </div>

              {/* Confirm */}
              <div
                className={`border p-3.5 flex gap-3 items-start cursor-pointer transition-colors ${
                  confirmed
                    ? "border-[#212121] bg-white"
                    : "border-[#cdcdcd] bg-[#ece9e2]"
                }`}
                onClick={() => setConfirmed((v) => !v)}
              >
                <input
                  type="checkbox"
                  checked={confirmed}
                  readOnly
                  className="w-4 h-4 mt-0.5 shrink-0 accent-[#212121] cursor-pointer"
                />
                <label className="text-[13px] leading-[1.6] cursor-pointer">
                  Rozumiem model CPC: płacę <strong>min. 0,50 zł za kliknięcie</strong>, budżet dzienny
                  to <strong>min. 10 zł</strong>. Kampania zatrzymuje się automatycznie gdy budżet
                  zostaje wyczerpany.
                </label>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-[#cdcdcd] bg-[#f5f4f1] flex justify-end gap-2.5">
              <button
                onClick={onClose}
                className="inline-flex items-center h-8 px-3 text-[13px] font-medium text-[#212121] hover:bg-[#f5f4f1] transition-colors rounded-lg"
              >
                Anuluj
              </button>
              <button
                disabled={!confirmed}
                onClick={() => onGoTo(2)}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-[12px] font-medium uppercase tracking-[0.6px] bg-[#212121] text-white rounded-full disabled:opacity-35 disabled:cursor-not-allowed hover:opacity-80 transition-opacity"
              >
                Dalej →
              </button>
            </div>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <>
            <div className="px-6 pt-6 flex items-start justify-between gap-4">
              <div>
                <div className="text-[20px] font-normal tracking-[-0.01em]">Konfiguracja kampanii</div>
                <div className="text-[13px] text-[#6b6b6b] mt-1">
                  Wybierz produkt, ustaw budżet i stawkę CPC.
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 bg-[#f5f4f1] border border-[#cdcdcd] flex items-center justify-center text-[14px] text-[#6b6b6b] hover:bg-[#e0dad0] transition-colors shrink-0"
              >
                ✕
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              {/* Product picker */}
              <div>
                <label className="text-[11px] font-medium uppercase tracking-[0.7px] text-[#6b6b6b] block mb-1.5">
                  Produkt do promocji
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {MOCK_PRODUCTS.map((p) => (
                    <div
                      key={p.name}
                      onClick={() => {
                        setSelectedProduct(p);
                        setErrors((e) => ({ ...e, product: "" }));
                      }}
                      className={`border p-3 cursor-pointer flex items-center gap-2.5 bg-white transition-colors ${
                        selectedProduct?.name === p.name
                          ? "border-[#212121]"
                          : "border-[#cdcdcd] hover:border-[#6b6b6b]"
                      }`}
                    >
                      <div className="w-9 h-9 bg-[#ece9e2] border border-[#cdcdcd] flex items-center justify-center text-lg shrink-0">
                        {p.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-medium uppercase tracking-[0.4px] leading-tight">
                          {p.name}
                        </div>
                        <div className="text-[12px] text-[#6b6b6b] mt-0.5">
                          {p.price} · {p.stock} szt.
                        </div>
                      </div>
                      <div
                        className={`w-4 h-4 border flex items-center justify-center text-[10px] shrink-0 transition-colors ${
                          selectedProduct?.name === p.name
                            ? "bg-[#212121] border-[#212121] text-white"
                            : "bg-[#f5f4f1] border-[#cdcdcd]"
                        }`}
                      >
                        ✓
                      </div>
                    </div>
                  ))}
                </div>
                {errors.product && (
                  <p className="text-[12px] text-[#e31919] mt-1">{errors.product}</p>
                )}
              </div>

              <hr className="border-[#cdcdcd]" />

              {/* Budget + CPC */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-medium uppercase tracking-[0.7px] text-[#6b6b6b] block mb-1.5">
                    Budżet dzienny
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={budget}
                      onChange={(e) => {
                        setBudget(e.target.value);
                        setErrors((er) => ({ ...er, budget: "" }));
                      }}
                      placeholder="50"
                      min={10}
                      className={`w-full h-10 px-3.5 pr-9 bg-white border rounded-lg font-sans text-[14px] text-[#212121] focus:outline-none focus:border-[#212121] transition-colors ${
                        errors.budget ? "border-[#e31919]" : "border-[#cdcdcd]"
                      }`}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-[#6b6b6b] pointer-events-none font-mono">
                      zł
                    </span>
                  </div>
                  <div className="font-mono text-[11px] text-[#6b6b6b] mt-1">Min. 10 zł / dzień</div>
                  {errors.budget && (
                    <p className="text-[12px] text-[#e31919] mt-0.5">{errors.budget}</p>
                  )}
                </div>
                <div>
                  <label className="text-[11px] font-medium uppercase tracking-[0.7px] text-[#6b6b6b] block mb-1.5">
                    Stawka CPC
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={cpc}
                      onChange={(e) => {
                        setCpc(e.target.value);
                        setErrors((er) => ({ ...er, cpc: "" }));
                      }}
                      placeholder="0.80"
                      min={0.5}
                      step={0.1}
                      className={`w-full h-10 px-3.5 pr-9 bg-white border rounded-lg font-sans text-[14px] text-[#212121] focus:outline-none focus:border-[#212121] transition-colors ${
                        errors.cpc ? "border-[#e31919]" : "border-[#cdcdcd]"
                      }`}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-[#6b6b6b] pointer-events-none font-mono">
                      zł
                    </span>
                  </div>
                  <div className="font-mono text-[11px] text-[#6b6b6b] mt-1">Min. 0,50 zł / klik</div>
                  {errors.cpc && (
                    <p className="text-[12px] text-[#e31919] mt-0.5">{errors.cpc}</p>
                  )}
                </div>
              </div>

              {/* Estimates */}
              {estimatesOk && (
                <div className="bg-[#f5f4f1] border border-[#cdcdcd] p-[18px]">
                  <div className="text-[10px] font-medium uppercase tracking-[0.8px] text-[#6b6b6b] mb-3.5">
                    Szacowane wyniki przy tym budżecie
                  </div>
                  {[
                    ["Szac. kliknięcia / dzień", `${estClicks} kliknięć`],
                    ["Szac. wyświetlenia / dzień", estViews.toLocaleString("pl-PL") + " wyświetleń"],
                    ["Maks. koszt dzienny", fmt(budgetNum)],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex justify-between items-baseline py-2.5 border-b border-[#cdcdcd] last:border-b-0 gap-4"
                    >
                      <span className="text-[13px] text-[#6b6b6b]">{k}</span>
                      <span className="font-mono text-[14px] font-medium">{v}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-[#cdcdcd] bg-[#f5f4f1] flex justify-between gap-2.5">
              <button
                onClick={() => onGoTo(1)}
                className="inline-flex items-center h-8 px-3 text-[13px] font-medium text-[#212121] hover:bg-[#e0dad0] transition-colors rounded-lg"
              >
                ← Wróć
              </button>
              <button
                onClick={handleGoTo3}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-[12px] font-medium uppercase tracking-[0.6px] bg-[#212121] text-white rounded-full hover:opacity-80 transition-opacity"
              >
                Dalej →
              </button>
            </div>
          </>
        )}

        {/* Step 3 */}
        {step === 3 && selectedProduct && (
          <>
            <div className="px-6 pt-6 flex items-start justify-between gap-4">
              <div>
                <div className="text-[20px] font-normal tracking-[-0.01em]">Podsumowanie kampanii</div>
                <div className="text-[13px] text-[#6b6b6b] mt-1">
                  Sprawdź ustawienia przed uruchomieniem.
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 bg-[#f5f4f1] border border-[#cdcdcd] flex items-center justify-center text-[14px] text-[#6b6b6b] hover:bg-[#e0dad0] transition-colors shrink-0"
              >
                ✕
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              {/* Dark summary */}
              <div className="bg-[#212121] text-white p-6">
                <div className="text-[10px] font-medium uppercase tracking-[1px] text-white/40 mb-4">
                  Twoja kampania
                </div>
                {[
                  ["Produkt", `${selectedProduct.emoji} ${selectedProduct.name}`],
                  ["Model", "CPC"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between items-baseline py-[7px]">
                    <span className="text-[13px] text-white/60">{k}</span>
                    <span className="text-[14px] font-medium">{v}</span>
                  </div>
                ))}
                <div className="h-px bg-white/10 my-3" />
                <div className="flex justify-between items-baseline py-[7px]">
                  <span className="text-[13px] text-white/60">Stawka CPC</span>
                  <span className="font-mono text-[14px] font-medium">{fmt(cpcNum)}</span>
                </div>
                <div className="flex justify-between items-baseline py-[7px]">
                  <span className="text-[13px] text-white/60">Budżet dzienny</span>
                  <span className="text-[32px] font-normal tracking-[-0.02em]">
                    {fmt(budgetNum)}
                  </span>
                </div>
                <div className="h-px bg-white/10 my-3" />
                {[
                  ["Szac. kliknięcia / dzień", `${estClicks} kliknięć`],
                  ["Szac. wyświetlenia / dzień", estViews.toLocaleString("pl-PL") + " wyświetleń"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between items-baseline py-[7px]">
                    <span className="text-[13px] text-white/60">{k}</span>
                    <span className="font-mono text-[14px] font-medium">{v}</span>
                  </div>
                ))}
                <div className="mt-3.5 px-3.5 py-2.5 bg-white/[0.08] text-[12px] text-white/70 leading-[1.6]">
                  Kampania <strong className="text-white">zatrzymuje się automatycznie</strong> po
                  wyczerpaniu budżetu dziennego. Otrzymasz powiadomienie e-mail.
                </div>
              </div>

              <div className="border border-[#cdcdcd] p-[18px] bg-white text-[13px] leading-[1.7]">
                Po kliknięciu <strong>„Aktywuj kampanię"</strong> Twój produkt zacznie pojawiać się
                wyżej w wynikach. Możesz edytować lub wstrzymać kampanię w dowolnym momencie.
              </div>
            </div>

            <div className="px-6 py-4 border-t border-[#cdcdcd] bg-[#f5f4f1] flex justify-between gap-2.5">
              <button
                onClick={() => onGoTo(2)}
                className="inline-flex items-center h-8 px-3 text-[13px] font-medium text-[#212121] hover:bg-[#e0dad0] transition-colors rounded-lg"
              >
                ← Wróć
              </button>
              <button
                onClick={handleActivate}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-[12px] font-medium uppercase tracking-[0.6px] bg-[#212121] text-white rounded-full hover:opacity-80 transition-opacity"
              >
                Aktywuj kampanię
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────

interface ToastState {
  visible: boolean;
  icon: string;
  message: string;
}

function Toast({ state }: { state: ToastState }) {
  return (
    <div
      className={`fixed bottom-6 right-6 bg-[#212121] text-white px-5 py-3 flex items-center gap-2.5 max-w-[360px] shadow-2xl z-[999] transition-all duration-300 ${
        state.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[70px] pointer-events-none"
      }`}
    >
      <span>{state.icon}</span>
      <span className="text-[13px] font-medium">{state.message}</span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PromotedPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState<WizardStep>(1);
  const [toast, setToast] = useState<ToastState>({ visible: false, icon: "", message: "" });
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((icon: string, message: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ visible: true, icon, message });
    toastTimerRef.current = setTimeout(() => setToast((t) => ({ ...t, visible: false })), 4000);
  }, []);

  function openWizard() {
    setWizardStep(1);
    setWizardOpen(true);
  }

  function closeWizard() {
    setWizardOpen(false);
  }

  function handleActivate(data: Omit<Campaign, "id" | "views" | "clicks" | "spent">) {
    const campaign: Campaign = { ...data, id: Date.now(), views: 0, clicks: 0, spent: 0 };
    setCampaigns((prev) => {
      const next = [...prev, campaign];
      setSelectedIdx(next.length - 1);
      return next;
    });
    closeWizard();
    showToast("✓", `Kampania uruchomiona · ${campaign.product} pojawia się wyżej w wynikach.`);

    // Live simulation
    let ticks = 0;
    const iv = setInterval(() => {
      ticks++;
      setCampaigns((prev) => {
        const idx = prev.findIndex((c) => c.id === campaign.id);
        if (idx === -1) { clearInterval(iv); return prev; }
        const c = prev[idx];
        if (c.status !== "active") { clearInterval(iv); return prev; }
        const newViews = c.views + Math.floor(Math.random() * 70 + 15);
        const clicked = Math.random() > 0.58;
        const newClicks = c.clicks + (clicked ? 1 : 0);
        const newSpent = Math.min(c.budget, c.spent + (clicked ? c.cpc : 0));
        const exhausted = newSpent >= c.budget;
        const updated: Campaign = {
          ...c,
          views: newViews,
          clicks: newClicks,
          spent: newSpent,
          status: exhausted ? "paused" : "active",
        };
        if (exhausted) {
          clearInterval(iv);
          showToast("⚠", "Budżet dzienny wyczerpany · kampania wstrzymana automatycznie.");
        }
        const next = [...prev];
        next[idx] = updated;
        return next;
      });
      if (ticks > 18) clearInterval(iv);
    }, 2400);
  }

  function togglePause(i: number) {
    setCampaigns((prev) => {
      const next = [...prev];
      const c = { ...next[i] };
      c.status = c.status === "active" ? "paused" : "active";
      next[i] = c;
      showToast(
        c.status === "active" ? "▶" : "⏸",
        c.status === "active" ? "Kampania wznowiona." : "Kampania wstrzymana."
      );
      return next;
    });
  }

  const hasCampaigns = campaigns.length > 0;

  return (
    <div className="min-h-screen bg-[#ece9e2] font-sans">
      <AnnBar />
      <SellerHeader />

      <div className="flex min-h-[calc(100vh-36px-56px)]">
        <Sidebar />

        <main className="flex-1 px-12 py-10 max-w-[1080px]">
          {/* Prototype banner */}
          <div className="bg-[#e0dad0] border border-[#cdcdcd] px-4 py-2 mb-8 flex items-center gap-2.5 font-mono text-[11px] text-[#6b6b6b] uppercase tracking-[0.5px]">
            ■ Prototyp AT-1 · Interaktywny Mock · Dane mockowane · Brak realnych transakcji
          </div>

          {/* Empty state */}
          {!hasCampaigns && (
            <div className="animate-in fade-in duration-200">
              <div className="flex items-end justify-between mb-8 pb-6 border-b border-[#cdcdcd]">
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-[0.8px] text-[#6b6b6b] mb-1.5">
                    Reklama
                  </div>
                  <div className="text-[28px] font-normal tracking-[-0.01em]">Promowane Produkty</div>
                  <div className="text-[14px] text-[#6b6b6b] mt-1 leading-[1.6] max-w-[48ch]">
                    Wyświetlaj swoje produkty wyżej w wynikach wyszukiwania. Płacisz tylko za
                    kliknięcia.
                  </div>
                </div>
              </div>
              <div className="bg-white border border-[#cdcdcd] px-10 py-24 text-center">
                <div className="text-[10px] font-medium uppercase tracking-[1px] text-[#6b6b6b] mb-4">
                  Pierwsze kroki
                </div>
                <div className="text-[24px] font-normal mb-3">Utwórz pierwszą kampanię</div>
                <div className="text-[14px] text-[#6b6b6b] max-w-[40ch] mx-auto mb-8 leading-[1.7]">
                  Promowane produkty pojawiają się wyżej gdy kupujący szukają powiązanych fraz.
                  Płacisz tylko gdy ktoś kliknie.
                </div>
                <button
                  onClick={openWizard}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-[12px] font-medium uppercase tracking-[0.6px] bg-[#212121] text-white rounded-full hover:opacity-80 transition-opacity"
                >
                  + &nbsp;Utwórz kampanię
                </button>
              </div>
            </div>
          )}

          {/* Dashboard */}
          {hasCampaigns && (
            <div className="animate-in fade-in duration-200">
              <div className="flex items-end justify-between mb-8 pb-6 border-b border-[#cdcdcd]">
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-[0.8px] text-[#6b6b6b] mb-1.5">
                    Reklama
                  </div>
                  <div className="text-[28px] font-normal tracking-[-0.01em]">Promowane Produkty</div>
                </div>
                <button
                  onClick={openWizard}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-[12px] font-medium uppercase tracking-[0.6px] bg-[#212121] text-white rounded-full hover:opacity-80 transition-opacity"
                >
                  + &nbsp;Nowa kampania
                </button>
              </div>

              <StatsGrid campaigns={campaigns} />

              <CampaignsTable
                campaigns={campaigns}
                selectedIdx={selectedIdx}
                onSelect={setSelectedIdx}
                onTogglePause={togglePause}
              />

              {selectedIdx !== null && campaigns[selectedIdx] && (
                <DetailPanel
                  campaign={campaigns[selectedIdx]}
                  onTogglePause={() => togglePause(selectedIdx)}
                  onEdit={openWizard}
                />
              )}
            </div>
          )}
        </main>
      </div>

      {wizardOpen && (
        <Wizard
          step={wizardStep}
          onClose={closeWizard}
          onGoTo={(s) => setWizardStep(s)}
          onActivate={handleActivate}
        />
      )}

      <Toast state={toast} />
    </div>
  );
}
