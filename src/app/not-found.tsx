import Link from "next/link";
export default function NotFound() {
  return <main id="continut" className="site-container py-24 text-center"><p className="eyebrow">404 · Pagina nu există</p><h1 className="mt-5 text-4xl font-semibold">Nu am găsit această pagină.</h1><p className="my-6 text-slate-600">Profilul sau orașul căutat nu se află în catalog.</p><Link href="/" className="inline-block rounded-lg bg-sky-700 px-6 py-3 text-white">Înapoi la pagina principală</Link></main>;
}
