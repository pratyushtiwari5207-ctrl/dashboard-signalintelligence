import { workflowStages } from "@/data/mockData";
import { BlurText } from "./BlurText";

export function CaseWorkload() {
  const max = Math.max(...workflowStages.map((s) => s.count));

  return (
    <section className="glass-panel rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="font-heading italic text-2xl md:text-3xl">
          <BlurText text="Case Workload" />
        </h2>
        <span className="text-[11px] uppercase tracking-wider text-white/40">Last 30 days</span>
      </div>

      <div className="space-y-3">
        {workflowStages.map((s, i) => {
          const pct = (s.count / max) * 100;
          const color = s.breach ? "var(--severity-critical)" : "var(--accent-neutral)";
          return (
            <div key={s.stage} className="grid grid-cols-[140px_1fr_60px] items-center gap-4">
              <div className="text-sm text-white/70 truncate">
                <span className="text-white/30 mr-2 tabular-nums text-xs">0{i + 1}</span>
                {s.stage}
              </div>
              <div className="relative h-8 rounded-md bg-white/[0.03] overflow-hidden border border-white/[0.06]">
                <div
                  className="h-full rounded-md transition-all duration-700"
                  style={{
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, ${color}55, ${color}22)`,
                    borderRight: `2px solid ${color}`,
                  }}
                />
                {s.breach && (
                  <span
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-wider font-medium px-1.5 py-0.5 rounded"
                    style={{ color: "var(--severity-critical)", background: "rgba(248,113,113,0.1)" }}
                  >
                    SLA breach
                  </span>
                )}
              </div>
              <div className="text-right tabular-nums text-sm font-medium">{s.count}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
