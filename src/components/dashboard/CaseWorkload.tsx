import { workflowSource } from "@/data/mockData";
import { BlurText } from "./BlurText";
import { useDashboard } from "@/context/DashboardContext";
import { Skeleton } from "@/components/ui/skeleton";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, LabelList } from "recharts";

export function CaseWorkload() {
  const { product, loading, dateRange } = useDashboard();
  const stages = workflowSource[product];

  return (
    <section id="section-workload" className="glass-panel rounded-2xl p-6 md:p-8 space-y-6 scroll-mt-24">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="font-heading italic text-2xl md:text-3xl">
          <BlurText text="Case Workload" />
        </h2>
        <span className="text-[11px] uppercase tracking-wider text-white/40">{dateRange}</span>
      </div>

      {loading ? (
        <Skeleton className="h-[280px] rounded-xl bg-white/[0.03]" />
      ) : (
        <div className="h-[280px] -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={stages}
              layout="vertical"
              margin={{ top: 8, right: 24, left: 20, bottom: 8 }}
              barCategoryGap={10}
            >
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="stage"
                axisLine={false}
                tickLine={false}
                width={140}
                tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12, fontFamily: "Barlow" }}
              />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.03)" }}
                contentStyle={{
                  background: "rgba(20,20,24,0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  fontSize: 12,
                  fontFamily: "Barlow",
                  color: "white",
                }}
                formatter={(value: number, _n, item: { payload?: { breach?: boolean } }) => [
                  `${value} case${value === 1 ? "" : "s"}${item?.payload?.breach ? " · SLA breach" : ""}`,
                  "Count",
                ]}
                labelStyle={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}
              />
              <Bar dataKey="count" radius={[6, 6, 6, 6]} background={{ fill: "rgba(255,255,255,0.03)", radius: 6 }}>
                {stages.map((s, i) => (
                  <Cell
                    key={i}
                    fill={s.breach ? "var(--severity-critical)" : "var(--accent-neutral)"}
                    fillOpacity={0.85}
                  />
                ))}
                <LabelList
                  dataKey="count"
                  position="right"
                  fill="rgba(255,255,255,0.9)"
                  fontSize={12}
                  fontFamily="Barlow"
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="flex items-center gap-6 pt-4 border-t border-white/5 text-[11px] text-white/50">
        <LegendDot color="var(--accent-neutral)" label="Within SLA" />
        <LegendDot color="var(--severity-critical)" label="SLA breach" />
      </div>
    </section>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-2 h-2 rounded-full" style={{ background: color }} />
      <span>{label}</span>
    </div>
  );
}
