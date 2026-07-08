import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { dateRanges, products, type DateRange, type Product, type Severity } from "@/data/mockData";

interface DashboardState {
  product: Product;
  setProduct: (p: Product) => void;
  dateRange: DateRange;
  setDateRange: (d: DateRange) => void;
  severityFilter: Severity | "all";
  setSeverityFilter: (s: Severity | "all") => void;
  search: string;
  setSearch: (s: string) => void;
  loading: boolean;
  activeSection: string;
  setActiveSection: (id: string) => void;
}

const Ctx = createContext<DashboardState | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [product, setProductState] = useState<Product>(products[0]);
  const [dateRange, setDateRangeState] = useState<DateRange>(dateRanges[1]);
  const [severityFilter, setSeverityFilter] = useState<Severity | "all">("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("triage");

  // Simulate loading when structural filters change
  const triggerLoading = useCallback(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const setProduct = useCallback(
    (p: Product) => {
      setProductState(p);
      triggerLoading();
    },
    [triggerLoading],
  );

  const setDateRange = useCallback(
    (d: DateRange) => {
      setDateRangeState(d);
      triggerLoading();
    },
    [triggerLoading],
  );

  // Initial load skeleton flash
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const value = useMemo(
    () => ({
      product,
      setProduct,
      dateRange,
      setDateRange,
      severityFilter,
      setSeverityFilter,
      search,
      setSearch,
      loading,
      activeSection,
      setActiveSection,
    }),
    [product, setProduct, dateRange, setDateRange, severityFilter, search, loading, activeSection],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useDashboard() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useDashboard must be used inside DashboardProvider");
  return ctx;
}
