export type PublicProviderCandidate = {
  name: string;
  slug: string;
  kind: "CLINIC" | "DOCTOR";
  description: string;
  sourceUrl: string;
  photoUrl?: string;
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
    photoUrl: "https://cdn.prod.website-files.com/68a2e3cb7fc73ade85923e21/69ca5a38c699af11026e0600_Dr.%20Silviu-Andrei.png",
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
    photoUrl: "https://www.reginamaria.ro/sites/default/files/medic/danii_sergiu.png",
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
  {
    name: "Asist. Univ. Dr. Victor Madan",
    slug: "dr-victor-madan-andrologie-bucuresti",
    kind: "DOCTOR",
    description: "Medic primar urologie cu competență în andrologie, listat de Regina Maria pentru consultații în București.",
    sourceUrl: "https://www.reginamaria.ro/medici/asist-univ-dr-madan-victor",
    photoUrl: "https://www.reginamaria.ro/sites/default/files/medic/victor_madan.png",
    publish: true,
    location: { city: "București", address: "Policlinica Băneasa, Strada Ion Ionescu de la Brad 1A, Sector 1, București", phone: "+40219268" },
    services: ["Consultație andrologie", "Control andrologie", "Consultație urologie"],
  },
  {
    name: "Dr. Radu Varsandan",
    slug: "dr-radu-varsandan-andrologie-bucuresti",
    kind: "DOCTOR",
    description: "Medic primar urologie cu competență în andrologie, listat de Regina Maria pentru consultații în București.",
    sourceUrl: "https://www.reginamaria.ro/medici/dr-varsandan-radu",
    photoUrl: "https://www.reginamaria.ro/sites/default/files/medic/radu_varsandan.png",
    publish: true,
    location: { city: "București", address: "Policlinica Enescu, Strada George Enescu 14, Sector 1, București", phone: "+40219268" },
    services: ["Consultație andrologie", "Control andrologie", "Consultație urologie"],
  },
  {
    name: "Conf. Univ. Dr. Cristian Persu",
    slug: "dr-cristian-persu-andrologie-bucuresti",
    kind: "DOCTOR",
    description: "Medic urolog cu competență în andrologie, listat de Regina Maria pentru consultații în București și Prahova.",
    sourceUrl: "https://www.reginamaria.ro/medici/conf-univ-dr-persu-cristian",
    photoUrl: "https://www.reginamaria.ro/sites/default/files/medic/cristian_persu.png",
    publish: true,
    location: { city: "București", address: "Policlinica Sun Plaza, Calea Văcărești 391, Sector 4, București", phone: "+40219268" },
    services: ["Consultație andrologie", "Control andrologie", "Consultație urologie"],
  },
  {
    name: "Dr. Ion Perciuleac",
    slug: "dr-ion-perciuleac-andrologie-brasov",
    kind: "DOCTOR",
    description: "Medic specialist urologie, cu arii de interes în andrologie, medicină sexuală și infertilitate masculină, listat de Regina Maria în Brașov.",
    sourceUrl: "https://www.reginamaria.ro/medici/dr-perciuleac-ion",
    photoUrl: "https://www.reginamaria.ro/sites/default/files/medic/ion_perciuleac.png",
    publish: true,
    location: { city: "Brașov", address: "Campus Medical Brașov, Bulevardul Iuliu Maniu 49, Brașov", phone: "+40219268" },
    services: ["Consultație urologie", "Evaluare infertilitate masculină", "Ecografie scrotală"],
  },
  {
    name: "Dr. Marcel Mustea",
    slug: "dr-marcel-mustea-andrologie-cluj-napoca",
    kind: "DOCTOR",
    description: "Medic primar urologie, cu competențe în infertilitate și andrologie, listat de Regina Maria pentru consultații în Cluj-Napoca.",
    sourceUrl: "https://www.reginamaria.ro/medici/dr-mustea-marcel",
    photoUrl: "https://www.reginamaria.ro/sites/default/files/styles/large/public/medic/marcel_mustea3.png.webp?itok=iHj3x6Dp",
    publish: true,
    location: { city: "Cluj-Napoca", address: "Spital Cluj, Strada Dorobanților 29, Cluj-Napoca", phone: "+40219268" },
    services: ["Consultație andrologie", "Evaluare infertilitate masculină", "Ecografie scrotală"],
  },
];
