import { useMemo, useState } from "react";
import { taxonomy } from "@/data/mockData";
import { BlurText } from "./BlurText";
import { LayoutGrid, List, ChevronDown } from "lucide-react";

interface FlatItem {
  soc: string;
  pt: string;
  size: number;
}

export function SignalIntelligence() {
  const [view, setView] = useState<"treemap" | "list">("treemap");

  const flat = useMemo<FlatItem[]>(
    () =>
      taxonomy.flatMap((soc) =>
        (soc.children ?? []).map((pt) => ({ soc: soc.name, pt: pt.name, size: pt.size })),
      ),
    [],
  );

  const max = Math.max(...flat.map((f) => f.size));
  const min = Math.min(...flat.map((f) => f.size));

  // Group into SOC blocks; each SOC gets a flex-basis proportional to its total
  const grouped = taxonomy.map((soc) => ({
    name: soc.name,
    total: (soc.children ?? []).reduce((a, c) => a + c.size, 0),
    children: soc.children ?? [],
  }));
  const grandTotal = grouped.reduce((a, s) => a + s.total, 0);

  const shade = (size: number) => {
    const t = (size - min) / (max - min || 1);
    // Indigo single-hue ramp
    const light = 0.25 + t * 0.55;
    return `rgba(129, 140, 248, ${light.toFixed(2)})`;
  };

  return (
    <section className="glass-panel rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-heading italic text-2xl md:text-3xl">
          <BlurText text="Signal Intelligence" />
        </h2>
        <div className="glass-card inline-flex rounded-full p-1 text-xs">
          <button
            onClick={() => setView("treemap")}
            className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition ${
              view === "treemap" ? "bg-white/10 text-white" : "text-white/50"
            }`}
          >
            <LayoutGrid size={12} /> Treemap
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition ${
              view === "list" ? "bg-white/10 text-white" : "text-white/50"
            }`}
          >
            <List size={12} /> Hierarchy list
          </button>
        </div>
      </div>

      {view === "treemap" ? (
        <div className="flex gap-1.5 h-[420px] w-full">
          {grouped.map((soc) => {
            const socPct = (soc.total / grandTotal) * 100;
            return (
              <div
                key={soc.name}
                className="flex flex-col gap-1.5 min-w-0"
                style={{ flex: `${socPct} 1 0` }}
              >
                <div className="text-[10px] uppercase tracking-wider text-white/40 truncate px-1">
                  {soc.name}
                </div>
                <div className="flex-1 flex flex-col gap-1.5 min-h-0">
                  {soc.children.map((pt) => {
                    const ptPct = (pt.size / soc.total) * 100;
                    return (
                      <div
                        key={pt.name}
                        className="rounded-md flex flex-col justify-between p-2 overflow-hidden min-h-0 border border-white/[0.06] transition hover:border-white/20"
                        style={{
                          flex: `${ptPct} 1 0`,
                          background: shade(pt.size),
                        }}
                      >
                        <div className="text-xs font-medium leading-tight truncate">{pt.name}</div>
                        <div className="text-[10px] text-white/60 tabular-nums">{pt.size}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <HierarchyList />
      )}

      <div className="flex items-center gap-4 pt-2 border-t border-white/5 text-[11px] text-white/50">
        <span>Report frequency</span>
        <div className="flex items-center gap-1">
          {[0.25, 0.4, 0.55, 0.7, 0.8].map((o) => (
            <div key={o} className="w-6 h-2 rounded-sm" style={{ background: `rgba(129,140,248,${o})` }} />
          ))}
        </div>
        <span className="tabular-nums">
          {min} — {max}
        </span>
      </div>
    </section>
  );
}

function HierarchyList() {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  return (
    <ul className="space-y-1">
      {taxonomy.map((soc) => {
        const total = (soc.children ?? []).reduce((a, c) => a + c.size, 0);
        const isOpen = open[soc.name] ?? false;
        return (
          <li key={soc.name} className="rounded-md">
            <button
              onClick={() => setOpen((o) => ({ ...o, [soc.name]: !isOpen }))}
              className="w-full flex items-center justify-between py-2 px-2 rounded hover:bg-white/[0.04] text-left"
            >
              <div className="flex items-center gap-2 text-sm">
                <ChevronDown
                  size={14}
                  className={`transition-transform opacity-50 ${isOpen ? "" : "-rotate-90"}`}
                />
                <span>{soc.name}</span>
              </div>
              <span className="text-xs text-white/40 tabular-nums">{total}</span>
            </button>
            {isOpen && (
              <ul className="pl-8 pb-2 space-y-0.5">
                {soc.children?.map((pt) => (
                  <li key={pt.name} className="flex items-center justify-between py-1 text-sm text-white/70">
                    <span>{pt.name}</span>
                    <span className="tabular-nums text-white/50">{pt.size}</span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}
