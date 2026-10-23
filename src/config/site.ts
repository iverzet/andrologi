export const site = {
  name: "Proctologi.ro",
  specialty: "proctologie",
  locale: "ro_RO",
  description: "Găsește medici și clinici de proctologie în orașul tău. Explorează serviciile și tarifele într-un singur loc.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
} as const;
