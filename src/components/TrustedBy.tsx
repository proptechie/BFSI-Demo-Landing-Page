const STATS = [
  { value: "$4B+", label: "Conversations Facilitated" },
  { value: "Instant", label: "Response Time" },
  { value: "100%", label: "Compliant" },
  { value: "4.9/5", label: "Customer Rating" },
];

// height tuned per logo so they look visually balanced despite different aspect ratios
const LOGOS = [
  { name: "Nobu Hospitality", url: "/logos/nobu.png", h: "h-8" },
  { name: "DebtBlue", url: "https://debtblue.com/wp-content/uploads/2022/09/DebtBlue-Vector.svg", h: "h-7" },
  { name: "Golden Oak Lending", url: "/logos/golden-oak.png", h: "h-10" },
  { name: "Fairmont", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Fairmont_Hotels_and_Resorts_logo.svg/1280px-Fairmont_Hotels_and_Resorts_logo.svg.png", h: "h-6" },
  { name: "Level", url: "/logos/level.png", h: "h-7" },
  { name: "EF Education First", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/EF_Education_First_logo.svg/250px-EF_Education_First_logo.svg.png", h: "h-8" },
  { name: "Local Bank", url: "/logos/local-bank.png", h: "h-9" },
  { name: "Caesars", url: "/logos/caesars.png", h: "h-12" },
  { name: "Lighthouse", url: "https://www.lighthousefinancesolutions.com/wp-content/uploads/2025/09/Lighthouse-TM-1.png", h: "h-8" },
  { name: "River Relief", url: "https://riverrelief.com/wp-content/uploads/2024/12/rr-logo.png", h: "h-7" },
];

export default function TrustedBy() {
  // Double the array for seamless infinite scroll
  const scrollLogos = [...LOGOS, ...LOGOS];

  return (
    <section className="bg-surface-base py-16 px-4 md:py-20 border-b border-border-subtle">
      {/* Stats */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center ${
                i > 0 ? "md:border-l md:border-border-subtle" : ""
              }`}
            >
              <span className="text-heading-1 text-content-accent">
                {stat.value}
              </span>
              <span className="text-paragraph-xs-medium text-content-subtle mt-1.5 uppercase tracking-[1.5px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-3xl mx-auto border-t border-border-subtle mt-14 mb-14" />

      {/* Trusted By — single-row carousel */}
      <div className="text-center">
        <p className="text-paragraph-xs-medium text-content-subtle uppercase tracking-[2px]">
          Trusted by Industry Leaders
        </p>
      </div>

      <div className="relative overflow-hidden mt-10">
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-surface-base to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-surface-base to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="animate-logo-scroll items-center gap-14 md:gap-20">
          {scrollLogos.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity duration-300"
            >
              <img
                src={logo.url}
                alt={logo.name}
                className={`${logo.h} w-auto object-contain`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
