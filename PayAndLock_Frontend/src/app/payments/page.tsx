import { AppCard, AppSectionTitle, AppShell, PageIntro } from "@/components/app-shell";
import { dashboardMetrics, invoices } from "@/lib/crm-data";

export default function PaymentsPage() {
  return (
    <AppShell currentPath="/payments" searchPlaceholder="Search invoices, collections, or locks...">
      <div className="flex min-h-full flex-col gap-5">
        <PageIntro
          title="Payments"
          description="Follow invoices, recovery actions, and lock readiness so your team can preserve cash without damaging strong customer relationships."
        />
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dashboardMetrics.map((metric) => (
            <AppCard key={metric.label} className="p-5">
              <p className="text-[16px] text-slate-500">{metric.label}</p>
              <div className="mt-4 flex items-end justify-between gap-3">
                <p className="text-[32px] font-semibold tracking-tight text-slate-950">
                  {metric.value}
                </p>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[14px] font-semibold text-slate-700">
                  {metric.delta}
                </span>
              </div>
            </AppCard>
          ))}
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_360px]">
          <AppCard>
            <AppSectionTitle title="Invoice Recovery Queue" kicker="Outstanding Accounts" />
            <div className="space-y-3">
              {invoices.map((invoice) => (
                <article
                  key={`${invoice.customer}-${invoice.amount}`}
                  className="rounded-[24px] border border-slate-900/8 bg-white/80 p-4"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-xl font-semibold tracking-tight text-slate-950">
                        {invoice.customer}
                      </p>
                      <p className="mt-1 text-base text-slate-500">{invoice.due}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-slate-950 px-3 py-1 text-sm font-semibold text-white">
                        {invoice.status}
                      </span>
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-900">
                        {invoice.nextStep}
                      </span>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900">
                        {invoice.amount}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </AppCard>

          <div className="space-y-4">
            <AppCard>
              <AppSectionTitle title="Recovery Funnel" kicker="This Week" />
              <div className="space-y-3">
                <div className="rounded-[22px] bg-slate-50 p-4">
                  <p className="text-[15px] text-slate-500">Open invoices</p>
                  <p className="mt-2 text-[27px] font-semibold tracking-tight text-slate-950">
                    41
                  </p>
                </div>
                <div className="rounded-[22px] bg-slate-50 p-4">
                  <p className="text-[15px] text-slate-500">Promises to pay</p>
                  <p className="mt-2 text-[27px] font-semibold tracking-tight text-slate-950">
                    17
                  </p>
                </div>
                <div className="rounded-[22px] bg-slate-50 p-4">
                  <p className="text-[15px] text-slate-500">Auto-recovered</p>
                  <p className="mt-2 text-[27px] font-semibold tracking-tight text-slate-950">
                    22
                  </p>
                </div>
              </div>
            </AppCard>

            <AppCard>
              <AppSectionTitle title="Policy Guardrails" kicker="Lock Logic" />
              <div className="space-y-3 text-[15px] leading-7 text-slate-700">
                <div className="rounded-[20px] bg-slate-50 px-4 py-3">
                  Enterprise plans receive manager approval before hard lock.
                </div>
                <div className="rounded-[20px] bg-slate-50 px-4 py-3">
                  Accounts with active disputes stay in soft-lock only.
                </div>
                <div className="rounded-[20px] bg-slate-50 px-4 py-3">
                  Automatic unlock runs within 10 minutes of payment posting.
                </div>
              </div>
            </AppCard>
          </div>
        </div>
      </div>
      </div>
    </AppShell>
  );
}
