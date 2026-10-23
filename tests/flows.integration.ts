import { loadEnvConfig } from "@next/env";
import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import assert from "node:assert/strict";
import { getDb } from "../src/lib/db";

async function main() {
  assert.equal(process.env.RUN_INTEGRATION_TESTS, "true", "Set RUN_INTEGRATION_TESTS=true to create disposable test records.");
  loadEnvConfig(process.cwd());
  const base = "http://127.0.0.1:3107";
  const manifest = JSON.parse(readFileSync(".next/server/server-reference-manifest.json", "utf8"));
  function actionId(name: string) {
    const entry = Object.entries(manifest.node).find(([, value]) => (value as { exportedName: string }).exportedName === name);
    assert.ok(entry, name); return entry[0];
  }
  async function action(path: string, name: string, input: unknown[], cookie = "") {
    return fetch(base + path, { method: "POST", redirect: "manual", headers: { "Next-Action": actionId(name), "Content-Type": "text/plain;charset=UTF-8", Origin: base, Cookie: cookie }, body: JSON.stringify(input) });
  }
  const db = getDb();
  const requestId = randomUUID();
  const data = { patientName: "TEST AUTOMAT HTTP", patientPhone: "0722000003", patientEmail: "", city: "București", preferredDate: "", message: "=TEST CSV; date fictive", consent: true };
  const meta = { requestId, website: "" };
  let cookie = "";
  try {
    assert.equal((await fetch(base + "/admin/leads", { redirect: "manual" })).status, 307);
    assert.equal((await fetch(base + "/admin/leads/export")).status, 401);
    const invalid = await action("/", "submitLead", [{ ...data, consent: false }, meta]);
    assert.match(await invalid.text(), /"ok":false/);
    assert.equal(await db.lead.count({ where: { submissionKey: requestId } }), 0);
    const demo = await db.doctor.findUniqueOrThrow({ where: { slug: "demo-medic-bucuresti" } });
    const rejectedDemo = await action("/", "submitLead", [data, { ...meta, doctorId: demo.id }]);
    assert.match(await rejectedDemo.text(), /"ok":false/);
    const accepted = await action("/", "submitLead", [data, meta]);
    assert.match(await accepted.text(), /"ok":true/);
    const duplicate = await action("/", "submitLead", [data, meta]);
    assert.match(await duplicate.text(), /"ok":true/);
    assert.equal(await db.lead.count({ where: { submissionKey: requestId } }), 1);
    const saved = await db.lead.findUniqueOrThrow({ where: { submissionKey: requestId }, include: { notification: true } });
    assert.equal(saved.patientPhone, "+40722000003");
    assert.ok(saved.notification);
    assert.equal(saved.consentVersion, "2026-10-23");
    const loginHtml = await (await fetch(base + "/admin/login")).text();
    const form = new FormData();
    for (const match of loginHtml.matchAll(/<input[^>]*type="hidden"[^>]*>/g)) {
      const name = match[0].match(/name="([^"]*)"/)?.[1];
      const value = match[0].match(/value="([^"]*)"/)?.[1] || "";
      if (name) form.append(name, value.replace(/&quot;/g, '"').replace(/&amp;/g, "&"));
    }
    assert.ok(process.env.ADMIN_SECRET_KEY);
    form.set("secret", process.env.ADMIN_SECRET_KEY);
    const login = await fetch(base + "/admin/login", { method: "POST", body: form, redirect: "manual", headers: { Origin: base } });
    assert.equal(login.status, 303);
    const setCookie = login.headers.get("set-cookie") || "";
    assert.match(setCookie, /HttpOnly/i); assert.match(setCookie, /SameSite=strict/i);
    cookie = setCookie.split(";")[0];
    const admin = await fetch(base + "/admin/leads", { headers: { Cookie: cookie } });
    assert.equal(admin.status, 200);
    assert.match(await admin.text(), /TEST AUTOMAT HTTP/);
    const change = new FormData();
    change.set("$ACTION_ID_" + actionId("changeStatus"), "");
    change.set("id", saved.id); change.set("type", "lead"); change.set("status", "CONTACTED");
    const changed = await fetch(base + "/admin/leads", { method: "POST", body: change, redirect: "manual", headers: { Origin: base, Cookie: cookie } });
    assert.equal(changed.status, 303);
    assert.equal((await db.lead.findUniqueOrThrow({ where: { id: saved.id } })).status, "CONTACTED");
    const csv = await fetch(base + "/admin/leads/export", { headers: { Cookie: cookie } });
    assert.equal(csv.status, 200); assert.match(csv.headers.get("cache-control") || "", /no-store/);
    assert.match(await csv.text(), /"'=TEST CSV; date fictive"/);
    const forged = await fetch(base + "/admin/leads", { method: "POST", body: change, redirect: "manual", headers: { Origin: "https://untrusted.example", Cookie: cookie } });
    assert.ok(forged.status >= 400);
    await action("/admin/leads", "logoutAdmin", [], cookie);
    assert.equal((await fetch(base + "/admin/leads/export", { headers: { Cookie: cookie } })).status, 401);
    assert.equal((await fetch(base + "/pagina-inexistenta")).status, 404);
    const sitemap = await (await fetch(base + "/sitemap.xml")).text();
    assert.match(sitemap, /proctologi-bucuresti/); assert.doesNotMatch(sitemap, /demo-medic/);
    console.log("PASS: validare server, profil demo refuzat, salvare, idempotență, consimțământ, login, status, CSV, CSRF, logout, 404, sitemap.");
  } finally {
    if (cookie) await action("/admin/leads", "logoutAdmin", [], cookie).catch(() => undefined);
    await db.lead.deleteMany({ where: { submissionKey: requestId } });
    await db.$disconnect();
  }
}
main().catch(() => { console.error("FAIL: verificarea integrată nu a trecut; inspectează răspunsurile fără a afișa credențiale."); process.exitCode = 1; });
