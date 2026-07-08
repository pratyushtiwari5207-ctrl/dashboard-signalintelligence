import { governance } from "@/data/mockData";

export function Governance() {
  const items = [
    { label: "Users", value: governance.users },
    { label: "Roles", value: governance.roles },
    { label: "Teams", value: governance.teams },
  ];
  return (
    <section className="glass-panel rounded-xl px-6 py-4 flex flex-wrap items-center justify-between gap-4">
      <div className="text-[11px] uppercase tracking-wider text-white/40">Governance</div>
      <div className="flex items-center gap-6">
        {items.map((i) => (
          <div key={i.label} className="flex items-baseline gap-2">
            <span className="text-white/50 text-xs">{i.label}</span>
            <span className="tabular-nums text-sm text-white/80">{i.value}</span>
          </div>
        ))}
      </div>
      <div className="text-[11px] text-white/30">System · v4.2 · updated 12m ago</div>
    </section>
  );
}
