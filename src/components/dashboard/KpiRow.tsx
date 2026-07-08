import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, Tooltip } from "recharts";
import { kpiSource } from "@/data/mockData";
import { useDashboard } from "@/context/DashboardContext";
import { useCountUp } from "@/hooks/useCountUp";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export function KpiRow() {
  const { product, loading } = useDashboard();
  const data = kpiSource[product];

  if (loading) {
    return (
      <section id="section-kpi" className="grid grid-cols-1 md:grid-cols-3 gap-4 scroll-mt-24">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-40 rounded-xl bg-white/[0.03]" />
        ))}
      </section>
    );
  }

  return (
    <section id="section-kpi" className="grid grid-cols-1 md:grid-cols-3 gap-4 scroll-mt-24">
      <KpiLiterature
        value={data.literature.value}
        trend={data.literature.trend}
        spark={[...data.literature.spark]}
      />
      <KpiIntake value={data.intake.value} slaAtRisk={data.intake.slaAtRisk} ack={data.intake.acknowledged} />
      <KpiSignals value={data.signals.value} critical={data.signals.critical} warning={data.signals.warning} stable={data.signals.stable} />
    </section>
  );
}

function Card({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card rounded-xl p-5 hover:bg-white/[0.055] transition-colors"
    >
      {children}
    </motion.div>
  );
}

function KpiLiterature({ value, trend, spark }: { value: number; trend: number; spark: number[] }) {
  const animated = useCountUp(value);
  const positive = trend >= 0;
  const data = spark.map((v, i) => ({ i, v }));

  return (
    <Card>
      <div className="text-xs text-white/50 uppercase tracking-wider">Literature safety events</div>
      <div className="mt-3 flex items-end justify-between gap-4">
        <div className="text-4xl font-light tabular-nums">{animated}</div>
        <div className="w-32 h-10">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 4, bottom: 4, left: 0, right: 0 }}>
              <Tooltip
                cursor={{ stroke: "rgba(255,255,255,0.15)", strokeWidth: 1 }}
                contentStyle={{
                  background: "rgba(20,20,24,0.9)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  fontSize: 11,
                }}
                labelFormatter={() => ""}
                formatter={(v: number) => [v, "events"]}
              />
              <Line
                type="monotone"
                dataKey="v"
                stroke="var(--accent-neutral)"
                strokeWidth={1.5}
                dot={false}
                activeDot={{ r: 3, fill: "var(--accent-neutral)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="text-[11px] text-white/50 mt-3 flex items-center gap-1.5">
        {positive ? (
          <ArrowUpRight size={12} style={{ color: "var(--severity-warning)" }} />
        ) : (
          <ArrowDownRight size={12} style={{ color: "var(--severity-stable)" }} />
        )}
        <span style={{ color: positive ? "var(--severity-warning)" : "var(--severity-stable)" }}>
          {positive ? "+" : ""}
          {trend}%
        </span>
        <span>vs. prior 30 days · 35% MedDRA coded</span>
      </div>
    </Card>
  );
}

function KpiIntake({ value, slaAtRisk, ack }: { value: number; slaAtRisk: number; ack: number }) {
  const animated = useCountUp(value);
  return (
    <Card delay={0.06}>
      <div className="text-xs text-white/50 uppercase tracking-wider">Internal case intake</div>
      <div className="mt-3 text-4xl font-light tabular-nums">{animated}</div>
      <div className="mt-3 flex items-center gap-2 flex-wrap">
        <span
          className="text-xs px-2 py-0.5 rounded-full font-medium"
          style={{
            background: slaAtRisk > 0 ? "rgba(248,113,113,0.12)" : "rgba(52,211,153,0.12)",
            color: slaAtRisk > 0 ? "var(--severity-critical)" : "var(--severity-stable)",
            border: `1px solid ${slaAtRisk > 0 ? "rgba(248,113,113,0.3)" : "rgba(52,211,153,0.3)"}`,
          }}
        >
          {slaAtRisk} SLA at risk
        </span>
        <span className="text-xs text-white/50">{ack} acknowledged</span>
      </div>
      <div className="text-[11px] text-white/50 mt-3">Live intake, cases, and workflow load</div>
    </Card>
  );
}

function KpiSignals({
  value,
  critical,
  warning,
  stable,
}: {
  value: number;
  critical: number;
  warning: number;
  stable: number;
}) {
  const animated = useCountUp(value);
  const total = critical + warning + stable || 1;
  return (
    <Card delay={0.12}>
      <div className="text-xs text-white/50 uppercase tracking-wider">Open signals under review</div>
      <div className="mt-3 text-4xl font-light tabular-nums">{animated}</div>
      <div className="mt-3 h-1.5 w-full rounded-full overflow-hidden bg-white/5 flex">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(critical / total) * 100}%` }}
          transition={{ duration: 0.6 }}
          style={{ background: "var(--severity-critical)" }}
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(warning / total) * 100}%` }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ background: "var(--severity-warning)" }}
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(stable / total) * 100}%` }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ background: "var(--severity-stable)" }}
        />
      </div>
      <div className="text-[11px] text-white/50 mt-3">
        {critical} critical · {warning} warning · {stable} stable
      </div>
    </Card>
  );
}
