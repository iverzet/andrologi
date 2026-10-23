import { loadEnvConfig } from "@next/env";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { seedCities, seedDoctors } from "./seed-data";

loadEnvConfig(process.cwd());
const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!connectionString) throw new Error("Configurează DATABASE_URL înainte de seed.");
if (process.env.ALLOW_DEMO_SEED !== "true") throw new Error("Setează ALLOW_DEMO_SEED=true pentru a confirma inserarea datelor demonstrative.");
const db = new PrismaClient({ adapter: new PrismaPg({ connectionString, max: 2 }) });

async function main() {
  await db.$transaction(async (tx) => {
    for (const city of seedCities) {
      const existing = await tx.cityPage.findUnique({ where: { slug: city.slug } });
      if (existing && existing.id !== city.id) throw new Error("Seed oprit: un oraș existent nu aparține setului demonstrativ.");
      await tx.cityPage.upsert({ where: { slug: city.slug }, create: city, update: city });
    }
    for (const doctor of seedDoctors) {
      const existing = await tx.doctor.findUnique({ where: { slug: doctor.slug } });
      if (existing && (!existing.isDemo || existing.id !== doctor.id)) throw new Error("Seed oprit: profilul existent nu aparține setului demonstrativ.");
      await tx.doctor.upsert({ where: { slug: doctor.slug }, create: doctor, update: doctor });
    }
  }, { timeout: 30000 });
  const [cities, doctors] = await Promise.all([
    db.cityPage.count({ where: { id: { in: seedCities.map((city) => city.id) } } }),
    db.doctor.count({ where: { id: { in: seedDoctors.map((doctor) => doctor.id) }, isDemo: true } }),
  ]);
  if (cities !== 5 || doctors !== 10) throw new Error("Numărul de înregistrări demonstrative nu corespunde.");
  console.info(`Seed verificat: ${cities} orașe și ${doctors} profiluri demonstrative.`);
}
main().catch(() => { console.error("Seed eșuat. Verifică baza de date și eventualele conflicte cu date existente."); process.exitCode = 1; }).finally(() => db.$disconnect());
