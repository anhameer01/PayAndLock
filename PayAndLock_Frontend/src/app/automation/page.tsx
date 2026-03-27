import { AppCard, AppSectionTitle, AppShell, PageIntro } from "@/components/app-shell";
import { workflows } from "@/lib/crm-data";

export default function AutomationPage() {
  return (
    <AppShell currentPath="/automation" searchPlaceholder="Search workflows, triggers, or experiments...">
      <div className="flex min-h-full flex-col gap-5">
        <PageIntro
          title="Automation"
          description="Coordinate onboarding, collections, renewal, and churn-prevention flows with automations designed for SaaS teams."
        />
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_360px]">
        <AppCard>
          <AppSectionTitle title="Workflow Performance" kicker="Journeys and Playbooks" />
          <div className="space-y-3">
            {workflows.map((workflow) => (
              <article
                key={workflow.name}
                className="rounded-[24px] border border-slate-900/8 bg-white/78 p-4"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xl font-semibold tracking-tight text-slate-950">
                      {workflow.name}
                    </p>
                    <p className="mt-1 text-base text-slate-500">
                      Trigger: {workflow.trigger}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-teal-100 px-3 py-1 text-sm font-semibold text-teal-900">
                      {workflow.conversion}
                    </span>
                    <span className="rounded-full bg-slate-950 px-3 py-1 text-sm font-semibold text-white">
                      {workflow.status}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </AppCard>

        <div className="space-y-4">
          <AppCard>
            <AppSectionTitle title="Queue Health" kicker="Right Now" />
            <div className="space-y-3">
              <div className="rounded-[22px] bg-slate-50 p-4">
                <p className="text-[18px] text-slate-500">Automations running</p>
                <p className="mt-2 text-[32px] font-semibold tracking-tight text-slate-950">
                  12
                </p>
              </div>
              <div className="rounded-[22px] bg-slate-50 p-4">
                <p className="text-[15px] text-slate-500">Queued actions</p>
                <p className="mt-2 text-[27px] font-semibold tracking-tight text-slate-950">
                  184
                </p>
              </div>
              <div className="rounded-[22px] bg-slate-50 p-4">
                <p className="text-[15px] text-slate-500">Needs review</p>
                <p className="mt-2 text-[27px] font-semibold tracking-tight text-slate-950">
                  5
                </p>
              </div>
            </div>
          </AppCard>

          <AppCard>
            <AppSectionTitle title="Optimization Ideas" kicker="Suggested" />
            <div className="space-y-3 text-[15px] leading-7 text-slate-700">
              <div className="rounded-[20px] bg-amber-50 px-4 py-3">
                Rewrite risky churn-save messaging for low-health startups.
              </div>
              <div className="rounded-[20px] bg-sky-50 px-4 py-3">
                Add webhook step after successful payment unlock events.
              </div>
              <div className="rounded-[20px] bg-emerald-50 px-4 py-3">
                Clone soft-lock journey for annual contract exceptions.
              </div>
            </div>
          </AppCard>
        </div>
      </div>
      </div>
    </AppShell>
  );
}
