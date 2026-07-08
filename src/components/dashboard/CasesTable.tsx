import { useMemo, useState } from "react";
import { cases, type CaseRow, type Severity } from "@/data/mockData";
import { useDashboard } from "@/context/DashboardContext";
import { BlurText } from "./BlurText";
import { ArrowUp, ArrowDown, ArrowUpDown, Inbox, AlertTriangle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";

type SortKey = "id" | "pt" | "severity" | "stage" | "reportedAt" | "daysOpen";

const sevColor: Record<Severity, string> = {
  critical: "var(--severity-critical)",
  warning: "var(--severity-warning)",
  stable: "var(--severity-stable)",
};

const sevOrder: Record<Severity, number> = { critical: 0, warning: 1, stable: 2 };

export function CasesTable() {
  const { product, search, severityFilter, loading } = useDashboard();
  const [tab, setTab] = useState<"all" | "open" | "breach">("all");
  const [sortKey, setSortKey] = useState<SortKey>("daysOpen");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(0);
  const perPage = 8;

  const q = search.trim().toLowerCase();

  const filtered = useMemo(() => {
    return cases
      .filter((c) => c.product === product)
      .filter((c) => (severityFilter === "all" ? true : c.severity === severityFilter))
      .filter((c) => (tab === "all" ? true : tab === "open" ? c.stage !== "Closed" : c.slaBreach))
      .filter(
        (c) =>
          q === "" ||
          c.id.toLowerCase().includes(q) ||
          c.pt.toLowerCase().includes(q) ||
          c.patient.toLowerCase().includes(q),
      );
  }, [product, severityFilter, tab, q]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      let av: number | string = a[sortKey];
      let bv: number | string = b[sortKey];
      if (sortKey === "severity") {
        av = sevOrder[a.severity];
        bv = sevOrder[b.severity];
      }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));
  const currentPage = Math.min(page, totalPages - 1);
  const pageRows = sorted.slice(currentPage * perPage, currentPage * perPage + perPage);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(0);
  };

  return (
    <section id="section-cases" className="glass-panel rounded-2xl p-6 md:p-8 space-y-5 scroll-mt-24">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-heading italic text-2xl md:text-3xl">
          <BlurText text="Cases" />
        </h2>
        <Tabs
          value={tab}
          onValueChange={(v) => {
            setTab(v as "all" | "open" | "breach");
            setPage(0);
          }}
        >
          <TabsList className="glass-card rounded-full p-1 h-auto bg-transparent border-0">
            <TabItem value="all" label="All" count={cases.filter((c) => c.product === product).length} />
            <TabItem
              value="open"
              label="Open"
              count={cases.filter((c) => c.product === product && c.stage !== "Closed").length}
            />
            <TabItem
              value="breach"
              label="SLA breach"
              count={cases.filter((c) => c.product === product && c.slaBreach).length}
              accent
            />
          </TabsList>
        </Tabs>
      </div>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 rounded-md bg-white/[0.03]" />
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <EmptyCases />
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border border-white/[0.06]">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-white/40 bg-white/[0.02]">
                  <Th label="Case" k="id" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                  <Th label="PT" k="pt" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                  <Th label="Severity" k="severity" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                  <Th label="Stage" k="stage" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                  <Th label="Reported" k="reportedAt" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                  <Th
                    label="Days open"
                    k="daysOpen"
                    sortKey={sortKey}
                    sortDir={sortDir}
                    onSort={toggleSort}
                    align="right"
                  />
                </tr>
              </thead>
              <tbody>
                <AnimatePresence initial={false}>
                  {pageRows.map((row, i) => (
                    <motion.tr
                      key={row.id}
                      layout
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.02 }}
                      className="border-t border-white/[0.04] hover:bg-white/[0.03] transition cursor-pointer"
                    >
                      <td className="px-3 py-3 font-medium tabular-nums text-white/90">{row.id}</td>
                      <td className="px-3 py-3 text-white/80">{row.pt}</td>
                      <td className="px-3 py-3">
                        <span className="inline-flex items-center gap-1.5">
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: sevColor[row.severity] }}
                          />
                          <span className="capitalize text-white/80">{row.severity}</span>
                        </span>
                      </td>
                      <td className="px-3 py-3 text-white/70">{row.stage}</td>
                      <td className="px-3 py-3 text-white/60 tabular-nums">{row.reportedAt}</td>
                      <td className="px-3 py-3 text-right tabular-nums">
                        <span className={row.slaBreach ? "text-[var(--severity-critical)] font-medium" : "text-white/70"}>
                          {row.daysOpen}d {row.slaBreach && "⚠"}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between text-xs text-white/50">
            <span>
              {currentPage * perPage + 1}–{Math.min(sorted.length, (currentPage + 1) * perPage)} of {sorted.length}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={currentPage === 0}
                className="glass-card px-3 py-1 rounded-md disabled:opacity-30 hover:bg-white/[0.06] transition"
              >
                Prev
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={currentPage >= totalPages - 1}
                className="glass-card px-3 py-1 rounded-md disabled:opacity-30 hover:bg-white/[0.06] transition"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

function TabItem({ value, label, count, accent }: { value: string; label: string; count: number; accent?: boolean }) {
  return (
    <TabsTrigger
      value={value}
      className="rounded-full text-xs px-3 py-1.5 data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50 flex items-center gap-1.5"
    >
      {label}
      <span
        className="tabular-nums text-[10px] px-1.5 py-0.5 rounded-full"
        style={{
          background: accent ? "rgba(248,113,113,0.15)" : "rgba(255,255,255,0.06)",
          color: accent ? "var(--severity-critical)" : "rgba(255,255,255,0.6)",
        }}
      >
        {count}
      </span>
    </TabsTrigger>
  );
}

function Th({
  label,
  k,
  sortKey,
  sortDir,
  onSort,
  align = "left",
}: {
  label: string;
  k: SortKey;
  sortKey: SortKey;
  sortDir: "asc" | "desc";
  onSort: (k: SortKey) => void;
  align?: "left" | "right";
}) {
  const active = sortKey === k;
  return (
    <th className={`px-3 py-2.5 font-medium ${align === "right" ? "text-right" : ""}`}>
      <button
        onClick={() => onSort(k)}
        className={`inline-flex items-center gap-1 hover:text-white transition ${active ? "text-white" : ""}`}
      >
        {label}
        {active ? (
          sortDir === "asc" ? (
            <ArrowUp size={10} />
          ) : (
            <ArrowDown size={10} />
          )
        ) : (
          <ArrowUpDown size={10} className="opacity-30" />
        )}
      </button>
    </th>
  );
}

function EmptyCases() {
  return (
    <div className="glass-card rounded-xl p-10 flex flex-col items-center text-center gap-3">
      <div className="w-12 h-12 rounded-full grid place-items-center bg-white/[0.04] border border-white/10">
        <Inbox className="w-5 h-5 text-white/50" />
      </div>
      <div className="text-white/80">No cases match these filters</div>
      <div className="text-sm text-white/50 max-w-sm">
        Try switching tabs, clearing search, or picking a different product.
      </div>
    </div>
  );
}

// unused import guard
export const _hint = AlertTriangle;
