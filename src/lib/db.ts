import "server-only";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
let client: PrismaClient | undefined;

export function getDb(): PrismaClient {
  if (client) return client;
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL trebuie configurată pentru accesul la baza de date.");
  }

  client = new PrismaClient({
    adapter: new PrismaPg({ connectionString, max: 5 }),
  });
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;
  return client;
}
