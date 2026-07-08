import { Search, Bell, ChevronDown } from "lucide-react";

export function TopBar() {
  return (
    <header className="sticky top-0 z-50 glass-panel h-16 flex items-center px-6 gap-4">
      <div className="flex items-center gap-3 shrink-0">
        <div className="font-heading italic text-xl tracking-tight">Credos</div>
        <button className="glass-card px-3 py-1.5 rounded-full text-sm flex items-center gap-2 hover:bg-white/[0.07] transition">
          <span className="text-white/70">Product:</span>
          <span>Levothyroxine</span>
          <ChevronDown size={14} className="opacity-60" />
        </button>
      </div>

      <div className="flex-1 flex justify-center max-w-2xl mx-auto min-w-0">
        <div className="glass-card w-full flex items-center gap-2 px-3 py-2 rounded-lg">
          <Search size={14} className="opacity-50 shrink-0" />
          <input
            className="bg-transparent outline-none text-sm w-full placeholder:text-white/40"
            placeholder="Search cases, signals, PTs…"
          />
          <kbd className="hidden sm:inline text-[10px] text-white/40 border border-white/10 rounded px-1.5 py-0.5">⌘K</kbd>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <button className="glass-card hidden md:flex px-3 py-1.5 rounded-full text-sm items-center gap-2">
          Last 30 days
          <ChevronDown size={14} className="opacity-60" />
        </button>
        <button className="relative glass-card p-2 rounded-full" aria-label="Notifications">
          <Bell size={16} />
          <span
            className="absolute top-1 right-1 w-2 h-2 rounded-full"
            style={{ background: "var(--severity-critical)" }}
          />
        </button>
        <div
          className="w-8 h-8 rounded-full grid place-items-center text-xs font-medium"
          style={{ background: "rgba(129,140,248,0.2)", border: "1px solid rgba(129,140,248,0.4)" }}
        >
          SA
        </div>
      </div>
    </header>
  );
}
