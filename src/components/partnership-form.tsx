"use client";
import { useId, useRef, useState } from "react";
import Link from "next/link";
import { submitPartnership } from "@/app/actions/requests";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { partnershipSchema, type PartnershipInput, type ActionResult } from "@/lib/validation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function PartnershipForm({ cities }: { cities: string[] }) {
  const id = useId();
  const requestId = useRef<string | null>(null);
  const website = useRef<HTMLInputElement>(null);
  const [result, setResult] = useState<ActionResult | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PartnershipInput>({ resolver: zodResolver(partnershipSchema), defaultValues: { consent: false } });
  async function onSubmit(data: PartnershipInput) {
    requestId.current ??= crypto.randomUUID();
    try { setResult(await submitPartnership(data, { requestId: requestId.current, website: website.current?.value || "" })); }
    catch { setResult({ ok: false, message: "Conexiunea a fost întreruptă. Reîncearcă trimiterea." }); }
  }
  return <section id="parteneriat" className="rounded-2xl border bg-white p-6 sm:p-8">
    <h2 className="text-2xl font-semibold">Hai să vorbim despre clinica ta</h2>
    <p className="my-5 text-sm leading-6 text-slate-600">Lasă-ne datele de contact pentru a discuta condițiile de colaborare.</p>
    {result && <p role={result.ok ? "status" : "alert"} className="my-4 rounded-lg bg-sky-50 p-4 text-sm">{result.message}</p>}
    <form onSubmit={(event) => { void handleSubmit(onSubmit)(event); }}><div className="hidden" aria-hidden="true"><label>Website<input ref={website} name="website" tabIndex={-1} autoComplete="off" /></label></div><fieldset disabled={isSubmitting || result?.ok} className="space-y-4 disabled:opacity-65"><legend className="sr-only">Date pentru parteneriat</legend>
      <div><Label htmlFor={id + "-clinic"}>Numele clinicii</Label><Input id={id + "-clinic"} {...register("clinicName")} /></div>
      <div><Label htmlFor={id + "-city"}>Oraș</Label><select id={id + "-city"} className="field mt-1" {...register("city")}><option value="">Alege orașul</option>{cities.map((city) => <option key={city}>{city}</option>)}</select></div>
      <div><Label htmlFor={id + "-name"}>Persoană de contact</Label><Input id={id + "-name"} autoComplete="name" {...register("contactName")} /></div>
      <div><Label htmlFor={id + "-phone"}>Telefon</Label><Input id={id + "-phone"} type="tel" autoComplete="tel" {...register("phone")} /></div>
      <div><Label htmlFor={id + "-email"}>Email profesional</Label><Input id={id + "-email"} type="email" autoComplete="email" {...register("email")} /></div>
      <label className="flex items-start gap-2 text-xs leading-5"><input type="checkbox" className="mt-1" {...register("consent")} /><span>Sunt de acord să fiu contactat pentru această cerere, conform <Link href="/confidentialitate" className="underline">informării de confidențialitate</Link>.</span></label>
      {Object.entries(errors).map(([field,error]) => <p role="alert" key={field} className="text-sm text-destructive">{error.message}</p>)}
      <Button type="submit" className="w-full">{isSubmitting ? "Se trimite…" : result?.ok ? "Cerere înregistrată" : "Solicită un parteneriat"}</Button>
    </fieldset></form>
  </section>;
}
