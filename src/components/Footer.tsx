"use client";

import { PHONE_NUMBER, PHONE_NUMBER_TEL } from "@/lib/config";
import { openChatWidget } from "@/lib/chat-widget";

export default function Footer() {
  return (
    <footer className="bg-[var(--ct-neutral-900)] text-white">
      {/* Main footer content */}
      <div className="py-12 px-4 md:py-16 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-baseline gap-1.5 mb-4">
                <svg viewBox="0 0 450 100" fill="none" className="h-[16px] w-auto">
                  <path d="M167.322 98.4499H151.778V26.9487H185.664C203.85 26.9487 217.062 40.3163 217.062 58.8134V98.4499H201.518V58.6579C201.518 48.5545 194.368 40.9381 184.42 40.9381C174.628 40.9381 167.322 48.5545 167.322 58.6579V98.4499Z" fill="white"/>
                  <path d="M105.719 100H105.408C84.4239 100 67.6367 83.5237 67.6367 62.6951C67.6367 41.8665 84.4239 25.3901 105.408 25.3901H105.719C126.858 25.3901 143.49 41.8665 143.49 62.6951C143.49 83.5237 126.858 100 105.719 100ZM105.408 84.4563H105.719C117.688 84.4563 127.325 74.5083 127.325 62.6951C127.325 50.7264 117.688 40.9339 105.719 40.9339H105.408C93.4393 40.9339 83.8022 50.571 83.8022 62.6951C83.8022 74.6638 93.4393 84.4563 105.408 84.4563Z" fill="white"/>
                  <path d="M37.9667 100C16.8273 100 0.0400391 83.3682 0.0400391 62.6951C0.0400391 42.0219 16.6718 25.3901 37.8113 25.3901C47.7593 25.3901 57.241 29.2761 64.2356 36.2708L53.5105 47.1514C49.3137 42.7991 43.7179 40.623 37.8113 40.623C25.8426 40.623 16.2055 50.4155 16.2055 62.6951C16.2055 74.8192 25.9981 84.7672 37.9667 84.7672C43.8734 84.7672 49.4691 82.4356 53.5105 78.2388L64.2356 89.1194C57.241 95.9587 47.9147 100 37.9667 100Z" fill="white"/>
                  <path d="M410.012 97.9255H425.555V53.7813C425.555 46.4757 430.996 41.0354 438.301 41.0354H449.959V26.4243H438.301C430.996 26.4243 425.555 20.984 425.555 13.6785V0H410.012V13.6785V53.7813V97.9255Z" fill="white"/>
                  <path d="M383.381 16.0699H399.391V0H383.381V16.0699Z" fill="white"/>
                  <path d="M383.381 98.4446H399.391V26.9435H383.381V98.4446Z" fill="white"/>
                  <path d="M372.759 98.4499H339.029C320.843 98.4499 307.476 84.7714 307.476 66.2744V26.9487H323.019V66.7407C323.019 76.6887 330.325 84.1496 340.117 84.1496C350.065 84.1496 357.216 76.6887 357.216 66.7407V26.9487H372.759V98.4499Z" fill="white"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M281.311 0V26.9425H261.104C241.364 26.9425 225.354 42.9525 225.354 62.693C225.354 82.4336 241.364 98.4436 261.104 98.4436H296.855V0H281.311ZM281.777 62.693C281.777 73.8845 272.762 83.2108 261.57 83.2108C250.534 83.2108 241.519 73.8845 241.519 62.693C241.519 51.3461 250.534 42.1753 261.57 42.1753C272.762 42.1753 281.777 51.3461 281.777 62.693Z" fill="white"/>
                </svg>
                <span className="text-[13px] font-light text-white/50 tracking-[0.5px] italic">Financial</span>
              </div>
              <p className="text-sm text-white/50 leading-relaxed max-w-[340px]">
                Conduit Financial Services is a fictional company created for
                demonstration purposes. No actual financial services are provided.
                All interactions are powered by Conduit AI.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <p className="text-xs font-semibold text-white/60 uppercase tracking-[1.5px]">Quick Links</p>
              <nav className="mt-4 flex flex-col gap-2">
                <a href="#hero" className="text-sm text-white/50 hover:text-white transition-colors">Home</a>
                <a href="#use-cases" className="text-sm text-white/50 hover:text-white transition-colors">Use Cases</a>
                <a href="#demo-calls" className="text-sm text-white/50 hover:text-white transition-colors">Sample Calls</a>
                <a href="https://trust.conduit.ai" target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-white transition-colors">Trust Center</a>
              </nav>
            </div>

            {/* Contact */}
            <div>
              <p className="text-xs font-semibold text-white/60 uppercase tracking-[1.5px]">Contact</p>
              <nav className="mt-4 flex flex-col gap-2">
                <a href={`tel:${PHONE_NUMBER_TEL}`} className="text-sm text-white/50 hover:text-white transition-colors inline-flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-live-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  {PHONE_NUMBER}
                </a>
                <button type="button" onClick={openChatWidget} className="text-sm text-white/50 hover:text-white transition-colors text-left">Open Chat</button>
                <a href="https://conduit.ai" target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-white transition-colors">conduit.ai</a>
              </nav>
            </div>
          </div>

          <div className="border-t border-white/10 mt-10 pt-6 flex flex-col items-center gap-2 md:flex-row md:justify-between">
            <p className="text-xs text-white/30">Powered by Conduit AI</p>
            <p className="text-xs text-white/30">No actual money was harmed in the making of this demo.</p>
          </div>

        </div>
      </div>
    </footer>
  );
}
