// Data + API handlers for the Worker.
//
// Privacy model (from the brief):
//   - Mentor details are PRIVATE by default.
//   - There is NO browseable directory endpoint. /api/mentors returns curated,
//     PII-stripped previews only, and a mentor's name appears only if she chose
//     "public" visibility. Private mentors are never returned.
//   - Full profiles, contact info, and calendars unlock only after a confirmed
//     match (gate the relevant endpoint with real auth when you add sessions).
//   - Applications store contact info but it is never returned to clients.
//
// Storage: uses a KV namespace if bound as `env.PJ_KV`, otherwise an in-memory
// Map (fine for local dev / demos; resets on each isolate).

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

/* ---- Full mentor records (server-side only) ---- */
const MENTORS_FULL = [
  { id: "rachel", name: "Rachel Stein", visibility: "members", field: "Law", fieldKey: "law",
    role: "Corporate Associate", org: "Litigation & finance practice", city: "New York, NY",
    edu: "NYU School of Law", years: 7, email: "—", phone: "—",
    helps: ["Law school", "Interview prep", "Shabbos in corporate work", "First job"],
    bestFor: "College women weighing law school against the billable-hour life.",
    availability: ["Two calls a month", "Open to long-term"] },
  { id: "shira", name: "Dr. Shira Tendler", visibility: "members", field: "Medicine", fieldKey: "medicine",
    role: "Pediatrician", org: "Hospital & private practice", city: "Baltimore, MD",
    edu: "Einstein College of Medicine", years: 11, email: "—", phone: "—",
    helps: ["Med school", "Career exploration", "Balancing frum life & career"],
    bestFor: "Seminary and college women wondering whether medicine and a growing family can share a life.",
    availability: ["One call a month", "Open to one-time calls"] },
  { id: "esti", name: "Esti Brizel", visibility: "public", field: "Tech", fieldKey: "tech",
    role: "Software Engineer", org: "Fintech", city: "Jerusalem",
    edu: "Machon Tal", years: 6, email: "—", phone: "—",
    helps: ["Career exploration", "First job", "Resume help", "Interview prep"],
    bestFor: "Women teaching themselves to code who aren't sure it's 'real' yet.",
    availability: ["Group mentorship", "Open to one-time calls"] },
  { id: "devorah", name: "Devorah Klein", visibility: "public", field: "Business", fieldKey: "business",
    role: "Founder", org: "Kosher meal-prep brand", city: "Lakewood, NJ",
    edu: "Built it at the kitchen table", years: 9, email: "—", phone: "—",
    helps: ["Starting a business", "Confidence", "Networking"],
    bestFor: "Women with a side-parnasa idea and a full house.",
    availability: ["Two calls a month", "Open to long-term"] },
  { id: "adina", name: "Adina Weiss", visibility: "private", field: "Therapy", fieldKey: "therapy",
    role: "Clinical Psychologist", org: "Group practice", city: "Monsey, NY",
    edu: "Ferkauf, Yeshiva University", years: 13, email: "—", phone: "—",
    helps: ["Grad school", "Career exploration", "Balancing frum life & career"],
    bestFor: "Women drawn to the helping fields who worry about the years of training.",
    availability: ["One call a month", "Open to long-term"] },
];

/* ---- Inspiration feed (opt-in posts, no people-directory) ---- */
const FEED = [
  { id: "f1", who: "Naomi Gold", field: "Medicine", city: "Passaic", kind: "milestone",
    text: "Accepted to the PA program after two years of second-guessing whether I belonged. To the girl who thinks it's too late — it isn't.", mazel: 47, chazak: 9 },
  { id: "f2", who: "Esti Brizel", field: "Tech", city: "Jerusalem", kind: "milestone",
    text: "Signed my first engineering offer. Eighteen months ago I was teaching myself loops after the kids were asleep. Keep shipping.", mazel: 64, chazak: 14 },
  { id: "f3", who: "Rachel Stein", field: "Law", city: "New York", kind: "reflection",
    text: "Your limits are not a weakness to apologize for. Decide your lines before someone else draws them for you.", mazel: 38, chazak: 21 },
];

// Curated preview: strip everything private; hide the name unless public.
function toPreview(m) {
  if (m.visibility === "private") return null;
  return {
    id: m.id,
    field: m.field,
    fieldKey: m.fieldKey,
    role: m.role,                       // shown as the headline when the name is hidden
    name: m.visibility === "public" ? m.name : null,
    city: m.city.split(",")[0],
    edu: m.edu,
    helps: m.helps,
    bestFor: m.bestFor,
    availability: m.availability,
    nameHidden: m.visibility !== "public",
    // intentionally omitted: org, email, phone, exact workplace
  };
}

/* ---- tiny storage helper (KV or in-memory) ---- */
const mem = new Map();
async function put(env, key, value) {
  if (env && env.PJ_KV) return env.PJ_KV.put(key, JSON.stringify(value));
  mem.set(key, value);
}
async function list(env, prefix) {
  if (env && env.PJ_KV) {
    const out = [];
    const res = await env.PJ_KV.list({ prefix });
    for (const k of res.keys) out.push(JSON.parse(await env.PJ_KV.get(k.name)));
    return out;
  }
  return [...mem.entries()].filter(([k]) => k.startsWith(prefix)).map(([, v]) => v);
}

/* ---- router ---- */
export async function handleApi(request, env, url) {
  const path = url.pathname.replace(/^\/api/, "") || "/";
  const method = request.method;

  if (path === "/health") return json({ ok: true, service: "professional-jewess", time: Date.now() });

  // Curated previews only — never a full directory.
  if (path === "/mentors" && method === "GET") {
    return json({ previews: MENTORS_FULL.map(toPreview).filter(Boolean) });
  }

  if (path === "/feed" && method === "GET") return json({ posts: FEED });

  // Onboarding → request a match. Contact info is stored but never returned.
  if (path === "/applications" && method === "POST") {
    const body = await request.json().catch(() => ({}));
    const id = "app_" + crypto.randomUUID();
    const record = { id, role: body.role || "mentee", status: "submitted", createdAt: Date.now(), data: body };
    await put(env, `application:${id}`, record);
    return json({ id, status: "submitted" }, 201);
  }

  // Optional preferences (1–3 mentor ids + why). Omit for fully blind matching.
  if (path === "/preferences" && method === "POST") {
    const body = await request.json().catch(() => ({}));
    const prefs = Array.isArray(body.prefs) ? body.prefs.slice(0, 3) : [];
    const id = "pref_" + crypto.randomUUID();
    await put(env, `preference:${id}`, { id, prefs, why: body.why || "", createdAt: Date.now() });
    return json({ id, received: prefs.length, status: "match_in_progress" }, 201);
  }

  // Match status for the signed-in member (stub until auth is wired).
  if (path === "/me/match" && method === "GET") {
    return json({ status: "match_in_progress", matchedMentor: null });
  }

  // Admin confirms a match. In production: require an authenticated admin session.
  if (path === "/admin/match" && method === "POST") {
    const body = await request.json().catch(() => ({}));
    const id = "match_" + crypto.randomUUID();
    await put(env, `match:${id}`, { id, menteeId: body.menteeId, mentorId: body.mentorId, status: "mentor_accepted", createdAt: Date.now() });
    return json({ id, status: "mentor_accepted" }, 201);
  }

  if (path === "/admin/applications" && method === "GET") {
    // Demo only — real version gated by admin auth.
    return json({ applications: await list(env, "application:") });
  }

  return json({ error: "Not found" }, 404);
}
