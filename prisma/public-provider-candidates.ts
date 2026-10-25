export type PublicProviderCandidate = {
  name: string;
  slug: string;
  kind: "CLINIC" | "DOCTOR";
  description: string;
  sourceUrl: string;
  publish: boolean;
  location: { city: string; address: string; phone?: string; email?: string };
  services: string[];
};

// Every entry is based on a public page controlled by the provider and retains that source link.
export const publicProviderCandidates: PublicProviderCandidate[] = [
  {
    name: "Centrul Medical Internațional București",
    slug: "cmib-andrologie-bucuresti",
    kind: "CLINIC",
    description: "Centru medical din București care prezintă servicii de andrologie pe site-ul oficial.",
    sourceUrl: "https://www.cmib.ro/specialitati/andrologie",
    publish: true,
    location: { city: "București", address: "Bulevardul Dacia nr. 103, Parter, Ap. 1, Sector 2, București", phone: "+40744649244" },
    services: ["Andrologie", "Evaluarea infertilității masculine", "Spermogramă"],
  },
  {
    name: "Dr. Silviu Andrei",
    slug: "dr-silviu-andrei-andrologie-bucuresti",
    kind: "DOCTOR",
    description: "Medic prezentat de CMIB în echipa de andrologie, cu activitate în urologie.",
    sourceUrl: "https://www.cmib.ro/specialitati/andrologie",
    publish: true,
    location: { city: "București", address: "Bulevardul Dacia nr. 103, Parter, Ap. 1, Sector 2, București", phone: "+40744649244" },
    services: ["Andrologie", "Consultație urologie"],
  },
  {
    name: "Centrul Medical Asteco",
    slug: "asteco-cluj-napoca-andrologie",
    kind: "CLINIC",
    description: "Centru din Cluj-Napoca care prezintă servicii de andrologie și consultații de specialitate.",
    sourceUrl: "https://astecomedical.ro/andrologie/",
    publish: true,
    location: { city: "Cluj-Napoca", address: "Strada Constantin Brâncuși 105, Cluj-Napoca", phone: "+40364260034", email: "office@astecomedical.ro" },
    services: ["Consultație andrologie", "Ecografie testiculară", "Ecografie vasculară peniană"],
  },
  {
    name: "Clinica Medisan Timișoara",
    slug: "clinica-medisan-timisoara-andrologie",
    kind: "CLINIC",
    description: "Clinică din Timișoara care listează consultații de andrologie și evaluarea fertilității masculine.",
    sourceUrl: "https://www.clinicamedisan.ro/servicii/urologie/",
    publish: true,
    location: { city: "Timișoara", address: "Strada Simion Bărnuțiu 62, etajul 1, Timișoara", phone: "+40772257716", email: "office@clinicamedisan.ro" },
    services: ["Consultație andrologie", "Evaluarea fertilității masculine", "Ecografie scrotală"],
  },
  {
    name: "Dr. Sergiu Danii",
    slug: "dr-sergiu-danii-iasi-andrologie",
    kind: "DOCTOR",
    description: "Medic primar urologie listat cu competență în andrologie și consultații în Iași de către rețeaua medicală.",
    sourceUrl: "https://www.reginamaria.ro/medici/dr-danii-sergiu",
    publish: true,
    location: { city: "Iași", address: "Campus Medical Iași, Strada Grigore Ureche 3, Iași", phone: "+40219268" },
    services: ["Consultație andrologie", "Control andrologie", "Consultație urologie"],
  },
  {
    name: "Medical On Group Brașov · Clinica ON",
    slug: "medical-on-group-clinica-on-brasov",
    kind: "CLINIC",
    description: "Clinică din Brașov care prezintă servicii de sănătate sexuală masculină și consultații de urologie.",
    sourceUrl: "https://www.medicalongroup.ro/medical-on-group-brasov/",
    publish: true,
    location: { city: "Brașov", address: "Strada Nicolae Iorga 16, Brașov", phone: "+40268547308" },
    services: ["Consultație urologie", "Evaluare sănătate sexuală masculină", "Ecografie generală"],
  },
];
