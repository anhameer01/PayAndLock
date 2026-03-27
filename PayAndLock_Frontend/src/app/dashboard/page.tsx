"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const sideNav = [
  {
    label: "Dashboard",
    icon: "/images/dashboard/Dashbord1.svg",
    href: "/dashboard",
    active: true,
  },
  {
    label: "Employees",
    icon: "/images/dashboard/Employees.svg",
    href: "/employees",
  },
  {
    label: "DTPL",
    icon: "/images/dashboard/DTPLvisits.svg",
    href: "/dtp-visits",
  },
  {
    label: "Retailers",
    icon: "/images/dashboard/Retailers.svg",
    href: "/customers",
  },
  {
    label: "Billing",
    icon: "/images/dashboard/Billing.svg",
    href: "/billing",
  },
  {
    label: "Reports",
    icon: "/images/dashboard/reports.svg",
    href: "/reports",
  },
];

const statCards = [
  {
    id: "total-visits",
    title: "Total Visits",
    value: "12,482",
    change: "+8.4%",
    icon: "/images/dashboard/totalvisits.svg",
    accent: "text-emerald-500",
    activeBorder: "border-l-4 border-l-emerald-400",
  },
  {
    id: "total-retailers",
    title: "Total Retailers",
    value: "2,850",
    change: "+12%",
    icon: "/images/dashboard/totalsretailers.svg",
    accent: "text-emerald-500",
    activeBorder: "border-l-4 border-l-sky-400",
  },
  {
    id: "monthly-target",
    title: "Monthly Target",
    value: "₹4,50,000",
    change: "",
    icon: "/images/dashboard/monthlytarget.svg",
    accent: "text-slate-500",
    activeBorder: "border-l-4 border-l-indigo-400",
  },
  {
    id: "target-achieved",
    title: "Target Achieved",
    value: "₹3,82,500",
    change: "85% Complete",
    icon: "/images/dashboard/complete.svg",
    accent: "text-emerald-600",
    activeBorder: "border-l-4 border-l-emerald-400",
  },
  {
    id: "remaining-target",
    title: "Remaining Target",
    value: "₹67,500",
    change: "",
    icon: "/images/dashboard/remainingtarget.svg",
    accent: "text-amber-700",
    activeBorder: "border-l-4 border-l-amber-300",
  },
];

const topPerformance = [
  { name: "Sarah Jenkins", role: "BDM", amount: "$84.2k", width: "w-[88%]" },
  { name: "Mark Verdugo", role: "ASM", amount: "$72.5k", width: "w-[73%]" },
  { name: "Ellen Ripley", role: "State Head", amount: "$64.8k", width: "w-[63%]" },
  { name: "James Cooper", role: "BDM", amount: "$55.2k", width: "w-[52%]" },
];

const activities = [
  {
    retailer: "Empire Tech Hub",
    location: "Mumbai",
    agent: "Sarah J.",
    transaction: "₹12,450",
    status: "Paid",
  },
  {
    retailer: "Valley Solutions",
    location: "Bengaluru",
    agent: "Mark V.",
    transaction: "₹8,200",
    status: "Locked",
  },
  {
    retailer: "Lakeside Retail",
    location: "Chennai",
    agent: "Ellen R.",
    transaction: "₹4,150",
    status: "Paid",
  },
  {
    retailer: "Nova Dynamics",
    location: "Hyderabad",
    agent: "James C.",
    transaction: "₹22,000",
    status: "Paid",
  },
];

type DashboardMetricItem = {
  primary: string;
  secondary: string;
  meta: string;
  extra: string;
  status: string;
};

type DashboardMetricResponse = {
  title: string;
  description: string;
  items: DashboardMetricItem[];
};

function navClass(active?: boolean) {
  return active
    ? "bg-indigo-100 text-indigo-800"
    : "text-slate-700 hover:bg-slate-100 hover:text-slate-950";
}

function SalesTrendGraphic() {
  return (
    <svg viewBox="0 0 860 360" className="h-full w-full" fill="none">
      <path
        d="M58 265C110 258 154 242 198 214C240 187 282 146 334 133C385 120 428 150 475 156C534 164 579 144 623 101C668 58 724 39 805 74"
        stroke="#D7DDF2"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M58 246C111 236 155 210 196 176C236 144 281 90 337 80C393 70 436 113 476 127C533 147 577 131 620 88C669 39 723 14 805 53"
        stroke="#4338CA"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M58 246C111 236 155 210 196 176C236 144 281 90 337 80C393 70 436 113 476 127C533 147 577 131 620 88C669 39 723 14 805 53V310H58V246Z"
        fill="url(#sales-fill)"
        opacity="0.16"
      />
      <defs>
        <linearGradient id="sales-fill" x1="431.5" y1="53" x2="431.5" y2="310" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4338CA" />
          <stop offset="1" stopColor="#4338CA" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function DashboardMetricPanel({
  activeCardTitle,
  loading,
  error,
  data,
}: {
  activeCardTitle: string;
  loading: boolean;
  error: string;
  data: DashboardMetricResponse | null;
}) {
  return (
    <article className="rounded-[24px] bg-white p-6 shadow-[0_14px_36px_rgba(15,23,42,0.05)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[27px] font-semibold text-slate-950">
            {data?.title ?? activeCardTitle}
          </h3>
          <p className="mt-2 text-[18px] text-slate-600">
            {data?.description ?? "Loading the selected metric detail view from the backend."}
          </p>
        </div>
        <span className="rounded-full bg-indigo-50 px-4 py-2 text-[14px] font-semibold uppercase tracking-[0.16em] text-indigo-700">
          Live View
        </span>
      </div>

      {loading ? (
        <div className="mt-6 rounded-[20px] bg-slate-50 px-5 py-8 text-[18px] font-medium text-slate-500">
          Loading records for {activeCardTitle.toLowerCase()}...
        </div>
      ) : error ? (
        <div className="mt-6 rounded-[20px] bg-rose-50 px-5 py-8 text-[18px] font-medium text-rose-700">
          {error}
        </div>
      ) : data?.items?.length ? (
        <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200">
          <div className="grid grid-cols-[1.25fr_1fr_1fr_0.9fr_0.8fr] gap-4 border-b border-slate-200 bg-slate-950 px-5 py-4 text-[14px] font-semibold uppercase tracking-[0.16em] text-slate-300">
            <span>Primary</span>
            <span>Assigned</span>
            <span>Context</span>
            <span>Reference</span>
            <span>Status</span>
          </div>
          <div className="divide-y divide-slate-100 bg-white">
            {data.items.map((item, index) => (
              <div
                key={`${item.primary}-${index}`}
                className="grid grid-cols-[1.25fr_1fr_1fr_0.9fr_0.8fr] gap-4 px-5 py-4 text-[17px]"
              >
                <span className="font-semibold text-slate-950">{item.primary}</span>
                <span className="text-slate-700">{item.secondary}</span>
                <span className="text-slate-600">{item.meta}</span>
                <span className="text-slate-600">{item.extra}</span>
                <span className="font-semibold text-indigo-700">{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-[20px] bg-slate-50 px-5 py-8 text-[18px] font-medium text-slate-500">
          No records available for this metric yet.
        </div>
      )}
    </article>
  );
}

export default function DashboardPage() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [metricData, setMetricData] = useState<DashboardMetricResponse | null>(null);
  const [metricLoading, setMetricLoading] = useState(false);
  const [metricError, setMetricError] = useState("");

  useEffect(() => {
    if (!activeCard) return;

    let cancelled = false;

    async function loadMetric() {
      setMetricLoading(true);
      setMetricError("");

      try {
        const response = await fetch(`/api/dashboard/metric/${activeCard}`, {
          cache: "no-store",
        });

        const payload = await response.json().catch(() => null);

        if (!response.ok) {
          if (cancelled) return;
          setMetricData(null);
          setMetricError(payload?.message ?? "Unable to load dashboard details.");
          setMetricLoading(false);
          return;
        }

        if (cancelled) return;
        setMetricData(payload);
        setMetricLoading(false);
      } catch {
        if (cancelled) return;
        setMetricData(null);
        setMetricError("Unable to load dashboard details right now.");
        setMetricLoading(false);
      }
    }

    loadMetric();

    return () => {
      cancelled = true;
    };
  }, [activeCard]);

  const activeCardMeta = statCards.find((card) => card.id === activeCard) ?? null;

  return (
    <main className="h-screen overflow-hidden bg-[#eaf0f8] text-slate-950">
      <section className="flex h-screen w-full overflow-hidden bg-[#f7f8fb]">
        <aside className="sticky top-0 flex h-screen w-[320px] shrink-0 flex-col border-r border-slate-200 bg-[#dce5f3] px-8 py-7">
          <div>
            <h1 className="text-[34px] font-semibold tracking-tight text-indigo-700">
              Pay &amp; Lock
            </h1>
            <p className="mt-2 text-[15px] font-semibold uppercase tracking-[0.18em] text-slate-600">
              Digital Architect v1
            </p>
          </div>

          <div className="mt-10 flex-1 overflow-y-auto pr-1">
            <nav className="space-y-2">
              {sideNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-4 rounded-xl px-5 py-3.5 text-[22px] font-medium transition ${navClass(item.active)}`}
                >
                  <Image src={item.icon} alt="" width={24} height={24} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-auto">
            <Image
              src="/images/dashboard/supportPlan.svg"
              alt="Support plan card"
              width={208}
              height={116}
              className="w-full"
            />
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <header className="flex h-[86px] items-center justify-between border-b border-slate-200 bg-white px-10">
            <div className="relative w-full max-w-[420px]">
              <Image
                src="/images/dashboard/search.svg"
                alt=""
                width={18}
                height={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
              />
              <input
                type="text"
                placeholder="Search analytics, records..."
                className="h-12 w-full rounded-full border border-slate-200 bg-slate-50 pl-12 pr-4 text-[18px] text-slate-700 outline-none placeholder:text-slate-500"
              />
            </div>

            <div className="ml-6 flex items-center gap-6">
              <Image src="/images/dashboard/bell.svg" alt="Notifications" width={18} height={18} />
              <Image src="/images/dashboard/questionmark.svg" alt="Help" width={18} height={18} />
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-[17px] font-semibold text-slate-900">Alex Thompson</p>
                  <p className="text-[14px] text-slate-600">Global Administrator</p>
                </div>
                <Image
                  src="/images/dashboard/user-avatar.svg"
                  alt="Alex Thompson"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto px-8 py-7">
            <div className="flex min-h-full flex-col gap-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-[33px] font-semibold tracking-tight text-slate-950">
                    Architect&apos;s Overview
                  </h2>
                  <p className="mt-2 text-[24px] text-slate-600">
                    Welcome back, Alex. Your retail network grew by 12% this month.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-[18px] font-semibold text-slate-700">
                    Download PDF
                  </button>
                  <button className="rounded-xl bg-indigo-600 px-5 py-3 text-[18px] font-semibold text-white shadow-[0_12px_24px_rgba(79,70,229,0.26)]">
                    Generate Report
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-4">
                {statCards.map((card) => {
                  const isActive = activeCard === card.id;

                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => {
                        setActiveCard(card.id);
                        setMetricData(null);
                        setMetricError("");
                        setMetricLoading(true);
                      }}
                      className="text-left"
                    >
                      <article
                        className={`rounded-[20px] bg-white px-5 py-6 shadow-[0_14px_36px_rgba(15,23,42,0.05)] transition ${isActive ? card.activeBorder : "border-l-4 border-l-transparent"}`}
                      >
                        <div className="flex items-start justify-between">
                          <Image src={card.icon} alt="" width={32} height={32} />
                          {card.change ? (
                            <span className={`text-[16px] font-semibold ${card.accent}`}>
                              {card.change}
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-5 text-[14px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                          {card.title}
                        </p>
                        <p className="mt-2 text-[27px] font-semibold text-slate-950">
                          {card.value}
                        </p>
                      </article>
                    </button>
                  );
                })}
              </div>

              {activeCardMeta ? (
                <DashboardMetricPanel
                  activeCardTitle={activeCardMeta.title}
                  loading={metricLoading}
                  error={metricError}
                  data={metricData}
                />
              ) : null}

              <div className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_360px]">
                <article className="rounded-[24px] bg-white p-6 shadow-[0_14px_36px_rgba(15,23,42,0.05)]">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-[27px] font-semibold text-slate-950">
                      Monthly Sales Trend
                    </h3>
                    <div className="flex items-center gap-4 text-[18px] text-slate-600">
                      <span className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-indigo-700" />
                        Current Year
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-slate-200" />
                        Last Year
                      </span>
                    </div>
                  </div>
                  <div className="h-[320px]">
                    <SalesTrendGraphic />
                  </div>
                  <div className="mt-3 grid grid-cols-12 text-[15px] font-semibold text-slate-600">
                    {["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"].map(
                      (month) => (
                        <span key={month}>{month}</span>
                      ),
                    )}
                  </div>
                </article>

                <article className="rounded-[24px] bg-white p-6 shadow-[0_14px_36px_rgba(15,23,42,0.05)]">
                  <h3 className="text-[27px] font-semibold text-slate-950">
                    State-wise Distribution
                  </h3>
                  <div className="flex h-[300px] flex-col items-center justify-center">
                    <div className="text-center">
                      <p className="text-[64px] font-semibold tracking-tight text-slate-950">
                        100%
                      </p>
                      <p className="text-[15px] font-semibold uppercase tracking-[0.25em] text-slate-500">
                        Global
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4 text-[18px]">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-slate-700">
                        <span className="h-3 w-3 rounded-full bg-indigo-700" />
                        New York
                      </span>
                      <span className="font-semibold text-slate-900">45%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-slate-700">
                        <span className="h-3 w-3 rounded-full bg-slate-300" />
                        California
                      </span>
                      <span className="font-semibold text-slate-900">25%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-slate-700">
                        <span className="h-3 w-3 rounded-full bg-emerald-600" />
                        Texas
                      </span>
                      <span className="font-semibold text-slate-900">15%</span>
                    </div>
                  </div>
                </article>
              </div>

              <div className="grid grid-cols-[320px_minmax(0,1fr)] gap-5">
                <article className="rounded-[24px] bg-white p-6 shadow-[0_14px_36px_rgba(15,23,42,0.05)]">
                  <h3 className="text-[27px] font-semibold text-slate-950">
                    Top Performance
                  </h3>
                  <div className="mt-6 space-y-5">
                    {topPerformance.map((person) => (
                      <div key={person.name}>
                        <div className="mb-2 flex items-center justify-between text-[20px] font-semibold">
                          <span className="text-slate-800">{person.name} ({person.role})</span>
                          <span className="text-indigo-700">{person.amount}</span>
                        </div>
                        <div className="h-2.5 rounded-full bg-slate-100">
                          <div className={`h-2.5 rounded-full bg-indigo-600 ${person.width}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="rounded-[24px] bg-white p-6 shadow-[0_14px_36px_rgba(15,23,42,0.05)]">
                  <div className="mb-5 flex items-center justify-between">
                    <h3 className="text-[27px] font-semibold text-slate-950">
                      Recent Retail Activity
                    </h3>
                    <Link href="#" className="text-[18px] font-semibold text-slate-700">
                      View All Records
                    </Link>
                  </div>

                  <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr_90px] gap-3 border-b border-slate-100 pb-3 text-[14px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    <span>Retailer Name</span>
                    <span>Location</span>
                    <span>Assigned Agent</span>
                    <span>Transaction</span>
                    <span>Status</span>
                  </div>

                  <div className="mt-2 space-y-2">
                    {activities.map((item) => (
                      <div
                        key={item.retailer}
                        className="grid grid-cols-[1.2fr_1fr_1fr_1fr_90px] items-center gap-3 rounded-xl px-1 py-2 text-[19px]"
                      >
                        <span className="font-semibold text-slate-900">{item.retailer}</span>
                        <span className="text-slate-600">{item.location}</span>
                        <span className="text-slate-600">{item.agent}</span>
                        <span className="font-semibold text-slate-900">{item.transaction}</span>
                        <span
                          className={`inline-flex w-fit rounded-full px-3 py-1 text-[14px] font-semibold ${
                            item.status === "Paid"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
