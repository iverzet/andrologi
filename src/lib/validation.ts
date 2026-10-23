import { z } from "zod";

export const leadSchema = z.object({
  patientName: z.string().trim().min(2, "Introdu cel puțin două caractere.").max(100),
  patientPhone: z.string().trim().regex(/^(?:\\+40|0040|0)[0-9 ()-]{8,15}$/, "Introdu un număr de telefon valid din România."),
  city: z.string().min(1, "Alege orașul."),
  message: z.string().trim().max(1000, "Maximum 1.000 de caractere."),
  consent: z.boolean().refine(Boolean, "Confirmă acordul pentru a continua."),
});
export const partnershipSchema = z.object({
  clinicName: z.string().trim().min(2, "Introdu numele clinicii.").max(150),
  city: z.string().min(1, "Alege orașul."),
  contactName: z.string().trim().min(2, "Introdu persoana de contact.").max(100),
  phone: leadSchema.shape.patientPhone,
  email: z.email("Introdu o adresă de email validă."),
});
export type LeadInput = z.infer<typeof leadSchema>;
export type PartnershipInput = z.infer<typeof partnershipSchema>;
