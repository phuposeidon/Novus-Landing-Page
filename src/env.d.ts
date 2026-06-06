/// <reference path="../.astro/types.d.ts" />

type Env = {
  RESEND_API_KEY: string;
  TURNSTILE_SECRET_KEY?: string;
  PUBLIC_TURNSTILE_SITE_KEY?: string;
  CONTACT_FROM_EMAIL?: string;
  CONTACT_TO_EMAIL?: string;
};

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}

declare global {
  interface Window {
    nexisTrack?: (eventName: string, params?: Record<string, string | number | boolean>) => void;
    dataLayer?: unknown[];
    turnstile?: {
      render: (
        selector: string,
        options: { sitekey: string; theme?: string; callback?: (token: string) => void },
      ) => string;
      getResponse: (widgetId?: string) => string | undefined;
      reset: (widgetId?: string) => void;
    };
  }

  interface Navigator {
    modelContext?: {
      registerTool: (tool: {
        name: string;
        description: string;
        inputSchema: Record<string, unknown>;
        execute: (input?: Record<string, string>) => Promise<{ content: Array<{ type: string; text: string }> }>;
      }) => { abort?: () => void };
    };
  }
}
