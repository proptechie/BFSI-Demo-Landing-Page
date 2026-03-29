const badges = [
  {
    label: "SOC 2 Type II",
    sublabel: "Type II Audited",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-[var(--ct-blue-700)]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    label: "HIPAA Certified",
    sublabel: "Fully Certified",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-[var(--ct-blue-700)]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "PCI-DSS Compliant",
    sublabel: "Payment Security",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-[var(--ct-blue-700)]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    label: "TCPA Consent",
    sublabel: "Consent Management",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-[var(--ct-blue-700)]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

export default function SecuritySection() {
  return (
    <section
      id="security"
      className="py-16 px-4 md:py-24 md:px-6 bg-[var(--ct-blue-50)]"
    >
      <p className="text-xs font-semibold tracking-widest text-[var(--ct-blue-700)] uppercase text-center">
        SECURITY &amp; TRUST
      </p>

      <h2 className="text-2xl md:text-3xl font-bold text-content-strong text-center mt-2">
        Your Data is Safe. We Take That Seriously.
      </h2>

      <p className="text-content-subtle text-center mt-3 max-w-2xl mx-auto">
        Even though this is a demo, Conduit&apos;s AI platform meets the highest security standards in financial services.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto">
        {badges.map((badge) => (
          <div
            key={badge.label}
            className="bg-white rounded-2xl p-6 text-center border border-border-subtle hover:shadow-3 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-[var(--ct-blue-50)] flex items-center justify-center mx-auto">
              {badge.icon}
            </div>
            <p className="text-sm font-bold text-content-strong mt-3">
              {badge.label}
            </p>
            <p className="text-xs text-content-subtle mt-1">
              {badge.sublabel}
            </p>
          </div>
        ))}
      </div>

      <p className="text-content-subtle text-center max-w-2xl mx-auto mt-8 leading-relaxed">
        All conversations are encrypted end-to-end. Payment data is handled in
        PCI-DSS compliant environments. Outbound calls include proper TCPA
        consent management. And yes, we have data residency controls too.
      </p>

      <div className="text-center">
        <a
          href="https://trust.conduit.ai"
          className="bg-[var(--ct-blue-700)] text-white rounded-full px-8 py-3.5 font-semibold hover:bg-[var(--ct-blue-800)] transition-all inline-block mt-6 shadow-lg hover:shadow-xl"
        >
          Visit Our Trust Center →
        </a>
      </div>

      <p className="text-sm text-content-subtle text-center mt-8 italic">
        We take security seriously — even when the bank isn&apos;t real.
      </p>

      <div className="flex items-center justify-center gap-2 mt-6">
        <span className="text-xs text-content-disabled">Powered by</span>
        <a
          href="https://conduit.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-[var(--ct-blue-700)] hover:underline"
        >
          Conduit AI
        </a>
      </div>
    </section>
  );
}
