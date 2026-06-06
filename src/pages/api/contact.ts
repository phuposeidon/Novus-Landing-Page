import type { APIRoute } from "astro";
import {
  ContactValidationError,
  parseContactPayload,
  sendContactEmail,
  verifyTurnstileToken,
} from "../../lib/contact.server";

export const prerender = false;

function json(data: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

export const POST: APIRoute = async ({ request, locals }) => {
  const env = locals.runtime?.env;

  if (!env?.RESEND_API_KEY) {
    console.error("contact: RESEND_API_KEY is not configured");
    return json({ ok: false, error: "Contact service is temporarily unavailable." }, 503);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON body." }, 400);
  }

  try {
    const payload = parseContactPayload(body);

    if (env.TURNSTILE_SECRET_KEY) {
      const remoteIp =
        request.headers.get("CF-Connecting-IP") ??
        request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim();
      await verifyTurnstileToken(
        payload.turnstileToken ?? "",
        env.TURNSTILE_SECRET_KEY,
        remoteIp,
      );
    }

    await sendContactEmail(payload, env);
    return json({ ok: true });
  } catch (err) {
    if (err instanceof ContactValidationError) {
      return json({ ok: false, error: err.message }, 400);
    }
    console.error("contact: send failed", err);
    return json({ ok: false, error: "Could not send your message. Please try again later." }, 502);
  }
};
