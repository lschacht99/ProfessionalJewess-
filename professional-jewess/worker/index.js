// Cloudflare Worker entry point.
//
// One Worker serves both:
//   1. The JSON API under /api/*  (see ./store.js)
//   2. The built React SPA static assets (the `dist/` directory, bound as ASSETS
//      in wrangler.toml). Deep links fall back to index.html via
//      `not_found_handling = "single-page-application"`.

import { handleApi } from "./store.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      try {
        return await handleApi(request, env, url);
      } catch (err) {
        return new Response(JSON.stringify({ error: "Server error" }), {
          status: 500,
          headers: { "content-type": "application/json" },
        });
      }
    }

    // Static assets (the built SPA).
    return env.ASSETS.fetch(request);
  },
};
