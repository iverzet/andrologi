# Proctologi.ro

Portal medical în limba română, în repository-ul public `iverzet/medici`.

## Stadiu — etapa 2, pașii 1 și 2

Implementate: catalogul pe orașe, profiluri, homepage, FAQ, pagina B2B, filtre GET, metadata OpenGraph, JSON-LD pentru profiluri reale și interfața formularelor. Formularele sunt dezactivate explicit: nu colectează, nu salvează și nu trimit date. Server Actions, emailurile, administrarea și exportul CSV apar în pașii următori.

Toate paginile sunt încă `noindex, nofollow`, până la activarea portalului cu date reale. Sitemap-ul și regulile finale robots apar în etapa de verificare finală.

## Mediu și comenzi

Node.js 24 și npm. Instalare: `npm ci`. Copiază `.env.example` în `.env.local` și completează configurația pentru modul dorit.

- `npm run lint`
- `npm run type-check`
- `npm run db:validate`
- `npm run build`
- `npm run start -- --port 3107` — preview al build-ului de producție.
- `npm run dev` — dezvoltare, după verificarea configurației.

## Catalog demonstrativ fără bază de date

Setează explicit `DEMO_MODE=true` în `.env.local`. Pagina utilizează setul din `prisma/seed-data.ts`, fără conexiuni PostgreSQL. Acest mod nu este activat automat când baza de date lipsește sau eșuează. Setează `NEXT_PUBLIC_SITE_URL` la URL-ul preview-ului.

Setul conține București, Cluj-Napoca, Timișoara, Iași și Brașov, cu câte două profiluri fictive. Toate numele, adresele, telefoanele, ratingurile și tarifele sunt demonstrative. Adresele de email folosesc domeniul rezervat `example.invalid`. Nu există linkuri de apel sau hărți pentru profilurile fictive. Aceste profiluri nu sunt emise drept entități medicale reale în JSON-LD.

## PostgreSQL prin Vercel / Neon

Proiect: `invitatii/medici`. Instalează integrarea Neon prin Vercel Marketplace, plan gratuit, regiune Frankfurt. Prima instalare necesită acceptarea termenilor furnizorului de către proprietar. Verifică proiectul selectat înainte de conectare și nu reutiliza o bază de date a altui proiect.

După provisionare, importă `DATABASE_URL` din mediul Vercel într-un fișier local ignorat. `DIRECT_URL` este opțional și poate folosi conexiunea Neon fără pooling pentru migrații. Nu afișa sau publica valorile reale. Nu publica `.env.local`, exporturi sau date ale pacienților.

Într-o bază dedicată demonstrației:

1. Setează `DEMO_MODE=false`, configurează `DATABASE_URL` și verifică legătura Vercel.
2. Rulează `npm run db:migrate` pentru migrația inițială versionată.
3. Setează temporar `ALLOW_DEMO_SEED=true`.
4. Rulează `npm run db:seed` de două ori; fiecare rulare trebuie să confirme cinci orașe și zece profiluri demonstrative, fără duplicate.
5. Revino la `ALLOW_DEMO_SEED=false`.

Seed-ul folosește o tranzacție și `upsert` pe slug-uri. ID-urile sunt stabile. Refuză suprascrierea unui oraș cu alt ID sau a unui profil real. Nu șterge înregistrări și nu atinge programări. Nu include seed sau migrații în comanda de build.

Prisma CLI încarcă mediul prin `@next/env`. Fără `DEMO_MODE=true`, catalogul citește PostgreSQL și o eroare este prezentată prin pagina de eroare, nu înlocuită tacit cu date fictive. Migrațiile și seed-ul necesită o bază de date reală; build-ul poate fi executat fără acces la aceasta, fiindcă rutele catalogului sunt randate la cerere.

## Rute

- `/` — căutare, orașe, promovări, FAQ și formular în previzualizare.
- `/proctologi-bucuresti`, `/proctologi-cluj`, `/proctologi-timisoara`, `/proctologi-iasi`, `/proctologi-brasov`.
- `/medici/demo-medic-bucuresti` — exemplu de profil; slug-urile vin din catalog.
- `/pentru-clinici` — prezentarea parteneriatului și formular în previzualizare.

Filtrele folosesc `?tip=DOCTOR` / `?tip=CLINIC` și `serviciu`. Un serviciu fără rezultate afișează o stare goală și resetare. Slug-urile inexistente afișează 404.

## Arhitectură

`src/lib/catalog.ts` este exclusiv pentru server și reutilizează citirile în aceeași randare. Componentele interactive primesc doar date serializabile. `src/lib/seo.ts` construiește metadate canonice și escapează JSON-LD. Schema pentru medic este `Physician`, iar pentru clinică `MedicalBusiness`; ratingurile demonstrative nu sunt publicate ca recenzii structurate.

Identitatea portalului este centralizată în `src/config/site.ts`. Formularele folosesc React Hook Form și Zod, fără endpoint de trimitere în această etapă. La activare sunt necesare validare server, consimțământ, politici publicate și controlul accesului la solicitări.

## Observații despre dependențe

Auditul inițial al dependențelor de producție raportează zero vulnerabilități. Auditul complet raportează cinci alerte ridicate în lanțul `eslint-config-next → fast-glob → micromatch → braces` (GHSA-vfj7-8cjw-p6xm). Nu aplica automat retrogradarea majoră sugerată de `npm audit fix --force`.

ESLint 9 este păstrat pentru compatibilitatea declarată de `eslint-plugin-react`. Adaptorul formularelor este `@hookform/resolvers` 5, compatibil cu Zod 4; versiunea 6 a produs un conflict de dependențe opționale la instalare, astfel că nu s-a folosit `--force` sau `--legacy-peer-deps`.

## Verificare efectuată — 23 octombrie 2026

Integrarea Neon `medici-db` a fost creată în Frankfurt și conectată la proiectul Vercel `medici`. Migrația inițială a fost aplicată. Două rulări consecutive ale seed-ului au confirmat cinci orașe și zece profiluri, fără duplicate. Tabelele Lead și PartnershipRequest sunt goale.

Preview-ul local folosește acum PostgreSQL (`DEMO_MODE=false`). Rutele principale și filtrele au fost verificate cu date din baza de date; rutele inexistente răspund cu 404. Verificările de lint, TypeScript, Prisma și build au trecut, împreună cu testele datelor de seed, filtrelor, validării și escapării JSON-LD. Interfața a fost verificată la lățimi mobile și desktop, fără depășire orizontală în paginile testate.

Neon furnizează `DATABASE_URL_UNPOOLED`; configurația Prisma și seed-ul o folosesc automat pentru conexiunea directă, dacă `DIRECT_URL` nu este definită. Driverul PostgreSQL poate emite un avertisment despre viitoarea schimbare a semanticii `sslmode=require`; versiunea instalată verifică în prezent certificatul ca `verify-full`.
