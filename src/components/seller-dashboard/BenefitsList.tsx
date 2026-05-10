import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Widok, które produkty generują zwroty — zanim stracisz marżę",
  "Konkretne wskazówki co poprawiać: rozmiary, opisy, zdjęcia",
  "Program wspierający: studio pro-photo, szablony opisów, trening",
];

export function BenefitsList() {
  return (
    <section className="w-full py-12 md:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="space-y-6">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex gap-4 items-start">
              <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
              <span className="text-lg text-slate-700">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
