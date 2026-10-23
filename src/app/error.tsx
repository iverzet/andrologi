"use client";
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main id="continut" className="site-container py-24 text-center"><h1 className="text-3xl font-semibold">Catalogul nu poate fi încărcat momentan.</h1><p className="my-6 text-slate-600">Te rugăm să încerci din nou în câteva momente.</p><button onClick={reset} className="rounded-lg bg-sky-700 px-6 py-3 text-white">Încearcă din nou</button></main>;
}
