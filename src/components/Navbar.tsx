"use client";

import { useState } from "react";
import { PHONE_NUMBER, PHONE_NUMBER_TEL } from "@/lib/config";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Sample Calls", href: "#demo-calls" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Floating glass navbar */}
      <nav className="fixed top-[20px] md:top-[30px] z-50 left-0 right-0 flex justify-center px-4">
        <div
          className="flex items-center gap-1 rounded-2xl px-2 py-1.5 md:px-3 md:py-2"
          style={{
            background: "rgba(255, 255, 255, 0.3)",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            boxShadow: "inset 0px 4px 4px 0px rgba(255, 255, 255, 0.25)",
            backdropFilter: "blur(50px)",
            WebkitBackdropFilter: "blur(50px)",
          }}
        >
          {/* Logo — Conduit wordmark + Financial */}
          <a href="#hero" className="flex items-baseline gap-1.5 px-3 py-1.5 shrink-0">
            <svg viewBox="0 0 450 100" fill="none" className="h-[15px] md:h-[17px] w-auto shrink-0 translate-y-[1px]">
              <path d="M167.322 98.4499H151.778V26.9487H185.664C203.85 26.9487 217.062 40.3163 217.062 58.8134V98.4499H201.518V58.6579C201.518 48.5545 194.368 40.9381 184.42 40.9381C174.628 40.9381 167.322 48.5545 167.322 58.6579V98.4499Z" fill="currentColor"/>
              <path d="M105.719 100H105.408C84.4239 100 67.6367 83.5237 67.6367 62.6951C67.6367 41.8665 84.4239 25.3901 105.408 25.3901H105.719C126.858 25.3901 143.49 41.8665 143.49 62.6951C143.49 83.5237 126.858 100 105.719 100ZM105.408 84.4563H105.719C117.688 84.4563 127.325 74.5083 127.325 62.6951C127.325 50.7264 117.688 40.9339 105.719 40.9339H105.408C93.4393 40.9339 83.8022 50.571 83.8022 62.6951C83.8022 74.6638 93.4393 84.4563 105.408 84.4563Z" fill="currentColor"/>
              <path d="M37.9667 100C16.8273 100 0.0400391 83.3682 0.0400391 62.6951C0.0400391 42.0219 16.6718 25.3901 37.8113 25.3901C47.7593 25.3901 57.241 29.2761 64.2356 36.2708L53.5105 47.1514C49.3137 42.7991 43.7179 40.623 37.8113 40.623C25.8426 40.623 16.2055 50.4155 16.2055 62.6951C16.2055 74.8192 25.9981 84.7672 37.9667 84.7672C43.8734 84.7672 49.4691 82.4356 53.5105 78.2388L64.2356 89.1194C57.241 95.9587 47.9147 100 37.9667 100Z" fill="currentColor"/>
              <path d="M410.012 97.9255H425.555V53.7813C425.555 46.4757 430.996 41.0354 438.301 41.0354H449.959V26.4243H438.301C430.996 26.4243 425.555 20.984 425.555 13.6785V0H410.012V13.6785V53.7813V97.9255Z" fill="currentColor"/>
              <path d="M383.381 16.0699H399.391V0H383.381V16.0699Z" fill="currentColor"/>
              <path d="M383.381 98.4446H399.391V26.9435H383.381V98.4446Z" fill="currentColor"/>
              <path d="M372.759 98.4499H339.029C320.843 98.4499 307.476 84.7714 307.476 66.2744V26.9487H323.019V66.7407C323.019 76.6887 330.325 84.1496 340.117 84.1496C350.065 84.1496 357.216 76.6887 357.216 66.7407V26.9487H372.759V98.4499Z" fill="currentColor"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M281.311 0V26.9425H261.104C241.364 26.9425 225.354 42.9525 225.354 62.693C225.354 82.4336 241.364 98.4436 261.104 98.4436H296.855V0H281.311ZM281.777 62.693C281.777 73.8845 272.762 83.2108 261.57 83.2108C250.534 83.2108 241.519 73.8845 241.519 62.693C241.519 51.3461 250.534 42.1753 261.57 42.1753C272.762 42.1753 281.777 51.3461 281.777 62.693Z" fill="currentColor"/>
            </svg>
            <span className="text-[13px] md:text-[14px] font-light text-content-subtle tracking-[0.5px] italic">
              Financial
            </span>
          </a>

          {/* Divider */}
          <div className="hidden md:block w-px h-5 bg-black/10 mx-1" />

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium text-content-subtle hover:text-content-default transition-colors px-3 py-1.5 rounded-lg hover:bg-white/40"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-5 bg-black/10 mx-1" />

          {/* Call Us Now — glass button with blinking dot */}
          <a
            href={`tel:${PHONE_NUMBER_TEL}`}
            className="inline-flex items-center gap-2 rounded-xl px-3 md:px-4 py-2 text-[13px] font-medium text-content-strong hover:bg-white/40 transition-colors"
            style={{
              background: "rgba(255, 255, 255, 0.3)",
              border: "1px solid rgba(0, 0, 0, 0.08)",
              boxShadow: "inset 0px 2px 2px 0px rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            {/* Blinking green dot */}
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-live-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="hidden md:inline">{PHONE_NUMBER}</span>
            <span className="md:hidden">Call</span>
            {/* Arrow icon */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden min-w-[36px] min-h-[36px] flex items-center justify-center text-content-subtle hover:text-content-default rounded-lg hover:bg-white/40 transition-colors"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown — positioned below the floating nav */}
      {menuOpen && (
        <div className="md:hidden fixed top-[80px] left-0 right-0 z-40 flex justify-center px-4 mt-2">
          <div
            className="rounded-2xl px-4 py-3 w-full max-w-sm"
            style={{
              background: "rgba(255, 255, 255, 0.5)",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              boxShadow: "inset 0px 4px 4px 0px rgba(255, 255, 255, 0.25), 0 8px 32px rgba(0,0,0,0.1)",
              backdropFilter: "blur(50px)",
              WebkitBackdropFilter: "blur(50px)",
            }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-[15px] font-medium text-content-default min-h-[44px] flex items-center rounded-lg px-2 hover:bg-white/40 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="border-t border-black/10 mt-2 pt-3">
              <a
                href={`tel:${PHONE_NUMBER_TEL}`}
                className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-[15px] font-semibold text-content-strong min-h-[44px]"
                style={{
                  background: "rgba(255, 255, 255, 0.4)",
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                }}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-live-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                Call {PHONE_NUMBER}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
