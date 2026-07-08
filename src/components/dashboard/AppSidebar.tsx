import { Link } from "@tanstack/react-router";
import { useDashboard } from "@/context/DashboardContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Activity, LayoutDashboard, GitBranch, Layers, ShieldCheck, Users, LifeBuoy, Settings } from "lucide-react";

const primary = [
  { id: "triage", label: "Triage", icon: Activity },
  { id: "kpi", label: "Overview", icon: LayoutDashboard },
  { id: "workload", label: "Case Workload", icon: GitBranch },
  { id: "signals", label: "Signal Intelligence", icon: Layers },
  { id: "cases", label: "Cases", icon: ShieldCheck },
];

const secondary = [
  { id: "governance", label: "Governance", icon: Users },
];

export function AppSidebar() {
  const { activeSection, setActiveSection } = useDashboard();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const goTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(`section-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-white/[0.06]">
      <SidebarHeader className="border-b border-white/[0.06] px-4 py-4">
        <Link to="/" className="flex items-center gap-2 min-w-0">
          <div
            className="w-8 h-8 rounded-lg grid place-items-center shrink-0"
            style={{
              background: "linear-gradient(135deg, rgba(129,140,248,0.4), rgba(129,140,248,0.1))",
              border: "1px solid rgba(129,140,248,0.4)",
            }}
          >
            <span className="font-heading italic text-sm">C</span>
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="font-heading italic text-lg leading-none truncate">Credos</div>
              <div className="text-[10px] uppercase tracking-wider text-white/40">Safety Intelligence</div>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/40 text-[10px] uppercase tracking-wider">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {primary.map((item) => {
                const active = activeSection === item.id;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={active}
                      onClick={() => goTo(item.id)}
                      tooltip={item.label}
                      className={`transition-all rounded-lg ${
                        active
                          ? "bg-white/[0.06] text-white border-l-2"
                          : "text-white/60 hover:text-white hover:bg-white/[0.03]"
                      }`}
                      style={active ? { borderLeftColor: "var(--accent-neutral)" } : undefined}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-white/40 text-[10px] uppercase tracking-wider">
            Admin
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondary.map((item) => {
                const active = activeSection === item.id;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={active}
                      onClick={() => goTo(item.id)}
                      tooltip={item.label}
                      className={`rounded-lg ${
                        active
                          ? "bg-white/[0.06] text-white"
                          : "text-white/60 hover:text-white hover:bg-white/[0.03]"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-white/[0.06] p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Help" className="text-white/50 hover:text-white">
              <LifeBuoy className="h-4 w-4" /> <span>Help & docs</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings" className="text-white/50 hover:text-white">
              <Settings className="h-4 w-4" /> <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
