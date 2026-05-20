"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com";

    if (!key) return;

    posthog.init(key, {
      api_host: host,
      person_profiles: "always",
      capture_pageview: false, // handled manually via Next.js router
      loaded: (ph) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).__posthog = ph;
      },
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
