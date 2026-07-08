import { Search, Bell, ChevronDown, Check, X, Filter } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDashboard } from "@/context/DashboardContext";
import { dateRanges, products, type Severity } from "@/data/mockData";

const sevLabels: Record<Severity | "all", string> = {
  all: "All severities",
  critical: "Critical",
  warning: "Warning",
  stable: "Stable",
};

export function TopBar() {
  const {
    product,
    setProduct,
    dateRange,
    setDateRange,
    severityFilter,
    setSeverityFilter,
    search,
    setSearch,
  } = useDashboard();

  return (
    <header className="sticky top-0 z-40 glass-panel h-16 flex items-center px-4 md:px-6 gap-3 rounded-none border-b border-white/[0.06]">
      <SidebarTrigger className="text-white/60 hover:text-white shrink-0" />

      <DropdownMenu>
        <DropdownMenuTrigger className="glass-card px-3 py-1.5 rounded-full text-sm flex items-center gap-2 hover:bg-white/[0.07] transition shrink-0 outline-none">
          <span className="text-white/50 hidden sm:inline">Product:</span>
          <span className="truncate max-w-[140px]">{product}</span>
          <ChevronDown size={14} className="opacity-60" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="glass-panel border-white/10 text-white">
          <DropdownMenuLabel className="text-white/50 text-xs">Switch product</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-white/10" />
          <DropdownMenuRadioGroup value={product} onValueChange={(v) => setProduct(v as typeof product)}>
            {products.map((p) => (
              <DropdownMenuRadioItem key={p} value={p} className="focus:bg-white/10 focus:text-white">
                {p}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex-1 flex justify-center max-w-2xl mx-auto min-w-0">
        <div className="glass-card w-full flex items-center gap-2 px-3 py-2 rounded-lg focus-within:ring-1 focus-within:ring-white/20 transition">
          <Search size={14} className="opacity-50 shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm w-full placeholder:text-white/40 min-w-0"
            placeholder="Search signals, cases, PTs…"
          />
          {search ? (
            <button
              onClick={() => setSearch("")}
              className="text-white/40 hover:text-white/80 transition shrink-0"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          ) : (
            <kbd className="hidden sm:inline text-[10px] text-white/40 border border-white/10 rounded px-1.5 py-0.5">
              ⌘K
            </kbd>
          )}
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="glass-card hidden md:flex px-3 py-1.5 rounded-full text-sm items-center gap-2 outline-none">
          <span className="truncate">{dateRange}</span>
          <ChevronDown size={14} className="opacity-60" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="glass-panel border-white/10 text-white">
          {dateRanges.map((r) => (
            <DropdownMenuItem
              key={r}
              onClick={() => setDateRange(r)}
              className="focus:bg-white/10 focus:text-white flex items-center gap-2"
            >
              {r === dateRange && <Check size={12} />}
              <span className={r === dateRange ? "" : "ml-4"}>{r}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className="glass-card p-2 rounded-full outline-none hidden sm:flex" aria-label="Severity filter">
          <Filter size={14} className={severityFilter !== "all" ? "text-[var(--accent-neutral)]" : ""} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="glass-panel border-white/10 text-white">
          <DropdownMenuLabel className="text-white/50 text-xs">Filter by severity</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-white/10" />
          {(["all", "critical", "warning", "stable"] as const).map((s) => (
            <DropdownMenuItem
              key={s}
              onClick={() => setSeverityFilter(s)}
              className="focus:bg-white/10 focus:text-white flex items-center gap-2"
            >
              {s === severityFilter && <Check size={12} />}
              <span className={s === severityFilter ? "" : "ml-4"}>{sevLabels[s]}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <button className="relative glass-card p-2 rounded-full" aria-label="Notifications">
        <Bell size={16} />
        <span
          className="absolute top-1 right-1 w-2 h-2 rounded-full animate-pulse"
          style={{ background: "var(--severity-critical)" }}
        />
      </button>
      <div
        className="w-8 h-8 rounded-full grid place-items-center text-xs font-medium shrink-0"
        style={{ background: "rgba(129,140,248,0.2)", border: "1px solid rgba(129,140,248,0.4)" }}
      >
        SA
      </div>
    </header>
  );
}
