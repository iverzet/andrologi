export const site = {
  name: "Andrologi.ro",
  email: "contact@andrologi.ro",
  indexable: process.env.SITE_INDEXABLE === "true",
  specialty: "andrologie",
  locale: "ro_RO",
  description: "Găsește medici și clinici de andrologie în orașul tău. Explorează serviciile și tarifele într-un singur loc.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://andrologi.ro",
} as const;
