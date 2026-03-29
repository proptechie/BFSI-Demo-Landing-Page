import { services } from "@/lib/data/services";
import { PHONE_NUMBER, PHONE_NUMBER_TEL } from "@/lib/config";

const serviceIcons: Record<string, React.ReactNode> = {
  "bank-note": (
    <svg className="w-6 h-6 text-[var(--ct-blue-700)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
    </svg>
  ),
  building: (
    <svg className="w-6 h-6 text-[var(--ct-blue-700)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  ),
  wallet: (
    <svg className="w-6 h-6 text-[var(--ct-blue-700)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 013 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 013 6v3" />
    </svg>
  ),
  shield: (
    <svg className="w-6 h-6 text-[var(--ct-blue-700)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  briefcase: (
    <svg className="w-6 h-6 text-[var(--ct-blue-700)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
    </svg>
  ),
  "credit-card": (
    <svg className="w-6 h-6 text-[var(--ct-blue-700)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
    </svg>
  ),
};

const serviceSubheadlines: Record<string, string> = {
  "Debt Relief": "Take back control of your finances",
  "Lending": "Get answers in minutes, not days",
  "Personal Banking": "Your accounts, always at your fingertips",
  "Insurance": "Protection made simple and instant",
  "Business Banking": "Built for businesses that move fast",
  "Credit Cards": "Rewards, disputes, and more — handled instantly",
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 px-4 md:py-24 md:px-6 bg-[var(--ct-neutral-100)]">
      <p className="text-xs font-semibold tracking-widest text-[var(--ct-blue-700)] uppercase text-center">
        OUR SERVICES
      </p>

      <h2 className="text-2xl md:text-3xl font-bold text-content-strong text-center mt-2">
        Financial Services, Reimagined with AI
      </h2>

      <p className="text-content-subtle text-center mt-3 max-w-2xl mx-auto leading-relaxed">
        Whether you&apos;re managing debt, buying a home, or protecting what matters — our AI agents are here 24/7.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 max-w-6xl mx-auto">
        {services.map((service) => (
          <div
            key={service.title}
            className="bg-white rounded-2xl p-6 shadow-1 border border-border-subtle hover:border-[var(--ct-blue-200)] hover:shadow-3 hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[var(--ct-blue-50)] group-hover:bg-[var(--ct-blue-200)] transition-colors flex items-center justify-center">
              {serviceIcons[service.icon] || (
                <svg
                  className="w-6 h-6 text-[var(--ct-blue-700)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </div>

            <h3 className="text-lg font-semibold text-content-strong mt-4">
              {service.title}
            </h3>

            <p className="text-xs font-medium text-[var(--ct-blue-700)] mt-0.5">
              {serviceSubheadlines[service.title]}
            </p>

            <p className="text-sm text-content-subtle mt-2 leading-relaxed">
              {service.description}
            </p>

            <span className="text-sm font-medium text-[var(--ct-blue-700)] mt-4 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Explore this service
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-[var(--ct-blue-700)] to-[var(--ct-blue-950)] rounded-2xl p-8 md:p-10 mt-16 max-w-6xl mx-auto text-center">
        <p className="text-xl md:text-2xl font-bold text-white">
          Ready to experience AI-powered banking?
        </p>
        <p className="text-white/80 mt-2">
          Call us or chat with our agent — we&apos;re available 24/7.
        </p>
        <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
          <a
            href={`tel:${PHONE_NUMBER_TEL}`}
            className="border-2 border-white text-white rounded-full px-6 py-3 font-semibold hover:bg-white/10 transition-all"
          >
            Call {PHONE_NUMBER}
          </a>
          <a
            href="#hero"
            className="border-2 border-white text-white rounded-full px-6 py-3 font-semibold hover:bg-white/10 transition-all"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
}
