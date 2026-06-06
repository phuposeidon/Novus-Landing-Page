import type { APIRoute } from "astro";
import { handleAgentRoutes } from "../../../lib/agent-routes";

export const prerender = false;

export const POST: APIRoute = ({ request }) =>
  handleAgentRoutes(request, "/api/agent-auth/token") ?? new Response("Not found", { status: 404 });
