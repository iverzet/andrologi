const questions = [
  ["Cum aleg un specialist?", "Compară informațiile despre specialitate, localizare, servicii și tarife. Confirmă direct cu clinica experiența medicului și condițiile consultației înainte de programare."],
  ["Cum aflu prețul consultației?", "Tarifele afișate sunt orientative. Clinica îți poate confirma prețul și eventualele costuri suplimentare înaintea consultației. În versiunea demo, toate tarifele sunt fictive."],
  ["Pot trimite o cerere de programare?", "Formularele sunt prezentate în această etapă pentru previzualizare. Trimiterea va fi disponibilă după activarea serviciului; momentan nu sunt salvate sau trimise date."],
  ["Ce înseamnă un profil Demo?", "Este un exemplu fictiv pentru testarea platformei. Numele, adresa, serviciile, ratingul și tarifele nu descriu un medic sau o clinică reală."],
];
export function FAQ() {
  return <section id="intrebari" className="section-space scroll-mt-8"><div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="eyebrow">Întrebări frecvente</p><h2 className="section-title">Mai multă claritate.<br />Mai puține griji.</h2><p className="mt-4 max-w-sm text-slate-600 leading-7">Câteva răspunsuri despre alegerea unui specialist și folosirea platformei.</p></div><div className="divide-y rounded-2xl border bg-white px-6">{questions.map(([q,a]) => <details key={q} className="group py-5"><summary className="cursor-pointer pr-4 font-semibold">{q}</summary><p className="mt-4 text-sm leading-7 text-slate-600">{a}</p></details>)}</div></div></section>;
}
