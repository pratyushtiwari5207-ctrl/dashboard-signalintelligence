import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/dashboard/TopBar";
import { TriageRow } from "@/components/dashboard/TriageRow";
import { KpiRow } from "@/components/dashboard/KpiRow";
import { CaseWorkload } from "@/components/dashboard/CaseWorkload";
import { SignalIntelligence } from "@/components/dashboard/SignalIntelligence";
import { Governance } from "@/components/dashboard/Governance";
import { BlurText } from "@/components/dashboard/BlurText";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="min-h-screen overflow-x-hidden relative">
      <div className="relative z-10">
        <TopBar />

        <main className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-10 space-y-10">
          <header className="space-y-3">
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/40">
              Selected product · Levothyroxine
            </div>
            <h1 className="font-heading italic text-5xl md:text-6xl leading-[1.05] text-white max-w-3xl">
              <BlurText text="Product Safety Intelligence." />
            </h1>
            <p className="text-white/55 text-sm md:text-base max-w-2xl">
              A consolidated view across external intelligence, internal case submissions, signal workflow, operations, and governance.
            </p>
          </header>

          <TriageRow />
          <KpiRow />
          <CaseWorkload />
          <SignalIntelligence />
          <Governance />

          <footer className="pt-8 pb-4 text-[11px] text-white/30 flex flex-wrap gap-4 justify-between">
            <span>© 2026 Credos Safety Systems</span>
            <span>Data snapshot · Jul 8, 2026 · 14:22 UTC</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
