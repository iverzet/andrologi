import Link from "next/link";
import { Button } from "@/components/ui/button";

export function DoctorFilters({ path, kind, service, services }: { path: string; kind: string; service: string; services: string[] }) {
  return <form action={path} method="get" className="flex flex-wrap items-end gap-4 rounded-xl border bg-white p-4">
    <div className="flex-1"><label htmlFor="tip" className="mb-2 block text-sm font-medium">Tip de profil</label><select id="tip" name="tip" defaultValue={kind} className="field"><option value="">Toate profilurile</option><option value="DOCTOR">Medici</option><option value="CLINIC">Clinici</option></select></div>
    <div className="flex-1"><label htmlFor="serviciu" className="mb-2 block text-sm font-medium">Serviciu</label><select id="serviciu" name="serviciu" defaultValue={service} className="field"><option value="">Toate serviciile</option>{services.map((item) => <option key={item}>{item}</option>)}</select></div>
    <Button type="submit" className="h-11 bg-sky-700">Aplică filtrele</Button><Link href={path} className="py-3 text-sm text-slate-600 underline">Resetează</Link>
  </form>;
}
