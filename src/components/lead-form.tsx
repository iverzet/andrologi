"use client";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole } from "lucide-react";
import { leadSchema, type LeadInput } from "@/lib/validation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function LeadForm({ cities, city = "", doctorName }: { cities: string[]; city?: string; doctorName?: string }) {
  const id = useId();
  const { register, handleSubmit, formState: { errors } } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema), defaultValues: { city, consent: false, message: "" },
  });
  return <section id="programare" className="scroll-mt-8 rounded-2xl border bg-white p-6 shadow-sm sm:p-8" aria-labelledby={id + "-title"}>
    <p className="eyebrow"><LockKeyhole className="inline size-4" aria-hidden="true" /> Un pas, în ritmul tău</p>
    <h2 id={id + "-title"} className="mt-3 text-2xl font-semibold">Cere o programare</h2>
    <p className="mt-3 text-sm leading-6 text-slate-600">{doctorName ? `Profil selectat: ${doctorName}` : "Alege orașul și lasă-ne datele de contact după activarea serviciului."}</p>
    <p id={id + "-notice"} className="my-5 rounded-lg bg-amber-50 p-3 text-sm leading-6 text-amber-900">Previzualizare: trimiterea nu este încă activă. Câmpurile sunt dezactivate; nu colectăm și nu trimitem date personale.</p>
    <form onSubmit={handleSubmit(() => undefined)} aria-describedby={id + "-notice"}>
      <fieldset disabled className="space-y-4 opacity-65"><legend className="sr-only">Date pentru solicitarea programării</legend>
        <div><Label htmlFor={id + "-name"}>Nume</Label><Input id={id + "-name"} autoComplete="name" {...register("patientName")} /><p className="text-sm text-destructive">{errors.patientName?.message}</p></div>
        <div><Label htmlFor={id + "-phone"}>Telefon</Label><Input id={id + "-phone"} type="tel" autoComplete="tel" {...register("patientPhone")} /><p className="text-sm text-destructive">{errors.patientPhone?.message}</p></div>
        <div><Label htmlFor={id + "-city"}>Oraș</Label><select id={id + "-city"} className="field mt-1" {...register("city")}><option value="">Alege orașul</option>{cities.map((name) => <option key={name}>{name}</option>)}</select></div>
        <div><Label htmlFor={id + "-message"}>Mesaj scurt (opțional)</Label><textarea id={id + "-message"} rows={3} maxLength={1000} className="field mt-1 h-auto" {...register("message")} /></div>
        <label className="flex items-start gap-2 text-xs leading-5"><input type="checkbox" className="mt-1" {...register("consent")} />Sunt de acord să fiu contactat în legătură cu această solicitare.</label>
        <Button type="submit" className="w-full">Trimiterea va fi disponibilă în curând</Button>
      </fieldset>
    </form>
  </section>;
}
