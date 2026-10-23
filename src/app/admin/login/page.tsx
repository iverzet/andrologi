import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { AdminLoginForm } from "@/components/admin-login-form";
export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin/leads");
  return <main id="continut" className="site-container py-16"><section className="mx-auto max-w-md rounded-2xl border bg-white p-8"><p className="eyebrow">Acces restricționat</p><h1 className="mt-4 text-3xl font-semibold">Administrare</h1><p className="mt-4 text-sm leading-6 text-slate-600">Autentifică-te pentru a gestiona cererile și parteneriatele.</p><AdminLoginForm /></section></main>;
}
