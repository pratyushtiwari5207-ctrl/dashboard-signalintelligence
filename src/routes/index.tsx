import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { TriageRow } from "@/components/dashboard/TriageRow";
import { KpiRow } from "@/components/dashboard/KpiRow";
import { CaseWorkload } from "@/components/dashboard/CaseWorkload";
import { SignalIntelligence } from "@/components/dashboard/SignalIntelligence";
import { CasesTable } from "@/components/dashboard/CasesTable";
import { Governance } from "@/components/dashboard/Governance";
import { BlurText } from "@/components/dashboard/BlurText";
import { DashboardProvider, useDashboard } from "@/context/DashboardContext";

export const Route = createFileRoute("/")({
  component: DashboardRoute,
});

function DashboardRoute() {
  return (
    <DashboardProvider>
      <SidebarProvider defaultOpen>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <SidebarInset className="bg-transparent min-w-0">
            <TopBar />
            <ScrollSpy />
            <main className="max-w-[1440px] mx-auto w-full px-4 md:px-8 lg:px-12 py-8 md:py-10 space-y-10">
              <Header />
              <TriageRow />
              <KpiRow />
              <CaseWorkload />
              <SignalIntelligence />
              <CasesTable />
              <Governance />
              <footer className="pt-8 pb-4 text-[11px] text-white/30 flex flex-wrap gap-4 justify-between">
                <span>© 2026 Credos Safety Systems</span>
                <span>Data snapshot · Jul 8, 2026 · 14:22 UTC</span>
              </footer>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </DashboardProvider>
  );
}

function Header() {
  const { product, dateRange } = useDashboard();
  return (
    <header className="space-y-3">
      <div className="text-[11px] uppercase tracking-[0.2em] text-white/40">
        Selected product · {product} · {dateRange}
      </div>
      <h1 className="font-heading italic text-4xl md:text-6xl leading-[1.05] text-white max-w-3xl">
        <BlurText text="Product Safety Intelligence." />
      </h1>
      <p className="text-white/55 text-sm md:text-base max-w-2xl">
        A consolidated view across external intelligence, internal case submissions, signal workflow, operations, and governance.
      </p>
    </header>
  );
}

function ScrollSpy() {
  const { setActiveSection } = useDashboard();

  useEffect(() => {
    const ids = ["triage", "kpi", "workload", "signals", "cases", "governance"];
    const els = ids
      .map((id) => document.getElementById(`section-${id}`))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const id = visible[0].target.id.replace("section-", "");
          setActiveSection(id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.2, 0.5, 1] },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [setActiveSection]);

  return null;
}
