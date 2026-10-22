import { ArrowDown, ArrowUpRight, HeartPulse, MapPin, ShieldCheck, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { site } from "@/config/site";

const principles = [
  { number: "01", icon: MapPin, title: "Mai aproape de tine", text: "Un punct de pornire pentru a găsi un specialist în orașul tău." },
  { number: "02", icon: ShieldCheck, title: "Discreție, la fiecare pas", text: "Un subiect personal merită o abordare atentă și respectuoasă." },
  { number: "03", icon: Stethoscope, title: "Informații pe înțelesul tău", text: "Un spațiu clar, dedicat proctologiei și alegerii unui specialist." },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-10">
      <header className="flex min-h-24 items-center justify-between gap-4 border-b border-border">
        <Link href="/" className="flex items-center gap-2.5 text-xl font-semibold tracking-tight" aria-label={`${site.name} — pagina principală`}>
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-white"><HeartPulse aria-hidden="true" className="size-6" /></span>
          <span>proctologi<span className="text-primary">.ro</span></span>
        </Link>
        <a href="#despre" className="flex items-center gap-2 text-sm font-medium hover:text-primary">Despre proiect <ArrowUpRight aria-hidden="true" className="size-4" /></a>
      </header>
      <main id="continut">
        <section className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:gap-20" aria-labelledby="titlu">
          <div>
            <p className="mb-7 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary"><span className="size-2 rounded-full bg-primary" /> Un nou spațiu pentru sănătatea ta</p>
            <h1 id="titlu" className="max-w-3xl text-5xl leading-[1.08] font-semibold tracking-tight sm:text-6xl lg:text-7xl">Primul pas către<br /><span className="text-primary">mai multă liniște.</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">Pregătim un loc în care să găsești mai ușor informații despre proctologie și specialiști din orașul tău. Cu claritate, grijă și discreție.</p>
            <Button asChild size="lg" className="mt-9"><a href="#despre">Descoperă proiectul <ArrowDown aria-hidden="true" /></a></Button>
          </div>
          <aside className="relative rounded-3xl border border-sky-100 bg-sky-50 p-8 sm:p-10" aria-label="Stadiul platformei">
            <div className="mb-10 flex size-16 items-center justify-center rounded-2xl bg-white text-primary shadow-sm"><HeartPulse aria-hidden="true" className="size-9" strokeWidth={1.5} /></div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Proctologi.ro</p>
            <h2 className="mt-3 text-3xl leading-tight font-semibold tracking-tight">O conversație delicată.<br />Un început simplu.</h2>
            <div className="mt-10 border-t border-sky-200 pt-6">
              <span className="rounded-full border border-sky-200 bg-white px-3 py-1 text-xs font-medium">În pregătire</span>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">Platforma este în curs de dezvoltare. Programările și listările de medici nu sunt încă disponibile.</p>
            </div>
          </aside>
        </section>
        <section id="despre" className="scroll-mt-8 border-t border-border py-12 sm:py-16" aria-labelledby="despre-titlu">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 id="despre-titlu" className="text-2xl font-semibold tracking-tight sm:text-3xl">Construit în jurul nevoilor tale.</h2>
            <p className="text-sm text-muted-foreground">Claritate. Respect. Accesibilitate.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">{principles.map(({ number, icon: Icon, title, text }) => (
            <Card key={number} className="shadow-none"><CardContent className="p-6">
              <div className="mb-8 flex items-center justify-between"><Icon aria-hidden="true" className="size-6 text-primary" strokeWidth={1.5} /><span className="text-xs text-muted-foreground">{number}</span></div>
              <h3 className="text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
            </CardContent></Card>
          ))}</div>
        </section>
      </main>
      <footer className="flex flex-col justify-between gap-3 border-t border-border py-7 text-xs leading-5 text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <p>Informațiile platformei nu înlocuiesc consultația medicală.</p>
      </footer>
    </div>
  );
}
