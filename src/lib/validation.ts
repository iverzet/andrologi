import { z } from "zod";

export function normalizePhone(value: string) {
  const compact = value.replace(/[ ()-]/g, "");
  if (compact.startsWith("0040")) return "+40" + compact.slice(4);
  if (compact.startsWith("0")) return "+40" + compact.slice(1);
  return compact;
}
const phone = z.string().trim().max(30).refine((value) => /^\+40[2-9][0-9]{8}$/.test(normalizePhone(value)), "Introdu un număr de telefon valid din România.");
const consent = z.boolean().refine(Boolean, "Confirmă acordul pentru a continua.");
export const leadSchema = z.object({
  patientName: z.string().trim().min(2, "Introdu cel puțin două caractere.").max(100),
  patientPhone: phone,
  patientEmail: z.union([z.email("Introdu un email valid.").max(254), z.literal("")]),
  city: z.string().trim().min(1, "Alege orașul.").max(100),
  preferredDate: z.string().refine((value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value), "Alege o dată validă."),
  message: z.string().trim().max(1000, "Maximum 1.000 de caractere."),
  consent,
});
export const partnershipSchema = z.object({
  clinicName: z.string().trim().min(2, "Introdu numele clinicii.").max(150),
  city: z.string().trim().min(1, "Alege orașul.").max(100),
  contactName: z.string().trim().min(2, "Introdu persoana de contact.").max(100),
  phone, email: z.email("Introdu o adresă de email validă.").max(254), consent,
});
export const submissionSchema = z.object({
  requestId: z.uuid(),
  website: z.string().max(200),
  doctorId: z.string().max(100).optional(),
});
export function validPreferredDate(value: string, now = new Date()) {
  if (!value) return true;
  const date = new Date(value + "T12:00:00Z");
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) return false;
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Bucharest", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
  return value >= today && date.getTime() <= now.getTime() + 366 * 86400000;
}
export type LeadInput = z.infer<typeof leadSchema>;
export type PartnershipInput = z.infer<typeof partnershipSchema>;
export type ActionResult = { ok: boolean; message: string; reference?: string };
