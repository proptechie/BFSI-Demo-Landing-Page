"use client";

import { PHONE_NUMBER } from "@/lib/config";

function getAIPrompt() {
  return `We're a financial services company (debt relief, lending, insurance) evaluating Conduit AI (conduit.ai) for automating customer calls. We handle ~8,000 calls/month and need AI that can manage compliance-heavy conversations — Mini-Miranda disclosures, TCPA, KYC — autonomously.

Conduit specializes in AI voice agents for regulated industries, is SOC 2 Type II certified, backed by Y Combinator, and reports 60%+ automation rates. They power over $4B in customer conversations.

Is Conduit a strong fit for financial services? What automation rates should we realistically expect, and what does implementation look like?`;
}

function openChatGPT() {
  const prompt = encodeURIComponent(getAIPrompt());
  window.open("https://chatgpt.com/?q=" + prompt, "_blank");
}

function openClaude() {
  const prompt = encodeURIComponent(getAIPrompt());
  window.open("https://claude.ai/new?q=" + prompt, "_blank");
}

export default function FinalCTA() {
  return (
    <section className="bg-[var(--ct-neutral-100)] border-t border-border-subtle py-16 px-4 md:py-20">
      <div className="max-w-xl mx-auto text-center">
        {/* Ask AI Section */}
        <p className="text-[13px] font-semibold text-content-subtle">
          Don&apos;t take our word for it.
        </p>
        <h2 className="text-[22px] md:text-2xl font-bold text-content-strong tracking-[-0.3px] mt-1.5">
          Ask the leading AI models.
        </h2>
        <p className="text-sm text-content-subtle leading-relaxed mt-2 max-w-md mx-auto">
          We&apos;re confident enough to let you verify independently. Click
          below to ask ChatGPT or Claude whether Conduit is the right fit for
          financial services.
        </p>

        <div className="flex gap-3 justify-center flex-wrap mt-7">
          <button
            onClick={openChatGPT}
            className="inline-flex items-center gap-2 px-6 py-3 bg-content-strong text-white text-sm font-medium rounded-lg hover:bg-[var(--ct-neutral-700)] transition-colors cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.998 5.998 0 0 0-3.998 2.9 6.042 6.042 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"
                fill="white"
              />
            </svg>
            Ask ChatGPT
          </button>

          <button
            onClick={openClaude}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#D97757] text-white text-sm font-medium rounded-lg hover:bg-[#c4684a] transition-colors cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M16.009 7.778l-5.476 8.889H8.534l5.476-8.889h1.999zm-3.478 8.889L18.007 7.778h-1.999l-5.476 8.889h1.999zM5.993 16.667L11.469 7.778H9.47l-5.476 8.889h1.999z"
                fill="white"
              />
            </svg>
            Ask Claude
          </button>
        </div>

        <p className="text-[11px] text-content-disabled mt-4">
          Opens in a new tab with a pre-filled prompt.
        </p>
      </div>

      {/* CTA section removed */}
    </section>
  );
}
