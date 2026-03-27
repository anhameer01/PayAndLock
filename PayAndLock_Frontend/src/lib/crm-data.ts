export type Metric = {
  label: string;
  value: string;
  delta: string;
  tone: "positive" | "neutral" | "warning";
};

export type PipelineStage = {
  stage: string;
  count: number;
  value: string;
  tint: string;
  accounts: string[];
};

export type ActivityItem = {
  title: string;
  meta: string;
  time: string;
  tag: string;
};

export type CustomerRow = {
  name: string;
  owner: string;
  plan: string;
  health: string;
  mrr: string;
  lockState: string;
};

export type InvoiceRow = {
  customer: string;
  amount: string;
  due: string;
  status: string;
  nextStep: string;
};

export type WorkflowRow = {
  name: string;
  trigger: string;
  conversion: string;
  status: string;
};

export type SettingsRow = {
  label: string;
  helper: string;
  value: string;
};

export const navigation = [
  { href: "/dashboard", label: "Dashboard", short: "DB" },
  { href: "/customers", label: "Customers", short: "CU" },
  { href: "/payments", label: "Payments", short: "PY" },
  { href: "/automation", label: "Automation", short: "AU" },
  { href: "/settings", label: "Settings", short: "ST" },
];

export const dashboardMetrics: Metric[] = [
  {
    label: "Net MRR",
    value: "$182.4K",
    delta: "+14.8% vs last month",
    tone: "positive",
  },
  {
    label: "Collections Recovery",
    value: "83.2%",
    delta: "6.4% above target",
    tone: "positive",
  },
  {
    label: "Accounts At Risk",
    value: "29",
    delta: "7 need same-day follow-up",
    tone: "warning",
  },
  {
    label: "Lock Automation",
    value: "94.1%",
    delta: "Healthy workflow coverage",
    tone: "neutral",
  },
];

export const pipeline: PipelineStage[] = [
  {
    stage: "Discovery",
    count: 12,
    value: "$46K",
    tint: "from-teal-500/24 to-teal-700/12",
    accounts: ["Orbit Freight", "Nova Clinic", "BlueHarbor Foods"],
  },
  {
    stage: "Proposal",
    count: 8,
    value: "$71K",
    tint: "from-amber-400/28 to-orange-500/12",
    accounts: ["KiteStack", "Lumen Retail", "CoreFleet"],
  },
  {
    stage: "Security Review",
    count: 5,
    value: "$38K",
    tint: "from-sky-400/24 to-cyan-600/12",
    accounts: ["Aspect One", "Vector Labs", "Pioneer Ops"],
  },
  {
    stage: "Ready To Close",
    count: 4,
    value: "$29K",
    tint: "from-emerald-400/24 to-teal-700/12",
    accounts: ["Northwind Pay", "FieldGrid", "Aura Dental"],
  },
];

export const recentActivity: ActivityItem[] = [
  {
    title: "Invoice rescue playbook triggered for Lumen Retail",
    meta: "Smart lock delay set to 24 hours after payment promise",
    time: "8 min ago",
    tag: "Recovery",
  },
  {
    title: "Enterprise renewal won with Northwind Pay",
    meta: "12 seats added and annual billing activated",
    time: "36 min ago",
    tag: "Expansion",
  },
  {
    title: "CSAT dipped below 85 for Vector Labs",
    meta: "Customer success notified and onboarding risk escalated",
    time: "1 hr ago",
    tag: "Risk",
  },
  {
    title: "Collections workflow A/B test reached significance",
    meta: "SMS + email sequence increased recovery by 11.2%",
    time: "3 hr ago",
    tag: "Experiment",
  },
];

export const customerRows: CustomerRow[] = [
  {
    name: "Northwind Pay",
    owner: "Aisha Khan",
    plan: "Enterprise",
    health: "Strong",
    mrr: "$14,800",
    lockState: "Protected",
  },
  {
    name: "Lumen Retail",
    owner: "Rahul Mehta",
    plan: "Growth",
    health: "Watch",
    mrr: "$8,240",
    lockState: "Grace window",
  },
  {
    name: "Vector Labs",
    owner: "Sana George",
    plan: "Scale",
    health: "At risk",
    mrr: "$5,960",
    lockState: "Manual review",
  },
  {
    name: "Orbit Freight",
    owner: "Milan Roy",
    plan: "Growth",
    health: "Strong",
    mrr: "$9,100",
    lockState: "Protected",
  },
  {
    name: "Aura Dental",
    owner: "Neha Shah",
    plan: "Starter",
    health: "Recovering",
    mrr: "$2,480",
    lockState: "Unlock pending",
  },
  {
    name: "CoreFleet Solutions",
    owner: "Vikram Patel",
    plan: "Enterprise",
    health: "Strong",
    mrr: "$16,200",
    lockState: "Protected",
  },
  {
    name: "KiteStack",
    owner: "Priya Sharma",
    plan: "Growth",
    health: "Watch",
    mrr: "$7,150",
    lockState: "Grace window",
  },
  {
    name: "Aspect One",
    owner: "Arjun Singh",
    plan: "Scale",
    health: "Strong",
    mrr: "$6,800",
    lockState: "Protected",
  },
  {
    name: "Pioneer Ops",
    owner: "Divya Nair",
    plan: "Growth",
    health: "At risk",
    mrr: "$4,920",
    lockState: "Manual review",
  },
  {
    name: "FieldGrid",
    owner: "Rohan Varma",
    plan: "Starter",
    health: "Recovering",
    mrr: "$2,150",
    lockState: "Unlock pending",
  },
  {
    name: "Halo Medical",
    owner: "Meera Gupta",
    plan: "Scale",
    health: "Strong",
    mrr: "$11,400",
    lockState: "Protected",
  },
  {
    name: "BlueHarbor Foods",
    owner: "Sundar Reddy",
    plan: "Growth",
    health: "Watch",
    mrr: "$6,300",
    lockState: "Grace window",
  },
  {
    name: "Nova Clinic",
    owner: "Anjali Singh",
    plan: "Starter",
    health: "Recovering",
    mrr: "$1,980",
    lockState: "Unlock pending",
  },
  {
    name: "Zenith Logistics",
    owner: "Vikash Kumar",
    plan: "Enterprise",
    health: "Strong",
    mrr: "$15,600",
    lockState: "Protected",
  },
  {
    name: "Quantum Retail",
    owner: "Richa Malhotra",
    plan: "Scale",
    health: "At risk",
    mrr: "$5,450",
    lockState: "Manual review",
  },
  {
    name: "OmniTech Services",
    owner: "Deepak Verma",
    plan: "Growth",
    health: "Strong",
    mrr: "$8,900",
    lockState: "Protected",
  },
];

export const invoices: InvoiceRow[] = [
  {
    customer: "Vector Labs",
    amount: "$4,980",
    due: "Overdue by 9 days",
    status: "Escalated",
    nextStep: "Exec outreach",
  },
  {
    customer: "Lumen Retail",
    amount: "$2,140",
    due: "Due today",
    status: "Promise to pay",
    nextStep: "Retry at 6 PM",
  },
  {
    customer: "Halo Medical",
    amount: "$7,300",
    due: "Overdue by 2 days",
    status: "Sequence active",
    nextStep: "SMS reminder",
  },
  {
    customer: "Aura Dental",
    amount: "$840",
    due: "Due in 3 days",
    status: "Scheduled",
    nextStep: "Autopay draft",
  },
];

export const workflows: WorkflowRow[] = [
  {
    name: "Soft Lock Recovery",
    trigger: "Invoice overdue by 3 days",
    conversion: "42.8%",
    status: "Live",
  },
  {
    name: "New Customer Onboarding",
    trigger: "Contract signed",
    conversion: "91.4%",
    status: "Live",
  },
  {
    name: "Renewal Warm-Up",
    trigger: "90 days before renewal",
    conversion: "67.2%",
    status: "Testing",
  },
  {
    name: "High Risk Churn Save",
    trigger: "Health below 70",
    conversion: "28.6%",
    status: "Needs copy refresh",
  },
];

export const settingsSections: SettingsRow[] = [
  {
    label: "Workspace Name",
    helper: "Shown in navigation, invoices, and customer emails.",
    value: "Pay & Lock CRM",
  },
  {
    label: "Default Recovery SLA",
    helper: "Maximum time before automated account lock begins.",
    value: "72 hours",
  },
  {
    label: "Collections Contact",
    helper: "Primary mailbox for failed invoice escalations.",
    value: "collections@payandlockcrm.com",
  },
  {
    label: "Risk Alert Threshold",
    helper: "Health score that triggers executive review.",
    value: "68 / 100",
  },
];
