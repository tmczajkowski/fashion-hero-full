'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const faqs = [
  {
    q: 'Kto przygotowuje raport?',
    a: 'Zespół analityków FashionHero — ludzie, nie boty. Codziennie zbierają ceny u 5 wskazanych konkurentów i co tydzień składają raport z rekomendacjami.',
  },
  {
    q: 'Gdzie znajdę swój raport?',
    a: 'W panelu sprzedawcy w sekcji Pricing Report. Co tydzień pojawia się nowy raport, a poprzednie zostają w historii. Dodatkowo dostajesz powiadomienie e-mail.',
  },
  {
    q: 'Co jeśli mam więcej niż 100 produktów?',
    a: 'W bazowej subskrypcji śledzimy 100 najpopularniejszych SKU z Twojego sklepu. Jeśli potrzebujesz więcej — odezwij się, dopasujemy ofertę.',
  },
  {
    q: 'Jak anulować subskrypcję?',
    a: 'Wystarczy jeden mail. Bez okresów wypowiedzenia, bez ukrytych warunków. Subskrypcja wygasa z końcem opłaconego okresu.',
  },
] as const

export function LandingFaq() {
  return (
    <section className="px-4 py-20">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-light text-charcoal mb-10">
          Najczęstsze pytania
        </h2>
        <Accordion className="border-t border-black/10">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-black/10">
              <AccordionTrigger className="text-charcoal text-base font-medium">{f.q}</AccordionTrigger>
              <AccordionContent className="text-charcoal/80 text-sm">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
