export type Severity = "critical" | "warning" | "stable";

export interface SignalCard {
  id: string;
  severity: Severity;
  pt: string;
  context: string;
  age: string;
}

export const signals: SignalCard[] = [
  {
    id: "s1",
    severity: "critical",
    pt: "Atrial fibrillation",
    context: "3 new literature reports in last 24h",
    age: "2h ago",
  },
  {
    id: "s2",
    severity: "critical",
    pt: "Confusional state",
    context: "SLA breach on 2 open cases",
    age: "5h ago",
  },
  {
    id: "s3",
    severity: "warning",
    pt: "Tachycardia",
    context: "Frequency +40% vs prior 30 days",
    age: "1d ago",
  },
  {
    id: "s4",
    severity: "stable",
    pt: "Fatigue",
    context: "Baseline; no anomalies detected",
    age: "3d ago",
  },
];

export interface KPI {
  label: string;
  value: number;
  caption: string;
}

export const kpis = {
  literature: {
    label: "Literature safety events",
    value: 28,
    caption: "35% MedDRA coded · vs. prior 30 days +50%",
    spark: [8, 12, 9, 14, 11, 18, 15, 22, 19, 24, 21, 28],
  },
  intake: {
    label: "Internal case intake",
    value: 12,
    caption: "3 SLA at risk · 9 acknowledged",
    slaAtRisk: 3,
  },
  signals: {
    label: "Open signals under review",
    value: 7,
    caption: "2 critical · 3 warning · 2 stable",
    breakdown: { critical: 2, warning: 3, stable: 2 },
  },
};

export const workflowStages = [
  { stage: "Intake", count: 42, breach: false },
  { stage: "Triage", count: 31, breach: false },
  { stage: "Medical Review", count: 24, breach: true },
  { stage: "Safety Evaluation", count: 18, breach: false },
  { stage: "Closed", count: 96, breach: false },
];

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

export const governance = { users: 358, roles: 70, teams: 66 };
