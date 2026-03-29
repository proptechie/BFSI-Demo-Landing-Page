"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { demoCalls, type DemoCall, type TranscriptTurn } from "@/lib/data/demo-calls";
import { PHONE_NUMBER, PHONE_NUMBER_TEL } from "@/lib/config";

function fmtTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
}

/* ─── Audio Player ─── */

function AudioPlayer({ src, duration }: { src: string; duration: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const rafRef = useRef<number>(0);

  const tick = useCallback(() => {
    const a = audioRef.current;
    if (a) {
      setCurrentTime(a.currentTime);
      if (!a.paused) rafRef.current = requestAnimationFrame(tick);
    }
  }, []);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play();
      setPlaying(true);
      rafRef.current = requestAnimationFrame(tick);
    } else {
      a.pause();
      setPlaying(false);
      cancelAnimationFrame(rafRef.current);
    }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    const bar = progressRef.current;
    if (!a || !bar || !totalDuration) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    a.currentTime = pct * totalDuration;
    setCurrentTime(a.currentTime);
  };

  const pct = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  return (
    <div className="bg-[var(--ct-blue-50)] rounded-xl p-2.5 flex items-center gap-3 border border-[var(--ct-blue-100)]">
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onLoadedMetadata={(e) => setTotalDuration((e.target as HTMLAudioElement).duration)}
        onEnded={() => { setPlaying(false); cancelAnimationFrame(rafRef.current); }}
      />

      <button
        onClick={toggle}
        className="w-9 h-9 rounded-full bg-[var(--ct-blue-700)] flex items-center justify-center flex-shrink-0 text-white hover:bg-[var(--ct-blue-800)] transition-colors cursor-pointer shadow-md"
        aria-label={playing ? "Pause" : "Play"}
      >
        {playing ? (
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      <div
        ref={progressRef}
        className="flex-1 h-1.5 bg-[var(--ct-blue-200)] rounded-full cursor-pointer relative"
        onClick={seek}
      >
        <div
          className="h-full bg-[var(--ct-blue-700)] rounded-full transition-[width] duration-100"
          style={{ width: `${pct}%` }}
        />
      </div>

      <span className="text-[10px] text-content-subtle font-mono flex-shrink-0 min-w-[70px] text-right">
        {fmtTime(currentTime)} / {totalDuration > 0 ? fmtTime(totalDuration) : duration}
      </span>
    </div>
  );
}

/* ─── Transcript Modal ─── */

function TranscriptModal({
  call,
  onClose,
}: {
  call: DemoCall;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-5 pb-4 border-b border-border-subtle">
          <div className="min-w-0">
            <h3 className="font-bold text-content-strong text-lg leading-tight">
              {call.title}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-content-subtle">
              <span className="bg-[var(--ct-blue-100)] text-[var(--ct-blue-800)] rounded-full px-2.5 py-0.5 font-medium">
                {call.voiceName}
              </span>
              <span>{call.workspace}</span>
              <span className="text-border-subtle">|</span>
              <span>{call.duration}</span>
              <span className="text-border-subtle">|</span>
              <span className="text-emerald-600 font-medium">{call.sentiment} Sentiment</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--ct-neutral-100)] hover:bg-[var(--ct-neutral-200)] flex items-center justify-center transition-colors"
            aria-label="Close transcript"
          >
            <svg className="w-4 h-4 text-content-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Audio player inside modal */}
        <div className="px-5 pt-4">
          <AudioPlayer src={call.audioUrl} duration={call.duration} />
        </div>

        {/* Transcript body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {call.transcript.map((turn: TranscriptTurn, i: number) => (
            <div
              key={i}
              className={`flex gap-3 ${turn.speaker === "ai" ? "" : "flex-row-reverse"}`}
            >
              <div
                className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5 ${
                  turn.speaker === "ai"
                    ? "bg-[var(--ct-blue-700)] text-white"
                    : "bg-[var(--ct-neutral-200)] text-content-subtle"
                }`}
              >
                {turn.speaker === "ai" ? "AI" : (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
                  </svg>
                )}
              </div>

              <div
                className={`rounded-xl px-3.5 py-2.5 text-sm leading-relaxed max-w-[85%] ${
                  turn.speaker === "ai"
                    ? "bg-[var(--ct-blue-50)] text-content-strong border border-[var(--ct-blue-200)]"
                    : "bg-[var(--ct-neutral-100)] text-content-strong"
                }`}
              >
                <span className="font-semibold text-[11px] uppercase tracking-wider block mb-1 opacity-50">
                  {turn.speaker === "ai" ? "AI Agent" : "Human"}
                </span>
                {turn.text}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-border-subtle px-5 py-3 bg-[var(--ct-neutral-100)]/50 text-center">
          <p className="text-[11px] text-content-subtle">
            Sensitive details (names, SSN, phone numbers, addresses, account numbers, company names) are obscured for privacy.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Call Card ─── */

function CallCard({ call, onViewTranscript }: { call: DemoCall; onViewTranscript: () => void }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-border-subtle hover:border-[var(--ct-blue-300)] hover:shadow-3 transition-all flex flex-col">
      {/* Title & description */}
      <h3 className="font-semibold text-content-strong text-base leading-snug">
        {call.title}
      </h3>

      <p className="text-sm text-content-subtle mt-1.5 leading-relaxed line-clamp-3">
        {call.description}
      </p>

      {/* Badges row */}
      <div className="flex flex-wrap items-center gap-1.5 mt-3">
        <span
          className={
            call.direction === "Inbound"
              ? "bg-emerald-100 text-emerald-700 rounded-full px-2.5 py-0.5 text-[11px] font-medium"
              : "bg-amber-100 text-amber-700 rounded-full px-2.5 py-0.5 text-[11px] font-medium"
          }
        >
          {call.direction}
        </span>

        <span className="bg-[var(--ct-blue-100)] text-[var(--ct-blue-800)] rounded-full px-2.5 py-0.5 text-[11px] font-medium">
          {call.voiceName}
        </span>

        <span className="ml-auto flex items-center gap-1 text-xs text-content-subtle">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {call.duration}
        </span>
      </div>

      {/* Highlights */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {call.highlights.map((h) => (
          <span
            key={h}
            className="text-[10px] font-medium text-content-subtle bg-[var(--ct-neutral-100)] rounded px-2 py-0.5"
          >
            {h}
          </span>
        ))}
      </div>

      {/* Spacer to push controls to bottom */}
      <div className="flex-1" />

      {/* Audio player */}
      <div className="mt-4">
        <AudioPlayer src={call.audioUrl} duration={call.duration} />
      </div>

      {/* View Transcript button */}
      <button
        onClick={onViewTranscript}
        className="mt-2.5 w-full h-10 rounded-xl border border-[var(--ct-blue-200)] bg-[var(--ct-blue-50)] hover:bg-[var(--ct-blue-100)] transition-colors flex items-center justify-center gap-2 cursor-pointer"
      >
        <svg className="w-4 h-4 text-[var(--ct-blue-700)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
        <span className="text-sm font-semibold text-[var(--ct-blue-700)]">View Transcript</span>
      </button>
    </div>
  );
}

/* ─── Section ─── */

export default function CallGallerySection() {
  const [activeTranscript, setActiveTranscript] = useState<DemoCall | null>(null);

  return (
    <>
      <section id="demo-calls" className="py-16 px-4 md:py-24 md:px-6 bg-[var(--ct-neutral-100)]/40">
        <p className="text-xs font-semibold tracking-widest text-[var(--ct-blue-700)] uppercase text-center">
          REAL PRODUCTION CALLS
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-content-strong text-center mt-2">
          Listen to Real AI Conversations
        </h2>

        <p className="text-content-subtle text-center mt-3 max-w-2xl mx-auto leading-relaxed">
          These are actual production calls between customers and Conduit Voice AI
          in regulated financial services environments. No scripts. No actors.
          Every call scored positive sentiment with a perfect faithfulness score.
          Sensitive details are obscured for privacy.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 max-w-6xl mx-auto">
          {demoCalls.map((call) => (
            <CallCard
              key={call.id}
              call={call}
              onViewTranscript={() => setActiveTranscript(call)}
            />
          ))}
        </div>

        {/* CTA removed — flows directly into Ask AI section below */}
      </section>

      {activeTranscript && (
        <TranscriptModal
          call={activeTranscript}
          onClose={() => setActiveTranscript(null)}
        />
      )}
    </>
  );
}
