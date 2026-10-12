"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { "agent-id": string; "disable-banner"?: string },
        HTMLElement
      >;
    }
  }
}

// Hides only the "Powered by ElevenAgents" line rendered inside the widget's
// shadow DOM. The widget itself (chat, call, language picker) is untouched.
function hideBrandingLine(root: ShadowRoot) {
  root.querySelectorAll("p").forEach((line) => {
    const label = line.firstElementChild;
    if (
      label?.textContent?.trim() === "Powered by" &&
      line.querySelector("a") &&
      line.style.display !== "none"
    ) {
      line.style.display = "none";
    }
  });
}

export default function ElevenLabsWidget() {
  const widgetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let observer: MutationObserver | undefined;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    const attach = (attempt = 0) => {
      const root = widgetRef.current?.shadowRoot;
      if (cancelled) return;
      if (!root) {
        // Shadow root is created after the widget script upgrades the element.
        if (attempt < 50) retryTimer = setTimeout(() => attach(attempt + 1), 200);
        return;
      }
      hideBrandingLine(root);
      // The widget re-renders when it opens/closes, so keep the line hidden.
      observer = new MutationObserver(() => hideBrandingLine(root));
      observer.observe(root, { childList: true, subtree: true });
    };

    customElements.whenDefined("elevenlabs-convai").then(() => attach());

    return () => {
      cancelled = true;
      observer?.disconnect();
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, []);

  return (
    <>
      <elevenlabs-convai
        ref={widgetRef}
        agent-id="agent_4201m0mw5bmtf8ab4qdd7yr0eazm"
        disable-banner="true"
      />
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="afterInteractive"
      />
    </>
  );
}
