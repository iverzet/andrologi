import { CalendarDays, Phone } from "lucide-react";
export function MobileContactBar({ phone }: { phone?: string }) {
  return <div className="fixed inset-x-0 bottom-0 z-30 flex gap-3 border-t bg-white/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
    {phone && <a href={`tel:${phone.replace(/[^+0-9]/g, "")}`} className="flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-3 text-sm font-semibold"><Phone className="size-4" aria-hidden="true" />Sună clinica</a>}
    <a href="#programare" className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-sky-700 px-3 py-3 text-sm font-semibold text-white"><CalendarDays className="size-4" aria-hidden="true" />Cere o programare</a>
  </div>;
}
