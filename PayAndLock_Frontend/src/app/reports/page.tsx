import { AppCard, AppSectionTitle, AppShell, PageIntro } from "@/components/app-shell";

const reportSummary = [
  { title: "Total Collections", value: "$920,400", change: "+9.4%" },
  { title: "Pending Lock Requests", value: "48", change: "-3%" },
  { title: "Retailer Renewals", value: "112", change: "+16%" },
];

export default function ReportsPage() {
  return (
    <AppShell currentPath="/reports" searchPlaceholder="Search reports, trends, or exporters...">
      <div className="flex min-h-full flex-col gap-5">
        <PageIntro
          title="Reports"
          description="Business insights, billing trends, and field performance reporting in one place."
        />

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_360px]">
          <AppCard>
            <AppSectionTitle title="Executive Summary" kicker="Monthly performance" />
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {reportSummary.map((item) => (
                <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-sm uppercase tracking-[0.16em] text-slate-500">{item.title}</p>
                  <p className="mt-1 text-3xl font-semibold text-slate-950">{item.value}</p>
                  <p className="text-base font-semibold text-emerald-700">{item.change}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-base text-slate-700">Report workflows that can be exported:</p>
              <ul className="mt-2 space-y-2 text-base text-slate-600">
                <li>Growth vs Budget (CSV)</li>
                <li>Device performance per state (Excel)</li>
                <li>Renewal conversion analysis (PDF)</li>
              </ul>
            </div>
          </AppCard>

          <AppCard>
            <AppSectionTitle title="Active Widgets" kicker="Real-time graphs" />
            <div className="space-y-3">
              <div className="rounded-xl bg-white p-4">
                <p className="text-base font-semibold text-slate-700">DTP Conversion</p>
                <p className="mt-2 text-3xl font-semibold text-indigo-700">78%</p>
              </div>
              <div className="rounded-xl bg-white p-4">
                <p className="text-base font-semibold text-slate-700">New Retailer Onboarding</p>
                <p className="mt-2 text-3xl font-semibold text-indigo-700">34</p>
              </div>
            </div>
          </AppCard>
        </div>
      </div>
    </AppShell>
  );
}
