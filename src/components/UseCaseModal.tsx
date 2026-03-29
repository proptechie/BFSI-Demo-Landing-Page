"use client";

import { useState, useEffect, useCallback } from "react";
import { type UseCase } from "@/lib/data/use-cases";
import { PHONE_NUMBER } from "@/lib/config";

/* ─── Social proof counts per use case ─── */

const DEMO_COUNTS: Record<string, number> = {
  "speed-to-lead": 847,
  "nsf-recovery": 1247,
  "collections-outbound": 934,
  "settlement-approval": 1082,
  "added-funds": 1456,
  "compliance-qa": 1538,
  "refinance": 1129,
  "lead-reactivation": 967,
};

/* ─── Processing step definitions per use case ─── */

interface ProcessingStep {
  icon: string;
  label: string;
  detail: string;
  durationMs: number;
}

function getSteps(uc: UseCase, name: string): ProcessingStep[] {
  const m: Record<string, ProcessingStep[]> = {
    "speed-to-lead": [
      { icon: "📋", label: "Creating lead in Salesforce", detail: `Adding ${name} to the CRM pipeline`, durationMs: 3000 },
      { icon: "🔍", label: "Checking if already a customer", detail: "Searching Salesforce for existing records", durationMs: 4000 },
      { icon: "🏦", label: "Syncing lead details", detail: "Qualification data, source, and intake info → CRM", durationMs: 3500 },
      { icon: "💬", label: `Texting ${name} now`, detail: `"Hi ${name}, thanks for reaching out! Connecting you shortly."`, durationMs: 4000 },
      { icon: "👤", label: "Giving the sales team a shot", detail: "Notifying available reps to grab this lead...", durationMs: 6000 },
      { icon: "🤖", label: "Sales team was too slow", detail: "No rep grabbed it — AI agent is taking over", durationMs: 4000 },
      { icon: "🎯", label: "AI agent loading context", detail: "Pulling intake script, qualification questions, lead data", durationMs: 3500 },
      { icon: "📞", label: `Calling ${name} now`, detail: "Connecting AI agent to your phone — pick up!", durationMs: 4000 },
    ],
    "nsf-recovery": [
      { icon: "🏦", label: "Checking CRM for account", detail: `Looking up ${name}'s payment history`, durationMs: 3000 },
      { icon: "💳", label: "Verifying with payment system", detail: "Confirming draft failure — Status: Unpaid", durationMs: 4000 },
      { icon: "📊", label: "Pulling account details", detail: "Failed amount, original date, account standing", durationMs: 4000 },
      { icon: "🤖", label: "AI agent preparing script", detail: "Loading NSF recovery playbook", durationMs: 3000 },
      { icon: "💬", label: `Sending ${name} a text`, detail: "Heads up — we're calling about your payment", durationMs: 4000 },
      { icon: "📞", label: "Getting ready to call", detail: "Preparing to reschedule your payment", durationMs: 5000 },
    ],
    "collections-outbound": [
      { icon: "🏦", label: "Pulling account from CRM", detail: `Loading ${name}'s past-due balance`, durationMs: 3000 },
      { icon: "📊", label: "Checking payment history", detail: "Days past due, balance owed, prior attempts", durationMs: 4000 },
      { icon: "⚖️", label: "Loading compliance rules", detail: "Mini-Miranda disclosure, TCPA consent check", durationMs: 4000 },
      { icon: "🤖", label: "AI agent building approach", detail: "Payment plan options & arrangement scripts", durationMs: 4000 },
      { icon: "💬", label: `Texting ${name}`, detail: "Sending pre-call notification", durationMs: 4000 },
      { icon: "📞", label: "Initiating collections call", detail: "Connecting with AI agent now", durationMs: 5000 },
    ],
    "settlement-approval": [
      { icon: "✅", label: "Pulling settlement details", detail: "Creditor approved — loading offer terms", durationMs: 3000 },
      { icon: "🏦", label: "Checking account in CRM", detail: `Verifying ${name}'s enrollment & escrow`, durationMs: 4000 },
      { icon: "⏰", label: "Calculating deadline", detail: "Approval window closes in 72 hours", durationMs: 3000 },
      { icon: "🤖", label: "AI agent preparing", detail: "Loading settlement amount & acceptance script", durationMs: 5000 },
      { icon: "💬", label: `Texting ${name}`, detail: "Great news about your settlement — calling now", durationMs: 4000 },
      { icon: "📞", label: "Calling you now", detail: "Connecting to discuss your settlement approval", durationMs: 5000 },
    ],
    "added-funds": [
      { icon: "🏦", label: "Checking escrow account", detail: `Looking up ${name}'s trust balance`, durationMs: 3000 },
      { icon: "💰", label: "Calculating required deposit", detail: "Comparing balance to settlement requirement", durationMs: 4000 },
      { icon: "📅", label: "Checking deposit deadline", detail: "Settlement locks in 5 business days", durationMs: 3000 },
      { icon: "🤖", label: "AI agent loading context", detail: "Deposit amount, reason, and deadline ready", durationMs: 4000 },
      { icon: "💬", label: `Sending SMS to ${name}`, detail: "Heads up — calling about your account deposit", durationMs: 5000 },
      { icon: "📞", label: "Initiating your call", detail: "Ready to walk you through next steps", durationMs: 4000 },
    ],
    "compliance-qa": [
      { icon: "🎙️", label: "Pulling recent call recordings", detail: `Loading ${name}'s interaction history`, durationMs: 3000 },
      { icon: "📝", label: "Running transcription engine", detail: "Converting audio to searchable text", durationMs: 5000 },
      { icon: "⚖️", label: "Scanning for compliance flags", detail: "FDIC disclosures, Mini-Miranda, TCPA consent", durationMs: 5000 },
      { icon: "🔍", label: "Checking script adherence", detail: "Comparing agent responses to approved script", durationMs: 4000 },
      { icon: "🏦", label: "Syncing to Salesforce", detail: "Transcript, flags, and audit trail → CRM", durationMs: 4000 },
      { icon: "📞", label: "Running compliance intake call", detail: "Connecting you with AI compliance agent", durationMs: 4000 },
    ],
    "refinance": [
      { icon: "🏠", label: "Pulling loan from system", detail: `Loading ${name}'s current loan details`, durationMs: 3000 },
      { icon: "📊", label: "Checking current rates", detail: "Comparing existing rate to today's market", durationMs: 4000 },
      { icon: "💰", label: "Calculating potential savings", detail: "Estimating monthly & lifetime savings", durationMs: 4000 },
      { icon: "🤖", label: "AI agent preparing pitch", detail: "Loading refinance script & rate comparison", durationMs: 4000 },
      { icon: "💬", label: `Texting ${name}`, detail: "We have refinance options for you — calling now", durationMs: 4000 },
      { icon: "📞", label: "Connecting your call", detail: "AI agent ready to discuss your refinance", durationMs: 5000 },
    ],
    "lead-reactivation": [
      { icon: "🔍", label: "Searching CRM for lead", detail: `Found ${name} — last contact 45 days ago`, durationMs: 3000 },
      { icon: "📋", label: "Checking previous inquiry", detail: "Original interest, drop-off reason, notes", durationMs: 4000 },
      { icon: "🚫", label: "Checking do-not-contact", detail: "Verifying lead hasn't opted out or re-engaged", durationMs: 3000 },
      { icon: "🤖", label: "AI agent building approach", detail: "Personalizing re-engagement script", durationMs: 5000 },
      { icon: "💬", label: `Sending SMS to ${name}`, detail: "Checking in — has your situation changed?", durationMs: 4000 },
      { icon: "📞", label: "Initiating reactivation call", detail: "Reconnecting you with a specialist", durationMs: 5000 },
    ],
  };
  return m[uc.id] || m["speed-to-lead"];
}

/* ─── Icons ─── */

const SalesforceIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
    <path d="M10.006 5.17a3.505 3.505 0 012.553-1.084c1.379 0 2.578.802 3.15 1.964a3.86 3.86 0 011.426-.275c2.14 0 3.875 1.735 3.875 3.875s-1.735 3.875-3.875 3.875a3.86 3.86 0 01-.91-.109 3.125 3.125 0 01-2.84 1.834 3.1 3.1 0 01-1.294-.282 3.498 3.498 0 01-3.09 1.864 3.498 3.498 0 01-3.23-2.153A3.002 3.002 0 014 11.738a3.01 3.01 0 012.073-2.861 3.626 3.626 0 013.933-3.707z" />
  </svg>
);

const SpinnerIcon = () => (
  <div className="w-4 h-4 border-2 border-[var(--ct-blue-700)] border-t-transparent rounded-full animate-spin" />
);

const CheckIcon = () => (
  <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

/* ─── Processing Animation ─── */

function ProcessingView({ steps, onComplete }: { steps: ProcessingStep[]; onComplete: () => void }) {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const totalMs = steps.reduce((a, s) => a + s.durationMs, 0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed((e) => e + 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const advanceStep = useCallback(() => {
    setCompletedSteps((prev) => [...prev, activeStep]);
    if (activeStep < steps.length - 1) {
      setActiveStep((s) => s + 1);
    } else {
      onComplete();
    }
  }, [activeStep, steps.length, onComplete]);

  useEffect(() => {
    const timer = setTimeout(advanceStep, steps[activeStep].durationMs);
    return () => clearTimeout(timer);
  }, [activeStep, steps, advanceStep]);

  const progress = Math.min((elapsed / totalMs) * 100, 100);

  return (
    <div className="py-2">
      {/* Progress bar */}
      <div className="h-1.5 bg-[var(--ct-neutral-200)] rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-[var(--ct-blue-700)] rounded-full transition-all duration-300 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      <h2 className="text-lg font-bold text-[var(--ct-neutral-900)] text-center">
        Setting things up...
      </h2>
      <p className="text-sm text-[var(--ct-neutral-500)] text-center mt-1">
        This will take about 30 seconds
      </p>

      {/* Steps */}
      <div className="mt-6 space-y-3">
        {steps.map((step, i) => {
          const isCompleted = completedSteps.includes(i);
          const isActive = i === activeStep;
          const isPending = !isCompleted && !isActive;

          return (
            <div
              key={i}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
                isActive
                  ? "bg-[var(--ct-blue-50)] border border-[var(--ct-blue-200)]"
                  : isCompleted
                  ? "bg-emerald-50/50 border border-emerald-200/50"
                  : "bg-[var(--ct-neutral-100)]/50 border border-transparent opacity-40"
              }`}
            >
              {/* Status icon */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                isActive
                  ? "bg-[var(--ct-blue-100)]"
                  : isCompleted
                  ? "bg-emerald-100"
                  : "bg-[var(--ct-neutral-200)]"
              }`}>
                {isActive ? <SpinnerIcon /> : isCompleted ? <CheckIcon /> : (
                  <span className="text-sm opacity-50">{step.icon}</span>
                )}
              </div>

              {/* Label */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  {!isPending && <span className="text-base">{step.icon}</span>}
                  <span className={`text-sm font-semibold ${
                    isActive ? "text-[var(--ct-blue-700)]" : isCompleted ? "text-emerald-700" : "text-[var(--ct-neutral-500)]"
                  }`}>
                    {step.label}
                  </span>
                </div>
                {(isActive || isCompleted) && (
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {isCompleted && <SalesforceIcon />}
                    <span className={`text-xs ${isActive ? "text-[var(--ct-blue-600)]" : "text-emerald-600"}`}>
                      {isCompleted ? "Done — synced to Salesforce" : step.detail}
                    </span>
                  </div>
                )}
              </div>

              {/* Completion indicator */}
              {isCompleted && (
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

/* ─── Ready State — phone ringing ─── */

function ReadyView({ name, onClose }: { name: string; onClose: () => void }) {
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (count <= 0) return;
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <div className="text-center py-4">
      {/* Animated phone icon */}
      <div className="mx-auto w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-5 animate-bounce">
        <span className="text-4xl">📞</span>
      </div>

      <h2 className="text-xl font-bold text-[var(--ct-neutral-900)]">
        Check your phone, {name}!
      </h2>
      <p className="text-sm text-[var(--ct-neutral-600)] mt-2">
        Your call is on the way. Pick up — it&apos;s our AI agent.
      </p>

      {/* Countdown */}
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

      <div className="mt-6">
        <p className="text-xs text-[var(--ct-neutral-500)]">
          Calling from <strong>{PHONE_NUMBER}</strong>
        </p>
      </div>

      <button
        onClick={onClose}
        className="mt-6 text-sm text-[var(--ct-neutral-500)] hover:text-[var(--ct-neutral-700)] underline underline-offset-4 transition-colors"
      >
        Close
      </button>
    </div>
  );
}

/* ─── Main Modal ─── */

interface UseCaseModalProps {
  useCase: UseCase;
  onClose: () => void;
}

export default function UseCaseModal({ useCase, onClose }: UseCaseModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [phase, setPhase] = useState<"form" | "processing" | "ready" | "error">("form");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch(useCase.webhookPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, phone, useCase: useCase.id }),
      });
      if (!res.ok) throw new Error("Failed");
      setPhase("processing");
    } catch {
      setPhase("error");
    }
  }

  const phoneTel = `+1${PHONE_NUMBER.replace(/\D/g, "")}`;
  const steps = getSteps(useCase, firstName || "you");

  const inputClasses =
    "w-full border border-[var(--ct-neutral-300)] rounded-xl px-4 py-3 text-base text-[var(--ct-neutral-900)] focus:outline-none focus:ring-2 focus:ring-[var(--ct-blue-700)] focus:border-transparent placeholder:text-[var(--ct-neutral-400)] bg-white transition-all";

  return (
    <>
      <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] max-w-md w-full p-6 md:p-8 relative max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[var(--ct-neutral-400)] hover:text-[var(--ct-neutral-700)] min-w-[40px] min-h-[40px] flex items-center justify-center transition-colors rounded-full hover:bg-[var(--ct-neutral-100)]"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Phase: Form */}
          {phase === "form" && (
            <>
              <h2 className="text-xl font-bold text-[var(--ct-neutral-900)] pr-8">
                {useCase.cta}
              </h2>
              <p className="text-sm text-[var(--ct-neutral-600)] mt-1">
                Enter your details and we&apos;ll trigger this demo for you.
              </p>

              {/* Social proof */}
              <div className="flex items-center gap-3 mt-4 py-2.5 px-4 bg-[var(--ct-blue-50)] rounded-xl border border-[var(--ct-blue-200)]">
                <div className="flex -space-x-2">
                  {["A", "K", "R"].map((l, i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-[var(--ct-blue-700)] border-2 border-white flex items-center justify-center text-white text-[9px] font-bold" style={{ opacity: 1 - i * 0.15 }}>{l}</div>
                  ))}
                </div>
                <p className="text-xs text-[var(--ct-neutral-600)]"><span className="font-semibold text-[var(--ct-neutral-900)]">{(DEMO_COUNTS[useCase.id] || 1100).toLocaleString()} calls</span> made with this workflow today</p>
              </div>

              <p className="text-sm text-[var(--ct-neutral-600)] mt-3 p-4 bg-[var(--ct-blue-50)] rounded-xl border border-[var(--ct-blue-200)] leading-relaxed">
                {useCase.description}
              </p>

              <form onSubmit={handleSubmit} className="mt-5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-[var(--ct-neutral-900)] mb-1 block">First Name</label>
                    <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Jane" className={inputClasses} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[var(--ct-neutral-900)] mb-1 block">Last Name</label>
                    <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Smith" className={inputClasses} />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="text-sm font-medium text-[var(--ct-neutral-900)] mb-1 block">Phone Number</label>
                  <input type="tel" inputMode="tel" autoComplete="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 123-4567" className={inputClasses} />
                </div>
                <button type="submit" className="w-full bg-[var(--ct-blue-700)] text-white rounded-full py-3.5 text-base font-bold hover:bg-[var(--ct-blue-800)] transition-colors mt-5">
                  {useCase.cta}
                </button>
              </form>
            </>
          )}

          {/* Phase: Processing animation */}
          {phase === "processing" && (
            <ProcessingView steps={steps} onComplete={() => setPhase("ready")} />
          )}

          {/* Phase: Ready — phone ringing */}
          {phase === "ready" && (
            <ReadyView name={firstName} onClose={onClose} />
          )}

          {/* Phase: Error */}
          {phase === "error" && (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-[var(--ct-neutral-900)]">Something went wrong</h2>
              <p className="text-sm text-[var(--ct-neutral-600)] mt-2">
                Try calling us directly at{" "}
                <a href={`tel:${phoneTel}`} className="text-[var(--ct-blue-700)] underline">{PHONE_NUMBER}</a>
              </p>
              <div className="flex gap-3 justify-center mt-6">
                <button onClick={() => setPhase("form")} className="bg-[var(--ct-blue-700)] text-white rounded-full px-6 py-3 font-bold hover:bg-[var(--ct-blue-800)] transition-colors">
                  Try Again
                </button>
                <button onClick={onClose} className="bg-[var(--ct-neutral-100)] text-[var(--ct-neutral-900)] rounded-full px-6 py-3 font-bold hover:bg-[var(--ct-neutral-200)] transition-colors">
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
