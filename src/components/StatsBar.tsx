const STATS = [
  { value: "$4B+", label: "Conversations Facilitated" },
  { value: "Instant", label: "Response Time" },
  { value: "4.9/5", label: "Customer Rating" },
  { value: "98%", label: "Resolution Rate" },
];

export default function StatsBar() {
  return (
    <section className="relative z-10 -mt-16 px-4 pb-12">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-border-subtle px-6 py-8 md:px-10 md:py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center ${
                i > 0 ? "md:border-l md:border-border-subtle" : ""
              }`}
            >
              <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--ct-blue-700)] tracking-tight tabular-nums">
                {stat.value}
              </span>
              <span className="text-[11px] md:text-xs text-content-subtle mt-1.5 uppercase tracking-[1.5px] font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
