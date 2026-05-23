import { createFileRoute } from "@tanstack/react-router";

const BACKEND = "https://auticare-production-828c.up.railway.app";

async function forward(request: Request, splat: string | undefined) {
  const incomingUrl = new URL(request.url);
  const path = splat ? `/${splat}` : "";
  const target = `${BACKEND}${path}${incomingUrl.search}`;

  const headers = new Headers(request.headers);
  // Strip hop-by-hop / origin headers so the upstream sees a clean request
  headers.delete("host");
  headers.delete("origin");
  headers.delete("referer");
  headers.delete("content-length");

  const init: RequestInit = {
    method: request.method,
    headers,
    redirect: "manual",
  };

  if (!["GET", "HEAD"].includes(request.method)) {
    init.body = await request.arrayBuffer();
  }

  const upstream = await fetch(target, init);
  const respHeaders = new Headers(upstream.headers);
  respHeaders.delete("content-encoding");
  respHeaders.delete("transfer-encoding");

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: respHeaders,
  });
}

export const Route = createFileRoute("/api/proxy/$")({
  server: {
    handlers: {
      GET: ({ request, params }) => forward(request, params._splat),
      POST: ({ request, params }) => forward(request, params._splat),
      PUT: ({ request, params }) => forward(request, params._splat),
      PATCH: ({ request, params }) => forward(request, params._splat),
      DELETE: ({ request, params }) => forward(request, params._splat),
      OPTIONS: () => new Response(null, { status: 204 }),
    },
  },
});
