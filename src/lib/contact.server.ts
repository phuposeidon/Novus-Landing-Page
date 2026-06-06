import { Resend } from "resend";
import { SUPPORT_EMAIL } from "../config/site.ts";

const SUBJECT_LABELS: Record<string, string> = {
  general: "General inquiry",
  support: "Technical support",
  billing: "Billing question",
  partnership: "Partnership",
  feature: "Feature request",
};

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  /** Honeypot — must stay empty */
  company?: string;
  /** Cloudflare Turnstile response token */
  turnstileToken?: string;
};

export type ContactEnv = {
  RESEND_API_KEY: string;
  TURNSTILE_SECRET_KEY?: string;
  CONTACT_FROM_EMAIL?: string;
  CONTACT_TO_EMAIL?: string;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function parseContactPayload(body: unknown): ContactPayload {
  if (!body || typeof body !== "object") {
    throw new ContactValidationError("Invalid request body.");
  }

  const raw = body as Record<string, unknown>;
  const name = String(raw.name ?? "").trim();
  const email = String(raw.email ?? "").trim();
  const subject = String(raw.subject ?? "").trim();
  const message = String(raw.message ?? "").trim();
  const company = String(raw.company ?? "").trim();
  const turnstileToken = String(raw.turnstileToken ?? "").trim();

  if (company) {
    throw new ContactValidationError("Invalid submission.");
  }
  if (name.length < 2 || name.length > 100) {
    throw new ContactValidationError("Name must be 2–100 characters.");
  }
  if (!isValidEmail(email) || email.length > 254) {
    throw new ContactValidationError("Enter a valid email address.");
  }
  if (!SUBJECT_LABELS[subject]) {
    throw new ContactValidationError("Choose a valid subject.");
  }
  if (message.length < 10 || message.length > 5000) {
    throw new ContactValidationError("Message must be 10–5000 characters.");
  }

  return { name, email, subject, message, turnstileToken };
}

type TurnstileVerifyResponse = {
  success: boolean;
  "error-codes"?: string[];
};

export async function verifyTurnstileToken(
  token: string,
  secret: string,
  remoteIp?: string,
): Promise<void> {
  if (!token) {
    throw new ContactValidationError("Complete the security check before sending.");
  }

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);
  if (remoteIp) body.set("remoteip", remoteIp);

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) {
    throw new Error(`Turnstile verify HTTP ${res.status}`);
  }

  const data = (await res.json()) as TurnstileVerifyResponse;
  if (!data.success) {
    throw new ContactValidationError("Security check failed. Please try again.");
  }
}

export class ContactValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContactValidationError";
  }
}

export async function sendContactEmail(payload: ContactPayload, env: ContactEnv) {
  const resend = new Resend(env.RESEND_API_KEY);
  const from = env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
  const to = env.CONTACT_TO_EMAIL ?? SUPPORT_EMAIL;
  const subjectLabel = SUBJECT_LABELS[payload.subject] ?? payload.subject;

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: payload.email,
    subject: `[Nexis CRO Contact] ${subjectLabel} — ${payload.name}`,
    html: `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subjectLabel)}</p>
      <p><strong>Message:</strong></p>
      <pre style="white-space:pre-wrap;font-family:ui-monospace,monospace">${escapeHtml(payload.message)}</pre>
    `,
    text: [
      "New contact form submission",
      "",
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Subject: ${subjectLabel}`,
      "",
      payload.message,
    ].join("\n"),
  });

  if (error) {
    throw new Error(error.message);
  }
}
