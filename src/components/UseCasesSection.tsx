"use client";

import { useState } from "react";
import { useCases, type UseCase } from "@/lib/data/use-cases";
import UseCaseModal from "@/components/UseCaseModal";

const USE_CASE_ICONS: Record<string, React.ReactNode> = {
  "speed-to-lead": (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  "nsf-recovery": (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
    </svg>
  ),
  "collections-outbound": (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  ),
  "settlement-approval": (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />
    </svg>
  ),
  "added-funds": (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  "compliance-qa": (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  "refinance": (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  ),
  "lead-reactivation": (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
    </svg>
  ),
};

interface UseCasesSectionProps {
  onGetStarted?: () => void;
}

export default function UseCasesSection({ onGetStarted }: UseCasesSectionProps) {
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);

  return (
    <section id="use-cases" className="py-16 px-4 md:py-24 md:px-6 bg-[var(--ct-neutral-100)]">
      <p className="text-xs font-semibold tracking-[2px] text-[var(--ct-blue-700)] uppercase text-center">
        USE CASES
      </p>
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--ct-neutral-900)] text-center mt-2">
        Engineer the Perfect Customer Experience
      </h2>
      <p className="text-[var(--ct-neutral-600)] text-center mt-3 max-w-lg mx-auto">
        See what Conduit AI can do. Click any use case to experience it live on your phone.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 max-w-5xl mx-auto">
        {useCases.map((useCase) => (
          <div
            key={useCase.id}
            onClick={() => {
              if (useCase.isSpeedToLead) {
                onGetStarted?.();
              } else {
                setSelectedUseCase(useCase);
              }
            }}
            className="bg-white rounded-2xl p-6 border border-[var(--ct-neutral-200)] hover:border-[var(--ct-blue-300)] hover:shadow-[0_8px_30px_rgba(0,145,255,0.1)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
          >
            {/* Icon + Name */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[var(--ct-blue-50)] group-hover:bg-[var(--ct-blue-200)] transition-colors flex items-center justify-center text-[var(--ct-blue-700)] shrink-0">
                {USE_CASE_ICONS[useCase.id]}
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-[var(--ct-neutral-900)] group-hover:text-[var(--ct-blue-700)] transition-colors leading-snug">
                  {useCase.name}
                </h3>
                <p className="text-sm text-[var(--ct-neutral-600)] mt-1.5 leading-relaxed">
                  {useCase.summary}
                </p>
              </div>
            </div>

            {/* Industries — all visible */}
            <div className="flex flex-wrap gap-1.5 mt-4 ml-[60px]">
              {useCase.industries.map((industry) => (
                <span
                  key={industry}
                  className="bg-[var(--ct-neutral-100)] text-[var(--ct-neutral-600)] rounded-full px-2.5 py-0.5 text-[10px] font-medium group-hover:bg-[var(--ct-blue-50)] group-hover:text-[var(--ct-blue-700)] transition-colors"
                >
                  {industry}
                </span>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-4 ml-[60px]">
              <span className="inline-flex items-center gap-1.5 bg-[var(--ct-blue-50)] text-[var(--ct-blue-700)] rounded-full px-4 py-2 text-[13px] font-semibold group-hover:bg-[var(--ct-blue-700)] group-hover:text-white transition-all">
                {useCase.cta}
                <svg
                  className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedUseCase && (
        <UseCaseModal
          useCase={selectedUseCase}
          onClose={() => setSelectedUseCase(null)}
        />
      )}
    </section>
  );
}
