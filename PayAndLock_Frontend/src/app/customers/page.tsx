"use client";

import { useMemo, useState } from "react";
import { AppCard, AppSectionTitle, AppShell, PageIntro } from "@/components/app-shell";
import { customerRows } from "@/lib/crm-data";
import { initialEmployees } from "@/lib/employee-store";

const healthClass: Record<string, string> = {
  Strong: "bg-emerald-500/14 text-emerald-800",
  Watch: "bg-amber-500/16 text-amber-900",
  "At risk": "bg-rose-500/14 text-rose-800",
  Recovering: "bg-sky-500/14 text-sky-800",
};

const dtplVisitSnapshots = [
  { shop: "Northwind Pay", employee: "Priya Kapoor", state: "Maharashtra", date: "2026-03-27", keys: 3 },
  { shop: "Lumen Retail", employee: "Rohit Mishra", state: "Madhya Pradesh", date: "2026-03-27", keys: 1 },
  { shop: "Vector Labs", employee: "Marcus Chen", state: "Telangana", date: "2026-03-26", keys: 2 },
  { shop: "Aura Dental", employee: "Neha Sharma", state: "Tamil Nadu", date: "2026-03-24", keys: 0 },
  { shop: "FieldGrid", employee: "Amit Verma", state: "Gujarat", date: "2026-03-23", keys: 1 },
];

function parseTargetToRupees(target: string) {
  const cleaned = target.replace(/[₹,\s]/g, "");
  const numericValue = Number.parseFloat(cleaned);

  if (Number.isNaN(numericValue)) return 0;
  if (cleaned.endsWith("Cr")) return numericValue * 10000000;
  if (cleaned.endsWith("L")) return numericValue * 100000;
  return numericValue;
}

export default function CustomersPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(customerRows.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedCustomers = customerRows.slice(
    (safeCurrentPage - 1) * itemsPerPage,
    safeCurrentPage * itemsPerPage,
  );

  const crmInsights = useMemo(() => {
    const topEmployee = [...initialEmployees].sort(
      (left, right) => Number.parseInt(right.progress, 10) - Number.parseInt(left.progress, 10),
    )[0];

    const stateSales = initialEmployees.reduce<Record<string, number>>((accumulator, employee) => {
      const achievedValue =
        parseTargetToRupees(employee.target) * (Number.parseInt(employee.progress, 10) / 100);
      accumulator[employee.state] = (accumulator[employee.state] ?? 0) + achievedValue;
      return accumulator;
    }, {});

    const topState = Object.entries(stateSales).sort((left, right) => right[1] - left[1])[0];
    const todayKeySales = dtplVisitSnapshots
      .filter((visit) => visit.date === "2026-03-27")
      .reduce((sum, visit) => sum + visit.keys, 0);
    const weeklyKeySales = dtplVisitSnapshots.reduce((sum, visit) => sum + visit.keys, 0);
    const activeRetailers = customerRows.filter((customer) =>
      ["Protected", "Grace window"].includes(customer.lockState),
    ).length;

    return {
      topEmployee,
      topState,
      todayKeySales,
      weeklyKeySales,
      activeRetailers,
    };
  }, []);

  const fieldActionQueue = useMemo(() => {
    const pendingVisit = customerRows.filter((customer) =>
      ["Watch", "At risk"].includes(customer.health),
    ).length;
    const recentVisitShops = new Set(dtplVisitSnapshots.slice(0, 3).map((visit) => visit.shop));
    const noRecentVisit = customerRows.filter((customer) => !recentVisitShops.has(customer.name)).length;
    const lowPerformers = initialEmployees.filter(
      (employee) => Number.parseInt(employee.progress, 10) < 70,
    ).length;
    const pendingBilling = customerRows.filter((customer) =>
      ["Grace window", "Unlock pending", "Manual review"].includes(customer.lockState),
    ).length;

    return [
      {
        title: "Retailers pending visit",
        value: `${pendingVisit} retailers`,
        helper: "Priority accounts with weak health signals should be visited first.",
        tone: "bg-rose-50",
      },
      {
        title: "Shops with no recent visit",
        value: `${noRecentVisit} shops`,
        helper: "These retailers are outside the latest DTPL visit loop and need outreach.",
        tone: "bg-amber-50",
      },
      {
        title: "Low-performing employees",
        value: `${lowPerformers} employees`,
        helper: "Target attainment is below 70%, so coaching or joint visits are recommended.",
        tone: "bg-sky-50",
      },
      {
        title: "Retailers with pending billing / renewal",
        value: `${pendingBilling} retailers`,
        helper: "Billing follow-up and renewal pushes can unlock near-term recovery.",
        tone: "bg-emerald-50",
      },
    ];
  }, []);

  return (
    <AppShell currentPath="/customers" searchPlaceholder="Search customers, health, or plans...">
      <div className="flex min-h-full flex-col gap-5">
        <PageIntro
          title="Customers"
          description="Monitor account health, expansion potential, and payment protection status across every customer segment."
        />
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_360px]">
          <AppCard>
            <AppSectionTitle title="Account Portfolio" kicker="Health, Ownership, and MRR" />
            <div className="mt-5 overflow-hidden rounded-[24px] border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-left">
                <thead className="bg-slate-950 text-[18px] uppercase tracking-[0.18em] text-slate-300">
                <tr>
                  <th className="px-4 py-4 font-medium">Customer</th>
                  <th className="px-4 py-4 font-medium">Owner</th>
                  <th className="px-4 py-4 font-medium">Plan</th>
                  <th className="px-4 py-4 font-medium">Health</th>
                  <th className="px-4 py-4 font-medium">MRR</th>
                  <th className="px-4 py-4 font-medium">Lock State</th>
                </tr>
              </thead>
                <tbody className="divide-y divide-slate-200 bg-white text-[21px] text-slate-700">
                {paginatedCustomers.map((customer) => (
                  <tr key={customer.name}>
                    <td className="px-4 py-4 font-semibold text-slate-950">
                      {customer.name}
                    </td>
                    <td className="px-4 py-4">{customer.owner}</td>
                    <td className="px-4 py-4">{customer.plan}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-[18px] font-semibold ${healthClass[customer.health]}`}
                      >
                        {customer.health}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-semibold text-slate-950">
                      {customer.mrr}
                    </td>
                    <td className="px-4 py-4">{customer.lockState}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-[16px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Showing {paginatedCustomers.length} of {customerRows.length} customers
              </p>
              <div className="flex items-center gap-2 text-[18px] font-semibold">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`h-10 w-10 rounded-full border text-[18px] font-semibold ${
                      safeCurrentPage === page
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </AppCard>

          <div className="space-y-4">
            <AppCard>
              <AppSectionTitle title="Business Insights" kicker="Snapshot" />
            <div className="space-y-3">
              <div className="rounded-[22px] bg-slate-50 p-4">
                <p className="text-[12px] uppercase tracking-[0.18em] text-slate-500">
                  Top performing employee
                </p>
                <p className="mt-2 text-[27px] font-semibold tracking-tight text-slate-950">
                  {crmInsights.topEmployee?.name} ({crmInsights.topEmployee?.role})
                </p>
                <p className="mt-2 text-[15px] leading-7 text-slate-600">
                  {crmInsights.topEmployee?.progress} achievement against {crmInsights.topEmployee?.target} target.
                </p>
              </div>
              <div className="rounded-[22px] bg-slate-50 p-4">
                <p className="text-[12px] uppercase tracking-[0.18em] text-slate-500">
                  State-wise top sales
                </p>
                <p className="mt-2 text-[27px] font-semibold tracking-tight text-slate-950">
                  {crmInsights.topState?.[0]}
                </p>
                <p className="mt-2 text-[15px] leading-7 text-slate-600">
                  Highest combined achieved value at roughly ₹{Math.round((crmInsights.topState?.[1] ?? 0) / 100000).toLocaleString("en-IN")}L.
                </p>
              </div>
              <div className="rounded-[22px] bg-slate-50 p-4">
                <p className="text-[12px] uppercase tracking-[0.18em] text-slate-500">
                  Total keys sold today / this week
                </p>
                <p className="mt-2 text-[27px] font-semibold tracking-tight text-slate-950">
                  {crmInsights.todayKeySales} / {crmInsights.weeklyKeySales}
                </p>
                <p className="mt-2 text-[15px] leading-7 text-slate-600">
                  Retailers added vs active: {customerRows.length} added, {crmInsights.activeRetailers} currently active.
                </p>
              </div>
            </div>
            </AppCard>

            <AppCard>
              <AppSectionTitle title="Field Action Queue" kicker="Today" />
              <div className="mt-5 space-y-3 text-[15px] text-slate-700">
              {fieldActionQueue.map((item) => (
                <div key={item.title} className={`rounded-[20px] px-4 py-3 ${item.tone}`}>
                  <p className="font-semibold text-slate-900">{item.title}: {item.value}</p>
                  <p className="mt-1 text-slate-700">{item.helper}</p>
                </div>
              ))}
            </div>
            </AppCard>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
