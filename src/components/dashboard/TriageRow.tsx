import { signals, type Severity } from "@/data/mockData";
import { BlurText } from "./BlurText";

const sevColor: Record<Severity, string> = {
  critical: "var(--severity-critical)",
  warning: "var(--severity-warning)",
  stable: "var(--severity-stable)",
};

const sevLabel: Record<Severity, string> = {
  critical: "Critical",
  warning: "Warning",
  stable: "Stable",
};

export function TriageRow() {
  return (
    <section className="space-y-5">
      <h2 className="font-heading italic text-3xl md:text-4xl text-white/95">
        <BlurText text="What needs attention" />
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {signals.map((s) => (
          <article
            key={s.id}
            className="glass-card rounded-xl p-5 relative overflow-hidden"
            style={{ borderLeft: `3px solid ${sevColor[s.severity]}` }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: sevColor[s.severity] }}
              />
              <span
                className="text-[11px] uppercase tracking-wider font-medium"
                style={{ color: sevColor[s.severity] }}
              >
                {sevLabel[s.severity]}
              </span>
            </div>
            <div className="text-lg font-medium text-white">{s.pt}</div>
            <div className="text-sm text-white/60 mt-1 leading-snug">{s.context}</div>
            <div className="text-[11px] text-white/40 mt-3">{s.age}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
