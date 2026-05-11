"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { products } from "@/data/products";
import { getSellerById } from "@/data/sellers";
import { Button } from "@/components/ui/button";

type WariantPromocji = {
  dni: 3 | 7 | 14;
  cena: number;
};

type Kampania = {
  wariant: WariantPromocji["dni"];
  produkty: string[];
};

const WARIANTY_PROMOCJI: WariantPromocji[] = [
  { dni: 3, cena: 19 },
  { dni: 7, cena: 39 },
  { dni: 14, cena: 69 },
];

const MAKS_PRODUKTOW = 3;
const SELLER_ID = "s11";

export default function SellerPromocjePage() {
  const produktySprzedawcy = useMemo(
    () => products.filter((product) => product.sellerId === SELLER_ID),
    []
  );

  const sprzedawca = getSellerById(SELLER_ID);

  const [modalOpen, setModalOpen] = useState(false);
  const [wybraneProdukty, setWybraneProdukty] = useState<string[]>([]);
  const [wybranyWariant, setWybranyWariant] = useState<WariantPromocji["dni"]>(7);
  const [zaakceptowanoWarunki, setZaakceptowanoWarunki] = useState(false);
  const [komunikat, setKomunikat] = useState<string | null>(null);
  const [aktywneKampanie, setAktywneKampanie] = useState<Kampania[]>([]);

  const wariant = WARIANTY_PROMOCJI.find((item) => item.dni === wybranyWariant) ?? WARIANTY_PROMOCJI[1];
  const lacznyKoszt = wybraneProdukty.length * wariant.cena;

  const promowaneProdukty = useMemo(() => {
    const mapa = new Map<string, WariantPromocji["dni"]>();
    for (const kampania of aktywneKampanie) {
      for (const produktId of kampania.produkty) {
        mapa.set(produktId, kampania.wariant);
      }
    }
    return mapa;
  }, [aktywneKampanie]);

  function otworzTworzenieKampanii(preselectedId?: string) {
    setModalOpen(true);
    setWybraneProdukty(preselectedId ? [preselectedId] : []);
    setWybranyWariant(7);
    setZaakceptowanoWarunki(false);
    setKomunikat(null);
  }

  function przelaczProdukt(id: string) {
    setKomunikat(null);
    setWybraneProdukty((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      if (prev.length >= MAKS_PRODUKTOW) {
        setKomunikat("Możesz promować maksymalnie 3 produkty w jednej kampanii.");
        return prev;
      }

      return [...prev, id];
    });
  }

  function utworzKampanie() {
    if (!wybraneProdukty.length) {
      setKomunikat("Wybierz przynajmniej 1 produkt do promocji.");
      return;
    }

    if (!zaakceptowanoWarunki) {
      setKomunikat("Zaakceptuj warunki promocji, aby kontynuować.");
      return;
    }

    setAktywneKampanie((prev) => [
      {
        wariant: wybranyWariant,
        produkty: wybraneProdukty,
      },
      ...prev,
    ]);

    setModalOpen(false);
    setKomunikat("Kampania została utworzona. Produkty są teraz promowane.");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <nav className="mb-6 text-xs text-warm-gray">
        <Link href="/" className="hover:text-charcoal">
          Strona główna
        </Link>
        <span className="mx-2">/</span>
        <span className="text-charcoal">Panel sprzedawcy</span>
      </nav>

      <div className="mb-8 rounded-2xl border border-black/10 bg-gradient-to-r from-[#f9f7f2] to-[#f0f7ff] p-6">
        <p className="mb-2 text-xs uppercase tracking-[0.14em] text-charcoal/65">Cold-start boost</p>
        <h1 className="mb-2 text-2xl font-medium text-charcoal md:text-3xl">Promocja ofert nowych sprzedawców</h1>
        <p className="text-sm text-charcoal/80">
          Sprzedawca: <span className="font-medium">{sprzedawca?.name ?? "Twoja marka"}</span>. Wybierz maksymalnie 3 produkty,
          ustaw czas promocji 3/7/14 dni i zatwierdź kampanię.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button onClick={() => otworzTworzenieKampanii()} className="h-10 px-4 text-sm">
            Utwórz kampanię
          </Button>
          <span className="text-xs text-charcoal/70">Bez płatności online w tym prototypie.</span>
        </div>
      </div>

      {komunikat ? (
        <div className="mb-6 rounded-lg border border-black/10 bg-white px-4 py-3 text-sm text-charcoal">
          {komunikat}
        </div>
      ) : null}

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium text-charcoal">Twoje produkty</h2>
          <p className="text-xs text-charcoal/60">Kliknij "Promuj produkt", aby zacząć od konkretnej oferty.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {produktySprzedawcy.map((produkt) => {
            const czasPromocji = promowaneProdukty.get(produkt.id);

            return (
              <article key={produkt.id} className="overflow-hidden rounded-xl border border-black/10 bg-white">
                <div className="relative aspect-[4/5] bg-[#f5f5f5]">
                  <Image src={produkt.images[0]} alt={produkt.name} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
                </div>
                <div className="space-y-2 p-4">
                  <p className="text-sm font-medium text-charcoal">{produkt.name}</p>
                  <p className="text-xs text-charcoal/65">{produkt.price} zł</p>
                  {czasPromocji ? (
                    <p className="inline-flex rounded-full bg-green-100 px-2 py-1 text-[11px] font-medium text-green-800">
                      Promowane: {czasPromocji} dni
                    </p>
                  ) : (
                    <p className="text-[11px] text-charcoal/55">Brak aktywnej promocji</p>
                  )}
                  <Button variant="outline" onClick={() => otworzTworzenieKampanii(produkt.id)} className="h-9 w-full text-sm">
                    Promuj produkt
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {modalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-8">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-medium text-charcoal">Utwórz kampanię promocyjną</h3>
                <p className="mt-1 text-sm text-charcoal/70">Wybierz czas promocji i produkty (maksymalnie 3).</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="rounded-md px-2 py-1 text-sm text-charcoal/70 hover:bg-black/5" type="button">
                Zamknij
              </button>
            </div>

            <div className="mb-6">
              <p className="mb-3 text-sm font-medium text-charcoal">Czas promocji i cena</p>
              <div className="grid gap-2 sm:grid-cols-3">
                {WARIANTY_PROMOCJI.map((item) => (
                  <label key={item.dni} className="cursor-pointer rounded-lg border border-black/10 p-3 text-sm hover:border-black/25">
                    <input
                      type="radio"
                      name="czas-promocji"
                      value={item.dni}
                      checked={wybranyWariant === item.dni}
                      onChange={() => setWybranyWariant(item.dni)}
                      className="mr-2"
                    />
                    {item.dni} dni - {item.cena} zł / produkt
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="mb-3 text-sm font-medium text-charcoal">Wybierz produkty</p>
              <div className="space-y-2">
                {produktySprzedawcy.map((produkt) => (
                  <label key={produkt.id} className="flex items-center justify-between rounded-lg border border-black/10 p-3 text-sm">
                    <span>
                      {produkt.name} <span className="text-charcoal/60">({produkt.price} zł)</span>
                    </span>
                    <input
                      type="checkbox"
                      checked={wybraneProdukty.includes(produkt.id)}
                      onChange={() => przelaczProdukt(produkt.id)}
                    />
                  </label>
                ))}
              </div>
              <p className="mt-2 text-xs text-charcoal/65">Wybrane: {wybraneProdukty.length} / {MAKS_PRODUKTOW}</p>
            </div>

            <div className="mb-4 rounded-lg bg-[#f7f8fb] p-4 text-sm">
              <p className="text-charcoal/80">Cena wariantu: {wariant.cena} zł / produkt</p>
              <p className="mt-1 font-medium text-charcoal">Łączny koszt: {wybraneProdukty.length} x {wariant.cena} zł = {lacznyKoszt} zł</p>
            </div>

            <label className="mb-5 flex items-center gap-2 text-sm text-charcoal/80">
              <input
                type="checkbox"
                checked={zaakceptowanoWarunki}
                onChange={(event) => setZaakceptowanoWarunki(event.target.checked)}
              />
              Akceptuję warunki promocji.
            </label>

            <div className="flex flex-wrap justify-end gap-2">
              <Button variant="outline" onClick={() => setModalOpen(false)}>
                Anuluj
              </Button>
              <Button onClick={utworzKampanie}>Utwórz kampanię</Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
