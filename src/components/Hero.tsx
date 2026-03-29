"use client";

import { PHONE_NUMBER, PHONE_NUMBER_TEL } from "@/lib/config";

interface HeroProps {
  onGetStarted?: () => void;
}

const AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face",
];

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <section id="hero" className="relative overflow-hidden" style={{ height: "130vh" }}>
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260323_071151_38c3924f-c312-48af-a196-3fbb80e4226f.mp4"
          type="video/mp4"
        />
      </video>

      {/* Subtle darkening for text legibility */}
      <div className="absolute inset-0 bg-black/30 z-[1]" />

      {/* Content — centered vertically in the top ~60% of the section */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-[18vh] md:pt-[22vh] text-center">
        {/* Social Proof Pill */}
        <div className="animate-fade-rise flex items-center justify-center mb-5">
          <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-md rounded-full py-2 pl-2 pr-5 border border-white/20">
            <div className="flex -space-x-2.5">
              {AVATARS.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="w-8 h-8 rounded-full border-2 border-white/40 object-cover"
                />
              ))}
            </div>
            <span className="text-sm text-white font-medium">
              847 people contacted today
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="animate-fade-rise text-4xl sm:text-5xl md:text-[4.5rem] font-extrabold text-white leading-[0.95] tracking-[-1.5px]">
          Financial Services,
          <br />
          Reimagined with AI
        </h1>

        {/* Subtext */}
        <p className="animate-fade-rise-delay text-base sm:text-lg md:text-xl text-white/80 mt-5 leading-relaxed max-w-xl mx-auto">
          AI-powered customer service for debt relief, lending, insurance, and
          more. Instant responses. Zero wait time. 24/7.
        </p>

        {/* CTA */}
        <div className="animate-fade-rise-delay-2 mt-7">
          <button
            onClick={onGetStarted}
            className="bg-white text-[var(--ct-neutral-900)] rounded-full px-12 py-4 text-base font-bold cursor-pointer transition-all hover:scale-[1.03] active:scale-[0.97] shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
          >
            Get in Touch &rarr;
          </button>
        </div>

        {/* Phone fallback */}
        <p className="animate-fade-rise-delay-2 text-sm text-white/50 mt-3">
          Or call{" "}
          <a
            href={`tel:${PHONE_NUMBER_TEL}`}
            className="text-white/70 underline underline-offset-4 hover:text-white transition-colors"
          >
            {PHONE_NUMBER}
          </a>
        </p>
      </div>
    </section>
  );
}
