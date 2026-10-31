export const site = {
  name: "Andrologi.ro",
  email: "contact@andrologi.ro",
  // Production is indexable by default. Set SITE_INDEXABLE=false only for a
  // staging environment or while an incident requires temporary de-indexing.
  indexable: process.env.SITE_INDEXABLE !== "false",
  specialty: "andrologie",
  specialistLabel: "Andrologi",
  locale: "ro_RO",
  description: "Găsește medici și clinici de andrologie în orașul tău. Compară servicii și trimite o cerere de contact în siguranță.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://andrologi.ro",
} as const;
