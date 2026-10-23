"use client";
import { useId } from "react";
import { useRouter } from "next/navigation";
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CitySelector({ cities }: { cities: { cityName: string; slug: string }[] }) {
  const router = useRouter();
  const id = useId();
  return <form className="rounded-2xl bg-white p-3 text-slate-900 shadow-lg shadow-slate-950/10" onSubmit={(event) => {
    event.preventDefault();
    const slug = new FormData(event.currentTarget).get("city");
    if (typeof slug === "string" && cities.some((city) => city.slug === slug)) router.push("/" + slug);
  }}>
    <label htmlFor={id} className="mb-2 block px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">În ce oraș cauți un specialist?</label>
    <div className="flex flex-col gap-3 sm:flex-row"><div className="flex min-w-0 flex-1 items-center gap-2 px-2"><MapPin className="size-5 shrink-0 text-sky-700" aria-hidden="true" /><select id={id} name="city" required defaultValue="" className="min-h-11 w-full min-w-0 bg-white text-base"><option value="" disabled>Alege orașul</option>{cities.map((city) => <option key={city.slug} value={city.slug}>{city.cityName}</option>)}</select></div><Button type="submit" size="lg" className="bg-sky-700 hover:bg-sky-800">Caută <ArrowRight aria-hidden="true" /></Button></div>
  </form>;
}
