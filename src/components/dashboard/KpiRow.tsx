import { kpis } from "@/data/mockData";
import { Sparkline } from "./Sparkline";
import { ArrowUpRight } from "lucide-react";

export function KpiRow() {
  const total =
    kpis.signals.breakdown.critical + kpis.signals.breakdown.warning + kpis.signals.breakdown.stable;
  const seg = kpis.signals.breakdown;

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Literature */}
      <div className="glass-card rounded-xl p-5">
        <div className="text-xs text-white/50 uppercase tracking-wider">{kpis.literature.label}</div>
        <div className="mt-3 flex items-end justify-between gap-4">
          <div className="text-4xl font-light tabular-nums">{kpis.literature.value}</div>
          <Sparkline data={kpis.literature.spark} />
        </div>
        <div className="text-[11px] text-white/50 mt-3 flex items-center gap-1.5">
          <ArrowUpRight size={12} style={{ color: "var(--severity-warning)" }} />
          {kpis.literature.caption}
        </div>
      </div>

      {/* Intake */}
      <div className="glass-card rounded-xl p-5">
        <div className="text-xs text-white/50 uppercase tracking-wider">{kpis.intake.label}</div>
        <div className="mt-3 text-4xl font-light tabular-nums">{kpis.intake.value}</div>
        <div className="mt-3 flex items-center gap-2">
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{
              background: "rgba(248,113,113,0.12)",
              color: "var(--severity-critical)",
              border: "1px solid rgba(248,113,113,0.3)",
            }}
          >
            {kpis.intake.slaAtRisk} SLA at risk
          </span>
        </div>
        <div className="text-[11px] text-white/50 mt-3">{kpis.intake.caption}</div>
      </div>

      {/* Signals */}
      <div className="glass-card rounded-xl p-5">
        <div className="text-xs text-white/50 uppercase tracking-wider">{kpis.signals.label}</div>
        <div className="mt-3 text-4xl font-light tabular-nums">{kpis.signals.value}</div>
        <div className="mt-3 h-1.5 w-full rounded-full overflow-hidden bg-white/5 flex">
          <div style={{ width: `${(seg.critical / total) * 100}%`, background: "var(--severity-critical)" }} />
          <div style={{ width: `${(seg.warning / total) * 100}%`, background: "var(--severity-warning)" }} />
          <div style={{ width: `${(seg.stable / total) * 100}%`, background: "var(--severity-stable)" }} />
        </div>
        <div className="text-[11px] text-white/50 mt-3">{kpis.signals.caption}</div>
      </div>
    </section>
  );
}
