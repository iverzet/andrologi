import "server-only";
import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { keyedHash } from "@/lib/security";

const cookieName = "medici_admin";
const lifetime = 8 * 60 * 60;
export async function isAdmin() {
  const token = (await cookies()).get(cookieName)?.value;
  if (!token || !/^[a-f0-9]{64}$/.test(token) || !process.env.ADMIN_SECRET_KEY) return false;
  const session = await getDb().adminSession.findUnique({ where: { tokenHash: keyedHash(token) } });
  return Boolean(session && session.expiresAt > new Date());
}
export async function requireAdmin() { if (!(await isAdmin())) redirect("/admin/login"); }
export async function createAdminSession() {
  const token = randomBytes(32).toString("hex");
  await getDb().adminSession.create({ data: { tokenHash: keyedHash(token), expiresAt: new Date(Date.now() + lifetime * 1000) } });
  (await cookies()).set(cookieName, token, {
    httpOnly: true, secure: Boolean(process.env.VERCEL) || process.env.NEXT_PUBLIC_SITE_URL?.startsWith("https://") === true,
    sameSite: "strict", path: "/", maxAge: lifetime,
  });
  await getDb().adminSession.deleteMany({ where: { expiresAt: { lt: new Date() } } });
}
export async function destroyAdminSession() {
  const jar = await cookies();
  const token = jar.get(cookieName)?.value;
  if (token && process.env.ADMIN_SECRET_KEY) await getDb().adminSession.deleteMany({ where: { tokenHash: keyedHash(token) } });
  jar.delete(cookieName);
}
