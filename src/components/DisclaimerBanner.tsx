"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "conduit-disclaimer-dismissed";

export default function DisclaimerBanner() {
  const [dismissed, setDismissed] = useState(true); // default hidden to avoid flash

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem(STORAGE_KEY) === "true";
    setDismissed(wasDismissed);
  }, []);

  function handleDismiss() {
    setDismissed(true);
    sessionStorage.setItem(STORAGE_KEY, "true");
  }

  if (dismissed) return null;

  return (
    <div className="bg-accent-default px-4 py-2 text-center relative">
      <p className="text-paragraph-sm-regular text-content-on-primary pr-8">
        This is a demo environment. Conduit Financial Services isn&apos;t a real
        bank — but the AI definitely is. Powered by{" "}
        <a
          href="https://conduit.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-semibold hover:text-white/80 transition-colors"
        >
          Conduit AI
        </a>
      </p>
      <button
        onClick={handleDismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/70 hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors"
        aria-label="Dismiss banner"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M4 4l8 8M12 4l-8 8" />
        </svg>
      </button>
    </div>
  );
}
