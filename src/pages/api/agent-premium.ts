import type { APIRoute } from "astro";
import { handleAgentRoutes } from "../../lib/agent-routes";

export const prerender = false;

export const GET: APIRoute = ({ request }) =>
  handleAgentRoutes(request, "/api/agent-premium") ?? new Response("Not found", { status: 404 });

export const OPTIONS: APIRoute = ({ request }) =>
  handleAgentRoutes(request, "/api/agent-premium") ?? new Response(null, { status: 204 });
