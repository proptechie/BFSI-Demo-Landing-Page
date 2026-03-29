"use client";

import { useEffect, useState, useCallback } from "react";
import { PHONE_NUMBER, PHONE_NUMBER_TEL } from "@/lib/config";

interface OptInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ─── Processing Steps ─── */

interface Step {
  icon: string;
  label: string;
  detail: string;
  durationMs: number;
}

function getSteps(name: string): Step[] {
  return [
    { icon: "📋", label: "Creating lead in Salesforce", detail: `Adding ${name} to the CRM pipeline`, durationMs: 3000 },
    { icon: "🔍", label: "Checking if already a customer", detail: "Searching Salesforce for existing records", durationMs: 4000 },
    { icon: "🏦", label: "Syncing lead details", detail: "Qualification data, source, and intake info → CRM", durationMs: 3500 },
    { icon: "💬", label: `Texting ${name} now`, detail: `"Hi ${name}, thanks for reaching out! We're connecting you with a specialist."`, durationMs: 4000 },
    { icon: "👤", label: "Giving the sales team a shot", detail: "Notifying available reps to grab this lead...", durationMs: 6000 },
    { icon: "🤖", label: "Sales team was too slow", detail: "No rep grabbed it — AI agent is taking over", durationMs: 4000 },
    { icon: "🎯", label: "AI agent loading context", detail: "Pulling intake script, qualification questions, lead data", durationMs: 3500 },
    { icon: "📞", label: `Calling ${name} now`, detail: "Connecting AI agent to your phone — pick up!", durationMs: 4000 },
  ];
}

/* ─── Spinner + Check ─── */

const Spinner = () => <div className="w-4 h-4 border-2 border-[var(--ct-blue-700)] border-t-transparent rounded-full animate-spin" />;
const Check = () => (
  <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

/* ─── Processing View ─── */

function ProcessingView({ steps, onComplete }: { steps: Step[]; onComplete: () => void }) {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const total = steps.reduce((a, s) => a + s.durationMs, 0);

  useEffect(() => {
    const i = setInterval(() => setElapsed((e) => e + 100), 100);
    return () => clearInterval(i);
  }, []);

  const advance = useCallback(() => {
    setCompleted((p) => [...p, activeStep]);
    if (activeStep < steps.length - 1) setActiveStep((s) => s + 1);
    else onComplete();
  }, [activeStep, steps.length, onComplete]);

  useEffect(() => {
    const t = setTimeout(advance, steps[activeStep].durationMs);
    return () => clearTimeout(t);
  }, [activeStep, steps, advance]);

  return (
    <div className="py-2">
      <div className="h-1.5 bg-[var(--ct-neutral-200)] rounded-full overflow-hidden mb-6">
        <div className="h-full bg-[var(--ct-blue-700)] rounded-full transition-all duration-300" style={{ width: `${Math.min((elapsed / total) * 100, 100)}%` }} />
      </div>
      <h2 className="text-lg font-bold text-[var(--ct-neutral-900)] text-center">Setting things up...</h2>
      <p className="text-sm text-[var(--ct-neutral-500)] text-center mt-1">This will take about 30 seconds</p>

      <div className="mt-6 space-y-3">
        {steps.map((step, i) => {
          const done = completed.includes(i);
          const active = i === activeStep;
          return (
            <div key={i} className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
              active ? "bg-[var(--ct-blue-50)] border border-[var(--ct-blue-200)]"
                : done ? "bg-emerald-50/50 border border-emerald-200/50"
                : "bg-[var(--ct-neutral-100)]/50 border border-transparent opacity-40"
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${active ? "bg-[var(--ct-blue-100)]" : done ? "bg-emerald-100" : "bg-[var(--ct-neutral-200)]"}`}>
                {active ? <Spinner /> : done ? <Check /> : <span className="text-sm opacity-50">{step.icon}</span>}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  {!(!done && !active) && <span className="text-base">{step.icon}</span>}
                  <span className={`text-sm font-semibold ${active ? "text-[var(--ct-blue-700)]" : done ? "text-emerald-700" : "text-[var(--ct-neutral-500)]"}`}>{step.label}</span>
                </div>
                {(active || done) && (
                  <span className={`text-xs mt-0.5 block ${active ? "text-[var(--ct-blue-600)]" : "text-emerald-600"}`}>
                    {done ? "Done — synced to Salesforce" : step.detail}
                  </span>
                )}
              </div>
              {done && (
                <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Ready View ─── */

function ReadyView({ name, onClose }: { name: string; onClose: () => void }) {
  const [count, setCount] = useState(5);
  useEffect(() => {
    if (count <= 0) return;
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <div className="text-center py-4">
      <div className="mx-auto w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-5 animate-bounce">
        <span className="text-4xl">📞</span>
      </div>
      <h2 className="text-xl font-bold text-[var(--ct-neutral-900)]">Check your phone, {name}!</h2>
      <p className="text-sm text-[var(--ct-neutral-600)] mt-2">Your call is on the way. Pick up — it&apos;s our AI agent.</p>
      {count > 0 ? (
        <div className="mt-6 inline-flex items-center gap-3 bg-[var(--ct-blue-50)] border border-[var(--ct-blue-200)] rounded-2xl px-6 py-4">
          <span className="text-3xl font-extrabold text-[var(--ct-blue-700)] tabular-nums w-8 text-center">{count}</span>
          <span className="text-sm text-[var(--ct-blue-700)]">seconds</span>
        </div>
      ) : (
        <div className="mt-6 inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 rounded-2xl px-6 py-4">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
          </div>
          <span className="text-sm font-semibold text-emerald-700">Ringing now...</span>
        </div>
      )}
      <p className="text-xs text-[var(--ct-neutral-500)] mt-4">Calling from <strong>{PHONE_NUMBER}</strong></p>
      <button onClick={onClose} className="mt-4 text-sm text-[var(--ct-neutral-500)] hover:text-[var(--ct-neutral-700)] underline underline-offset-4 transition-colors">Close</button>
    </div>
  );
}

/* ─── Main Modal ─── */

export default function OptInModal({ isOpen, onClose }: OptInModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [scenario, setScenario] = useState("General Inquiry");
  const [phase, setPhase] = useState<"form" | "processing" | "ready" | "error">("form");

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) { if (e.key === "Escape") handleClose(); }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/webhooks/speed-to-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, phone, scenario }),
      });
      if (!res.ok) throw new Error("Failed");
      setPhase("processing");
    } catch {
      setPhase("error");
    }
  }

  function handleClose() {
    setPhase("form");
    setFirstName("");
    setLastName("");
    setPhone("");
    setScenario("General Inquiry");
    onClose();
  }

  const steps = getSteps(firstName || "you");

  const inputClasses =
    "w-full border border-[var(--ct-neutral-300)] rounded-xl px-4 py-3.5 text-base text-[var(--ct-neutral-900)] focus:outline-none focus:ring-2 focus:ring-[var(--ct-blue-700)] focus:border-transparent placeholder:text-[var(--ct-neutral-400)] bg-white transition-all";

  return (
    <>
      <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm" onClick={handleClose} />

      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] max-w-lg w-full p-6 md:p-8 relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <button onClick={handleClose} className="absolute top-4 right-4 text-[var(--ct-neutral-400)] hover:text-[var(--ct-neutral-700)] min-w-[40px] min-h-[40px] flex items-center justify-center transition-colors rounded-full hover:bg-[var(--ct-neutral-100)]" aria-label="Close">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Form */}
          {phase === "form" && (
            <>
              <h2 className="text-2xl font-bold text-[var(--ct-neutral-900)]">Get in Touch</h2>
              <p className="text-sm text-[var(--ct-neutral-600)] mt-1">Fill in your details and our AI agent will call you in under 30 seconds.</p>

              {/* Social proof */}
              <div className="flex items-center gap-3 mt-4 py-3 px-4 bg-[var(--ct-blue-50)] rounded-xl border border-[var(--ct-blue-200)]">
                <div className="flex -space-x-2">
                  {["J", "M", "S"].map((l, i) => (
                    <div key={i} className="w-7 h-7 rounded-full bg-[var(--ct-blue-700)] border-2 border-white flex items-center justify-center text-white text-[10px] font-bold" style={{ opacity: 1 - i * 0.15 }}>{l}</div>
                  ))}
                </div>
                <p className="text-xs text-[var(--ct-neutral-600)]"><span className="font-semibold text-[var(--ct-neutral-900)]">847 people</span> got a callback today</p>
              </div>

              <form onSubmit={handleSubmit} className="mt-5">
                {/* Service type — two tappable cards */}
                <label className="text-sm font-medium text-[var(--ct-neutral-900)] mb-2 block">I&apos;m looking for</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setScenario("Debt Relief")}
                    className={`border-2 rounded-xl p-4 text-center transition-all ${
                      scenario === "Debt Relief"
                        ? "border-[var(--ct-blue-700)] bg-[var(--ct-blue-50)] ring-2 ring-[var(--ct-blue-700)]/20"
                        : "border-[var(--ct-neutral-200)] bg-white hover:border-[var(--ct-blue-300)]"
                    }`}
                  >
                    <span className="text-2xl block">💰</span>
                    <span className={`text-sm font-semibold mt-1 block ${scenario === "Debt Relief" ? "text-[var(--ct-blue-700)]" : "text-[var(--ct-neutral-900)]"}`}>Debt Relief</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setScenario("Lending & Loans")}
                    className={`border-2 rounded-xl p-4 text-center transition-all ${
                      scenario === "Lending & Loans"
                        ? "border-[var(--ct-blue-700)] bg-[var(--ct-blue-50)] ring-2 ring-[var(--ct-blue-700)]/20"
                        : "border-[var(--ct-neutral-200)] bg-white hover:border-[var(--ct-blue-300)]"
                    }`}
                  >
                    <span className="text-2xl block">🏠</span>
                    <span className={`text-sm font-semibold mt-1 block ${scenario === "Lending & Loans" ? "text-[var(--ct-blue-700)]" : "text-[var(--ct-neutral-900)]"}`}>Loan</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div>
                    <label className="text-sm font-medium text-[var(--ct-neutral-900)] mb-1.5 block">First Name</label>
                    <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Jane" className={inputClasses} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[var(--ct-neutral-900)] mb-1.5 block">Last Name</label>
                    <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Smith" className={inputClasses} />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="text-sm font-medium text-[var(--ct-neutral-900)] mb-1.5 block">Phone Number</label>
                  <input type="tel" inputMode="tel" autoComplete="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 123-4567" className={inputClasses} />
                </div>
                <button type="submit" className="w-full bg-[var(--ct-blue-700)] text-white rounded-full py-4 text-lg font-semibold hover:bg-[var(--ct-blue-800)] transition-colors mt-6">
                  Get in Touch &rarr;
                </button>
                <p className="text-xs text-[var(--ct-neutral-500)] text-center mt-3">Free &bull; No Obligation &bull; Takes 30 Seconds</p>
              </form>
            </>
          )}

          {/* Processing */}
          {phase === "processing" && <ProcessingView steps={steps} onComplete={() => setPhase("ready")} />}

          {/* Ready */}
          {phase === "ready" && <ReadyView name={firstName} onClose={handleClose} />}

          {/* Error */}
          {phase === "error" && (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-[var(--ct-neutral-900)]">Something went wrong</h2>
              <p className="text-sm text-[var(--ct-neutral-600)] mt-2">Try calling us directly at <a href={`tel:${PHONE_NUMBER_TEL}`} className="text-[var(--ct-blue-700)] underline">{PHONE_NUMBER}</a></p>
              <div className="flex gap-3 justify-center mt-6">
                <button onClick={() => setPhase("form")} className="bg-[var(--ct-blue-700)] text-white rounded-full px-6 py-3 font-bold hover:bg-[var(--ct-blue-800)] transition-colors">Try Again</button>
                <button onClick={handleClose} className="bg-[var(--ct-neutral-100)] text-[var(--ct-neutral-900)] rounded-full px-6 py-3 font-bold hover:bg-[var(--ct-neutral-200)] transition-colors">Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
