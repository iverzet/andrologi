"use client";
import { useActionState } from "react";
import { loginAdmin } from "@/app/actions/admin";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AdminLoginForm() {
  const [state, action, pending] = useActionState(loginAdmin, { error: "" });
  return <form action={action} className="mt-7 space-y-5">
    <div><label htmlFor="secret" className="mb-2 block text-sm font-medium">Parola administratorului</label><Input id="secret" name="secret" type="password" autoComplete="current-password" required maxLength={512} /></div>
    {state.error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{state.error}</p>}
    <Button disabled={pending} className="w-full bg-sky-700" type="submit">{pending ? "Se verifică…" : "Autentificare"}</Button>
  </form>;
}
