# Proctologi.ro

Portal medical în limba română, dezvoltat în repository-ul public `iverzet/medici`.

## Stadiu

Pasul 1: fundația Next.js App Router, React, TypeScript, Tailwind CSS, componente UI în convenția shadcn/ui și Prisma pentru PostgreSQL. Pagina inițială explică stadiul proiectului și este exclusă de la indexare. Nu colectează date și nu oferă încă programări.

Profilurile, paginile orașelor, formularele, autentificarea, exportul CSV, emailurile și seed-ul apar în etapele următoare. Schema de date este definită, dar nu există încă migrații aplicate sau o bază de date provisionată.

## Mediu

Node.js 24 și npm. Instalează dependențele cu `npm ci`.

Copiază `.env.example` în `.env.local`, apoi configurează `DATABASE_URL` prin integrarea Neon din proiectul Vercel `medici`. `DIRECT_URL` poate indica o conexiune directă pentru migrații. `NEXT_PUBLIC_SITE_URL` este URL-ul public al aplicației, fără cale suplimentară.

Nu salva parole, URL-uri reale de conectare, exporturi sau date de pacienți în Git. `.env.local`, `.vercel`, fișierele generate Prisma și rezultatul build-ului sunt ignorate.

## Comenzi

- `npm run lint` — ESLint.
- `npm run type-check` — generare client Prisma și tipuri Next.js, apoi TypeScript.
- `npm run db:validate` — verificare schema Prisma.
- `npm run db:generate` — generare client Prisma.
- `npm run build` — generare Prisma și build Next.js.
- `npm run start` — server pentru build-ul de producție.
- `npm run dev` — server de dezvoltare, după configurarea mediului.
- `npm run db:migrate` — aplicarea migrațiilor existente, după conectarea bazei de date. În această etapă nu există încă migrații.

Lint, generarea clientului și build-ul paginii inițiale nu necesită baza de date. `getDb()` verifică explicit `DATABASE_URL` când este apelat, fără a substitui date fictive. Prisma CLI încarcă aceleași fișiere de mediu ca Next.js prin `@next/env`.

## Structură

- `src/config/site.ts` — identitatea portalului și specialitatea.
- `src/app` — layout, pagina inițială și tema medicală.
- `src/components/ui` — Button, Card, Input, Label; componente locale configurate prin `components.json`.
- `src/lib/db.ts` — client Prisma exclusiv pentru server, cu reutilizarea conexiunilor.
- `prisma/schema.prisma` — Doctor, Lead, CityPage și PartnershipRequest.

Schema separă cererile B2B de programările pacienților. Profilurile pot fi marcate demonstrative; ratingul este opțional. Consimțământul programărilor are dată și versiune. Implementarea formularelor și controlul accesului fac parte din etapele următoare.

## Vercel

Proiectul remote se numește `medici`. Setează framework-ul Next.js, Node.js 24 și comanda de build `npm run build`. Configurează baza de date prin Vercel Marketplace și variabile distincte pentru dezvoltare, preview și producție. Verifică legătura GitHub înaintea primului deployment. Nu executa migrații sau seed automat la fiecare build.

Domeniul proctologi.ro nu este încă conectat. Elimină `robots: { index: false, follow: false }` numai odată cu publicarea conținutului real și implementarea regulilor SEO pentru rutele private și demonstrative.

## Observații despre dependențe

La inițializare, `npm audit --omit=dev` raportează zero vulnerabilități. Auditul complet raportează cinci alerte ridicate în lanțul de dezvoltare `eslint-config-next → fast-glob → micromatch → braces` (GHSA-vfj7-8cjw-p6xm). Registry-ul nu oferă încă o versiune `braces` corectată. Nu aplica automat retrogradarea majoră sugerată de `npm audit fix --force`.

ESLint 9 este păstrat pentru compatibilitatea declarată de `eslint-plugin-react`; npm îl marchează ca nesuportat. Reevaluatează actualizarea coordonată a configurației Next.js și pluginului React când acestea declară suport pentru ESLint 10.
