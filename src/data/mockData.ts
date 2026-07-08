export type Severity = "critical" | "warning" | "stable";

export interface SignalCard {
  id: string;
  severity: Severity;
  pt: string;
  context: string;
  age: string;
  product: string;
}

export interface CaseRow {
  id: string;
  patient: string;
  pt: string;
  severity: Severity;
  stage: "Intake" | "Triage" | "Medical Review" | "Safety Evaluation" | "Closed";
  reportedAt: string;
  daysOpen: number;
  slaBreach: boolean;
  product: string;
}

export const products = ["Levothyroxine", "Metformin", "Atorvastatin", "Amoxicillin"] as const;
export type Product = (typeof products)[number];

export const dateRanges = ["Last 7 days", "Last 30 days", "Last 90 days", "Year to date"] as const;
export type DateRange = (typeof dateRanges)[number];

export const signals: SignalCard[] = [
  { id: "s1", severity: "critical", pt: "Atrial fibrillation", context: "3 new literature reports in last 24h", age: "2h ago", product: "Levothyroxine" },
  { id: "s2", severity: "critical", pt: "Confusional state", context: "SLA breach on 2 open cases", age: "5h ago", product: "Levothyroxine" },
  { id: "s3", severity: "warning", pt: "Tachycardia", context: "Frequency +40% vs prior 30 days", age: "1d ago", product: "Levothyroxine" },
  { id: "s4", severity: "stable", pt: "Fatigue", context: "Baseline; no anomalies detected", age: "3d ago", product: "Levothyroxine" },
  { id: "s5", severity: "warning", pt: "Hypoglycaemia", context: "5 new cases in last 7 days", age: "6h ago", product: "Metformin" },
  { id: "s6", severity: "critical", pt: "Lactic acidosis", context: "Signal escalation from EU literature", age: "9h ago", product: "Metformin" },
  { id: "s7", severity: "warning", pt: "Myalgia", context: "Cluster reports from pharmacy DB", age: "1d ago", product: "Atorvastatin" },
  { id: "s8", severity: "stable", pt: "Rash", context: "Within expected baseline rate", age: "2d ago", product: "Amoxicillin" },
];

export const kpiSource = {
  Levothyroxine: {
    literature: { value: 28, trend: 50, spark: [8, 12, 9, 14, 11, 18, 15, 22, 19, 24, 21, 28] },
    intake: { value: 12, slaAtRisk: 3, acknowledged: 9 },
    signals: { value: 7, critical: 2, warning: 3, stable: 2 },
  },
  Metformin: {
    literature: { value: 41, trend: 12, spark: [20, 22, 25, 28, 30, 32, 35, 33, 37, 39, 40, 41] },
    intake: { value: 22, slaAtRisk: 5, acknowledged: 17 },
    signals: { value: 11, critical: 4, warning: 5, stable: 2 },
  },
  Atorvastatin: {
    literature: { value: 19, trend: -8, spark: [26, 24, 25, 22, 21, 20, 22, 19, 20, 18, 19, 19] },
    intake: { value: 8, slaAtRisk: 1, acknowledged: 7 },
    signals: { value: 4, critical: 1, warning: 2, stable: 1 },
  },
  Amoxicillin: {
    literature: { value: 15, trend: 3, spark: [12, 13, 11, 14, 13, 15, 14, 15, 14, 15, 14, 15] },
    intake: { value: 5, slaAtRisk: 0, acknowledged: 5 },
    signals: { value: 3, critical: 0, warning: 1, stable: 2 },
  },
} as const;

export const workflowSource: Record<Product, Array<{ stage: string; count: number; breach: boolean }>> = {
  Levothyroxine: [
    { stage: "Intake", count: 42, breach: false },
    { stage: "Triage", count: 31, breach: false },
    { stage: "Medical Review", count: 24, breach: true },
    { stage: "Safety Evaluation", count: 18, breach: false },
    { stage: "Closed", count: 96, breach: false },
  ],
  Metformin: [
    { stage: "Intake", count: 58, breach: false },
    { stage: "Triage", count: 44, breach: true },
    { stage: "Medical Review", count: 33, breach: true },
    { stage: "Safety Evaluation", count: 21, breach: false },
    { stage: "Closed", count: 140, breach: false },
  ],
  Atorvastatin: [
    { stage: "Intake", count: 18, breach: false },
    { stage: "Triage", count: 14, breach: false },
    { stage: "Medical Review", count: 9, breach: false },
    { stage: "Safety Evaluation", count: 6, breach: false },
    { stage: "Closed", count: 52, breach: false },
  ],
  Amoxicillin: [
    { stage: "Intake", count: 11, breach: false },
    { stage: "Triage", count: 8, breach: false },
    { stage: "Medical Review", count: 5, breach: false },
    { stage: "Safety Evaluation", count: 3, breach: false },
    { stage: "Closed", count: 30, breach: false },
  ],
};

export interface TaxonomyNode {
  name: string;
  size: number;
  children?: TaxonomyNode[];
}

export const taxonomy: TaxonomyNode[] = [
  {
    name: "Cardiac disorders",
    size: 0,
    children: [
      { name: "Atrial fibrillation", size: 18 },
      { name: "Tachycardia", size: 14 },
      { name: "Cardiac failure", size: 9 },
      { name: "Ventricular tachycardia", size: 6 },
    ],
  },
  {
    name: "Psychiatric disorders",
    size: 0,
    children: [
      { name: "Anxiety", size: 12 },
      { name: "Confusional state", size: 10 },
      { name: "Delirium", size: 5 },
    ],
  },
  {
    name: "Nervous system disorders",
    size: 0,
    children: [
      { name: "Coma", size: 7 },
      { name: "Headache", size: 6 },
      { name: "Tremor", size: 4 },
    ],
  },
  {
    name: "Gastrointestinal disorders",
    size: 0,
    children: [
      { name: "Abdominal pain upper", size: 8 },
      { name: "Nausea", size: 5 },
    ],
  },
  {
    name: "General disorders",
    size: 0,
    children: [
      { name: "Fatigue", size: 11 },
      { name: "Asthenia", size: 4 },
    ],
  },
];

const stages: CaseRow["stage"][] = ["Intake", "Triage", "Medical Review", "Safety Evaluation", "Closed"];
const severities: Severity[] = ["critical", "warning", "stable"];
const pts = [
  "Atrial fibrillation",
  "Tachycardia",
  "Confusional state",
  "Fatigue",
  "Anxiety",
  "Cardiac failure",
  "Hypoglycaemia",
  "Lactic acidosis",
  "Myalgia",
  "Rash",
  "Headache",
  "Nausea",
];

function makeCases(): CaseRow[] {
  const rows: CaseRow[] = [];
  let seed = 1;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 1; i <= 42; i++) {
    const product = products[Math.floor(rand() * products.length)];
    const severity = severities[Math.floor(rand() * severities.length)];
    const stage = stages[Math.floor(rand() * stages.length)];
    const daysOpen = Math.floor(rand() * 30) + 1;
    rows.push({
      id: `CASE-${1000 + i}`,
      patient: `Anon-${String(1000 + i).padStart(5, "0")}`,
      pt: pts[Math.floor(rand() * pts.length)],
      severity,
      stage,
      reportedAt: `2026-0${Math.floor(rand() * 6) + 1}-${String(Math.floor(rand() * 27) + 1).padStart(2, "0")}`,
      daysOpen,
      slaBreach: daysOpen > 20 && stage !== "Closed",
      product,
    });
  }
  return rows;
}

export const cases: CaseRow[] = makeCases();

export const governance = { users: 358, roles: 70, teams: 66 };
