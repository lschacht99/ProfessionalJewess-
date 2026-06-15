// Thin client for the Cloudflare Worker API (see /worker).
//
// The app currently renders bundled sample data from ./data.js so it works
// fully offline and as a standalone preview. These helpers are here so you can
// switch any screen to live data with a one-line change, e.g.:
//
//   const [mentors, setMentors] = useState(MENTORS);
//   useEffect(() => { api.getMentors().then(setMentors).catch(() => {}); }, []);
//
// Every previews response from the Worker is PII-stripped and name-hidden
// unless the mentor opted into public visibility — there is no full directory
// endpoint. See worker/store.js.

const BASE = "/api";

async function req(path, options = {}) {
  const res = await fetch(BASE + path, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) throw new Error(`${path} → ${res.status}`);
  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : res.text();
}

export const api = {
  health: () => req("/health"),

  // Curated, name-hidden previews only (never a browseable directory).
  getMentors: () => req("/mentors"),
  getFeed: () => req("/feed"),

  // Onboarding → request a match (curated). prefs is optional (1–3 mentor ids);
  // omit it for fully blind matching.
  submitApplication: (payload) =>
    req("/applications", { method: "POST", body: JSON.stringify(payload) }),
  submitPreferences: (payload) =>
    req("/preferences", { method: "POST", body: JSON.stringify(payload) }),

  // Match status for the signed-in member (stubbed in the MVP).
  myMatch: () => req("/me/match"),

  // Admin-only in production (auth gate added when you wire real sessions).
  confirmMatch: (payload) =>
    req("/admin/match", { method: "POST", body: JSON.stringify(payload) }),
};
