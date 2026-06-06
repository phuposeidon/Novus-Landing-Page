type TurnstileEnv = {
  PUBLIC_TURNSTILE_SITE_KEY?: string;
};

/** Prefer Cloudflare runtime env (wrangler.toml / Pages vars), fall back to build-time. */
export function resolveTurnstileSiteKey(
  runtimeEnv?: TurnstileEnv,
  buildTimeKey = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY ?? "",
): string {
  const runtimeKey = runtimeEnv?.PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? "";
  const bakedKey = String(buildTimeKey).trim();
  return runtimeKey || bakedKey;
}
