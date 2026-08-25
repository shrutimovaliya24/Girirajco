"use client";

import Script from "next/script";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { "agent-id": string },
        HTMLElement
      >;
    }
  }
}

export default function ElevenLabsWidget() {
  return (
    <>
      <elevenlabs-convai agent-id="agent_4201m0mw5bmtf8ab4qdd7yr0eazm" />
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="afterInteractive"
      />
    </>
  );
}
