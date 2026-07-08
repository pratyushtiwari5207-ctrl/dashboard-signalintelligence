import { AnimatePresence, motion } from "framer-motion";
import { signals, type Severity } from "@/data/mockData";
import { BlurText } from "./BlurText";
import { useDashboard } from "@/context/DashboardContext";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchX } from "lucide-react";

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
  const { product, search, severityFilter, loading } = useDashboard();
  const q = search.trim().toLowerCase();

  const filtered = signals.filter(
    (s) =>
      s.product === product &&
      (severityFilter === "all" || s.severity === severityFilter) &&
      (q === "" || s.pt.toLowerCase().includes(q) || s.context.toLowerCase().includes(q)),
  );

  return (
    <section id="section-triage" className="space-y-5 scroll-mt-24">
      <div className="flex items-baseline justify-between flex-wrap gap-2">
        <h2 className="font-heading italic text-3xl md:text-4xl text-white/95">
          <BlurText text="What needs attention" />
        </h2>
        <span className="text-[11px] uppercase tracking-wider text-white/40">
          {filtered.length} of {signals.filter((s) => s.product === product).length} signals
        </span>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl bg-white/[0.03]" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((s, i) => (
              <motion.article
                key={s.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -2 }}
                className="glass-card rounded-xl p-5 relative overflow-hidden cursor-pointer group"
                style={{ borderLeft: `3px solid ${sevColor[s.severity]}` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: sevColor[s.severity], boxShadow: `0 0 8px ${sevColor[s.severity]}` }}
                  />
                  <span
                    className="text-[11px] uppercase tracking-wider font-medium"
                    style={{ color: sevColor[s.severity] }}
                  >
                    {sevLabel[s.severity]}
                  </span>
                </div>
                <div className="text-lg font-medium text-white group-hover:text-white transition">{s.pt}</div>
                <div className="text-sm text-white/60 mt-1 leading-snug">{s.context}</div>
                <div className="text-[11px] text-white/40 mt-3">{s.age}</div>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 100% 0%, ${sevColor[s.severity]}12, transparent 60%)`,
                  }}
                />
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}

function EmptyState() {
  return (
    <div className="glass-card rounded-xl p-10 flex flex-col items-center text-center gap-3">
      <div className="w-12 h-12 rounded-full grid place-items-center bg-white/[0.04] border border-white/10">
        <SearchX className="w-5 h-5 text-white/50" />
      </div>
      <div className="text-white/80">No matching signals</div>
      <div className="text-sm text-white/50 max-w-sm">
        Try clearing the search or severity filter, or switch to another product.
      </div>
    </div>
  );
}
