"use client";

import Script from "next/script";

export default function EnterpriseHero() {
  return (
    <div className="h-screen overflow-hidden flex flex-col bg-page-body relative">
      <Script
        id="conduit-widget"
        async
        data-widget-id="eeb150ed-0512-49b8-a62f-ea42acdf909e"
        src="https://base.conduit.ai/widget/widget.min.js"
        strategy="afterInteractive"
      />
      {/* Content — pushed down but higher than before */}
      <div className="flex flex-col items-center pt-[20vh] md:pt-[24vh] px-4">
        {/* Conduit wordmark */}
        <svg
          viewBox="0 0 450 100"
          fill="none"
          className="h-[20px] md:h-[32px] w-auto"
        >
          <path
            d="M167.322 98.4499H151.778V26.9487H185.664C203.85 26.9487 217.062 40.3163 217.062 58.8134V98.4499H201.518V58.6579C201.518 48.5545 194.368 40.9381 184.42 40.9381C174.628 40.9381 167.322 48.5545 167.322 58.6579V98.4499Z"
            fill="var(--ct-neutral-900)"
          />
          <path
            d="M105.719 100H105.408C84.4239 100 67.6367 83.5237 67.6367 62.6951C67.6367 41.8665 84.4239 25.3901 105.408 25.3901H105.719C126.858 25.3901 143.49 41.8665 143.49 62.6951C143.49 83.5237 126.858 100 105.719 100ZM105.408 84.4563H105.719C117.688 84.4563 127.325 74.5083 127.325 62.6951C127.325 50.7264 117.688 40.9339 105.719 40.9339H105.408C93.4393 40.9339 83.8022 50.571 83.8022 62.6951C83.8022 74.6638 93.4393 84.4563 105.408 84.4563Z"
            fill="var(--ct-neutral-900)"
          />
          <path
            d="M37.9667 100C16.8273 100 0.0400391 83.3682 0.0400391 62.6951C0.0400391 42.0219 16.6718 25.3901 37.8113 25.3901C47.7593 25.3901 57.241 29.2761 64.2356 36.2708L53.5105 47.1514C49.3137 42.7991 43.7179 40.623 37.8113 40.623C25.8426 40.623 16.2055 50.4155 16.2055 62.6951C16.2055 74.8192 25.9981 84.7672 37.9667 84.7672C43.8734 84.7672 49.4691 82.4356 53.5105 78.2388L64.2356 89.1194C57.241 95.9587 47.9147 100 37.9667 100Z"
            fill="var(--ct-neutral-900)"
          />
          <path
            d="M410.012 97.9255H425.555V53.7813C425.555 46.4757 430.996 41.0354 438.301 41.0354H449.959V26.4243H438.301C430.996 26.4243 425.555 20.984 425.555 13.6785V0H410.012V13.6785V53.7813V97.9255Z"
            fill="var(--ct-neutral-900)"
          />
          <path
            d="M383.381 16.0699H399.391V0H383.381V16.0699Z"
            fill="var(--ct-neutral-900)"
          />
          <path
            d="M383.381 98.4446H399.391V26.9435H383.381V98.4446Z"
            fill="var(--ct-neutral-900)"
          />
          <path
            d="M372.759 98.4499H339.029C320.843 98.4499 307.476 84.7714 307.476 66.2744V26.9487H323.019V66.7407C323.019 76.6887 330.325 84.1496 340.117 84.1496C350.065 84.1496 357.216 76.6887 357.216 66.7407V26.9487H372.759V98.4499Z"
            fill="var(--ct-neutral-900)"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M281.311 0V26.9425H261.104C241.364 26.9425 225.354 42.9525 225.354 62.693C225.354 82.4336 241.364 98.4436 261.104 98.4436H296.855V0H281.311ZM281.777 62.693C281.777 73.8845 272.762 83.2108 261.57 83.2108C250.534 83.2108 241.519 73.8845 241.519 62.693C241.519 51.3461 250.534 42.1753 261.57 42.1753C272.762 42.1753 281.777 51.3461 281.777 62.693Z"
            fill="var(--ct-neutral-900)"
          />
        </svg>

        {/* "Enterprise" label */}
        <span className="text-label-sm-medium md:text-label-lg-medium text-content-subtle tracking-[3px] uppercase mt-2 md:mt-3">
          Enterprise
        </span>

        {/* CTA Buttons — stacked on mobile, side by side on desktop */}
        <div className="mt-8 md:mt-10 flex flex-col md:flex-row items-center gap-3 md:gap-4 w-full md:w-auto">
          <a
            href="/hospitality"
            className="group inline-flex items-center justify-center gap-2.5 w-full md:w-auto px-8 py-3.5 bg-primary-default text-content-on-primary text-[14px] font-semibold rounded-full transition-all hover:bg-primary-hover hover:shadow-3 hover:scale-[1.02] active:bg-primary-pressed active:scale-[0.98]"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-70 group-hover:opacity-100 transition-opacity"
            >
              <rect x="4" y="2" width="16" height="20" rx="1" />
              <path d="M9 6h2M13 6h2M9 10h2M13 10h2M9 14h2M13 14h2" />
              <path d="M10 22v-4h4v4" />
            </svg>
            Hospitality
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-40 group-hover:opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>

          <a
            href="/financial-services"
            className="group inline-flex items-center justify-center gap-2.5 w-full md:w-auto px-8 py-3.5 bg-primary-default text-content-on-primary text-[14px] font-semibold rounded-full transition-all hover:bg-primary-hover hover:shadow-3 hover:scale-[1.02] active:bg-primary-pressed active:scale-[0.98]"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-70 group-hover:opacity-100 transition-opacity"
            >
              <rect x="2" y="6" width="20" height="14" rx="2" />
              <path d="M2 10h20M6 14h4" />
            </svg>
            Financial Services
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-40 group-hover:opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>
      </div>

      {/* Globe video — cropped, pinned to bottom, no scroll */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full md:w-[900px] h-[280px] md:h-[420px] overflow-hidden rounded-t-2xl md:rounded-t-3xl pointer-events-none">
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_092310_5c71bab5-63cd-4a95-9390-cc6a1189d553.mp4"
          muted
          autoPlay
          loop
          playsInline
          className="w-full h-[500px] md:h-[750px] object-cover object-top"
        />
      </div>
    </div>
  );
}
