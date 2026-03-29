const STEPS = [
  {
    number: 1,
    title: "Choose Your Service",
    description: "Select what you need help with — debt relief, lending, insurance, or something else.",
    icon: "🎯",
  },
  {
    number: 2,
    title: "Enter Your Details",
    description: "Just your name and phone number. It takes less than 30 seconds.",
    icon: "📝",
  },
  {
    number: 3,
    title: "Get an Instant Call",
    description: "Our AI agent calls you immediately. No hold music. No runaround.",
    icon: "📞",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 px-4 md:py-24 md:px-6 bg-white">
      <p className="text-xs font-semibold tracking-widest text-[var(--ct-blue-700)] uppercase text-center">
        HOW IT WORKS
      </p>
      <h2 className="text-2xl md:text-3xl font-bold text-content-strong text-center mt-2">
        Get Help in 3 Simple Steps
      </h2>
      <p className="text-content-subtle text-center mt-3 max-w-lg mx-auto">
        No apps to download. No accounts to create. Just tell us what you need.
      </p>

      <div className="flex flex-col md:flex-row gap-6 md:gap-0 mt-14 max-w-4xl mx-auto relative">
        {/* Connector line (desktop) */}
        <div className="hidden md:block absolute top-8 left-[16.67%] right-[16.67%] h-0.5 bg-[var(--ct-blue-200)]" />

        {STEPS.map((step) => (
          <div key={step.number} className="flex-1 text-center relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-[var(--ct-blue-50)] border-2 border-[var(--ct-blue-700)] flex items-center justify-center mx-auto text-2xl shadow-sm">
              {step.icon}
            </div>
            <div className="mt-4">
              <span className="text-xs font-bold text-[var(--ct-blue-700)] uppercase tracking-wider">
                Step {step.number}
              </span>
              <h3 className="text-lg font-bold text-content-strong mt-1">
                {step.title}
              </h3>
              <p className="text-sm text-content-subtle mt-2 leading-relaxed max-w-[250px] mx-auto">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA — repeat the primary conversion action */}
      <div className="text-center mt-14">
        <a
          href="#hero"
          className="inline-flex items-center gap-2 bg-[var(--ct-blue-700)] text-white rounded-full px-8 py-4 text-base font-bold hover:bg-[var(--ct-blue-800)] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          Get Started Now
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>
        <p className="text-xs text-content-subtle mt-3">Free consultation. No obligation. Takes 30 seconds.</p>
      </div>
    </section>
  );
}
