export const site = {
  name: "Proctologi.ro",
  specialty: "proctologie",
  locale: "ro_RO",
  description: "Un loc dedicat informațiilor despre proctologie și găsirii unui specialist în orașul tău.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
} as const;
