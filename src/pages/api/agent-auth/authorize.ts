import type { APIRoute } from "astro";
import { handleAgentRoutes } from "../../../lib/agent-routes";

export const prerender = false;

export const GET: APIRoute = ({ request }) =>
  handleAgentRoutes(request, "/api/agent-auth/authorize") ?? new Response("Not found", { status: 404 });
