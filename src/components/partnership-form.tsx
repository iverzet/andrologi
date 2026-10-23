"use client";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { partnershipSchema, type PartnershipInput } from "@/lib/validation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function PartnershipForm({ cities }: { cities: string[] }) {
  const id = useId();
  const { register, handleSubmit } = useForm<PartnershipInput>({ resolver: zodResolver(partnershipSchema) });
  return <section id="parteneriat" className="rounded-2xl border bg-white p-6 sm:p-8">
    <h2 className="text-2xl font-semibold">Hai să vorbim despre clinica ta</h2>
    <p className="my-5 rounded-lg bg-amber-50 p-3 text-sm leading-6 text-amber-900">Formular în previzualizare. Înscrierile nu sunt încă deschise și nu colectăm date.</p>
    <form onSubmit={handleSubmit(() => undefined)}><fieldset disabled className="space-y-4 opacity-65"><legend className="sr-only">Date pentru parteneriat</legend>
      <div><Label htmlFor={id + "-clinic"}>Numele clinicii</Label><Input id={id + "-clinic"} {...register("clinicName")} /></div>
      <div><Label htmlFor={id + "-city"}>Oraș</Label><select id={id + "-city"} className="field mt-1" {...register("city")}><option value="">Alege orașul</option>{cities.map((city) => <option key={city}>{city}</option>)}</select></div>
      <div><Label htmlFor={id + "-name"}>Persoană de contact</Label><Input id={id + "-name"} autoComplete="name" {...register("contactName")} /></div>
      <div><Label htmlFor={id + "-phone"}>Telefon</Label><Input id={id + "-phone"} type="tel" autoComplete="tel" {...register("phone")} /></div>
      <div><Label htmlFor={id + "-email"}>Email profesional</Label><Input id={id + "-email"} type="email" autoComplete="email" {...register("email")} /></div>
      <Button type="submit" className="w-full">Înscrierile vor fi disponibile în curând</Button>
    </fieldset></form>
  </section>;
}
