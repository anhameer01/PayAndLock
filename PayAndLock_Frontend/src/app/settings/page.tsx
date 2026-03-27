import { AppCard, AppSectionTitle, AppShell, PageIntro } from "@/components/app-shell";
import { settingsSections } from "@/lib/crm-data";

export default function SettingsPage() {
  return (
    <AppShell currentPath="/settings" searchPlaceholder="Search workspace settings, access, or alerts...">
      <div className="flex min-h-full flex-col gap-5">
        <PageIntro
          title="Settings"
          description="Adjust workspace defaults, risk thresholds, and collections preferences for the Pay & Lock CRM operating model."
        />
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_360px]">
        <AppCard>
          <AppSectionTitle title="Workspace Preferences" kicker="Core Setup" />
          <div className="space-y-3">
            {settingsSections.map((setting) => (
              <div
                key={setting.label}
                className="rounded-[24px] border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-[20px] font-semibold tracking-tight text-slate-950">
                      {setting.label}
                    </p>
                    <p className="mt-2 max-w-2xl text-[16px] leading-7 text-slate-600">
                      {setting.helper}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-950 px-4 py-3 text-[16px] font-medium text-white">
                    {setting.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AppCard>

        <div className="space-y-4">
          <AppCard>
            <AppSectionTitle title="Access Summary" kicker="Roles" />
            <div className="space-y-3 text-[16px] leading-7 text-slate-700">
              <div className="rounded-[20px] bg-slate-50 px-4 py-3">
                4 admins can change payment and lock logic.
              </div>
              <div className="rounded-[20px] bg-slate-50 px-4 py-3">
                11 sales and CS users can update account notes.
              </div>
              <div className="rounded-[20px] bg-slate-50 px-4 py-3">
                2 finance users manage collections overrides.
              </div>
            </div>
          </AppCard>

          <AppCard>
            <AppSectionTitle title="Release Notes" kicker="Frontend Build" />
            <div className="rounded-[22px] bg-slate-50 p-4 text-[15px] leading-7 text-slate-700">
              This UI is currently powered by mock data and is ready to be wired
              into your backend APIs for auth, customers, invoices, and workflow
              actions.
            </div>
          </AppCard>
        </div>
      </div>
      </div>
    </AppShell>
  );
}
