export type PublicProviderCandidate = {
  name: string;
  slug: string;
  kind: "CLINIC" | "DOCTOR";
  description: string;
  sourceUrl: string;
  location: { city: string; address: string; phone?: string; email?: string };
  services: string[];
};

// Public sources are retained for verification. Imported candidates stay unpublished.
export const publicProviderCandidates: PublicProviderCandidate[] = [
  {
    name: "Centrul Medical Internațional București",
    slug: "cmib-andrologie-bucuresti",
    kind: "CLINIC",
    description: "Centru medical din București care prezintă servicii de andrologie pe site-ul oficial.",
    sourceUrl: "https://www.cmib.ro/specialitati/andrologie",
    location: { city: "București", address: "Bulevardul Dacia nr. 103, Parter, Ap. 1, Sector 2, București", phone: "+40744649244" },
    services: ["Andrologie", "Evaluarea infertilității masculine", "Spermogramă"],
  },
  {
    name: "Dr. Silviu Andrei",
    slug: "dr-silviu-andrei-andrologie-bucuresti",
    kind: "DOCTOR",
    description: "Medic prezentat de CMIB în echipa de andrologie, cu activitate în urologie.",
    sourceUrl: "https://www.cmib.ro/specialitati/andrologie",
    location: { city: "București", address: "Bulevardul Dacia nr. 103, Parter, Ap. 1, Sector 2, București", phone: "+40744649244" },
    services: ["Andrologie", "Consultație urologie"],
  },
];
