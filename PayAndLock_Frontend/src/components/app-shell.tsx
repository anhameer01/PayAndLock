"use client";

import Image from "next/image";
import Link from "next/link";
import { appNavigation } from "@/lib/app-navigation";

type AppShellProps = {
  currentPath: string;
  children: React.ReactNode;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  userName?: string;
  userRole?: string;
  userAvatarSrc?: string;
  sidebarAccountName?: string;
  sidebarAccountEmail?: string;
  sidebarAccountAvatarSrc?: string;
};

function navClass(active: boolean) {
  return active
    ? "bg-indigo-100 text-indigo-800 shadow-[inset_3px_0_0_#4f46e5]"
    : "text-slate-700 hover:bg-slate-100 hover:text-slate-950";
}

export function AppShell({
  currentPath,
  children,
  searchPlaceholder = "Search analytics, records...",
  searchValue,
  onSearchChange,
  userName = "Alex Thompson",
  userRole = "Global Administrator",
  userAvatarSrc = "/images/dashboard/user-avatar.svg",
  sidebarAccountName = "Admin Account",
  sidebarAccountEmail = "admin@paylock.com",
  sidebarAccountAvatarSrc = "/images/employees/admin-avatar.svg",
}: AppShellProps) {
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
              {appNavigation.map((item) => {
                const active = currentPath === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-4 rounded-xl px-5 py-3.5 text-[22px] font-medium transition ${navClass(
                      active,
                    )}`}
                  >
                    <Image src={item.icon} alt="" width={24} height={24} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-auto space-y-3">
            <Image
              src="/images/dashboard/supportPlan.svg"
              alt="Support plan card"
              width={208}
              height={116}
              className="w-full"
            />
            <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_12px_24px_rgba(15,23,42,0.05)]">
              <Image
                src={sidebarAccountAvatarSrc}
                alt={sidebarAccountName}
                width={34}
                height={34}
                className="rounded-full"
              />
              <div>
                <p className="text-[13px] font-semibold text-slate-900">{sidebarAccountName}</p>
                <p className="text-[11px] text-slate-600">{sidebarAccountEmail}</p>
              </div>
            </div>
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
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(event) => onSearchChange?.(event.target.value)}
                className="h-12 w-full rounded-full border border-slate-200 bg-slate-50 pl-12 pr-4 text-[18px] text-slate-700 outline-none placeholder:text-slate-500"
              />
            </div>

            <div className="ml-6 flex items-center gap-6">
              <Image
                src="/images/dashboard/bell.svg"
                alt="Notifications"
                width={18}
                height={18}
              />
              <Image
                src="/images/dashboard/questionmark.svg"
                alt="Help"
                width={18}
                height={18}
              />
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-[17px] font-semibold text-slate-900">
                    {userName}
                  </p>
                  {userRole ? (
                    <p className="text-[14px] text-slate-600">{userRole}</p>
                  ) : null}
                </div>
                <Image
                  src={userAvatarSrc}
                  alt={userName}
                  width={36}
                  height={36}
                  className="rounded-full"
                />
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto px-8 py-7">{children}</div>
        </div>
      </section>
    </main>
  );
}

export function PageIntro({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-[33px] font-semibold tracking-tight text-slate-950">
          {title}
        </h2>
        <p className="mt-2 max-w-4xl text-[24px] text-slate-600">{description}</p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function AppCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[24px] bg-white p-6 shadow-[0_14px_36px_rgba(15,23,42,0.05)] ${className}`}
    >
      {children}
    </section>
  );
}

export function AppSectionTitle({
  title,
  kicker,
}: {
  title: string;
  kicker?: string;
}) {
  return (
    <div>
      {kicker ? (
        <p className="text-[14px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          {kicker}
        </p>
      ) : null}
      <h3 className="mt-2 text-[27px] font-semibold text-slate-950">{title}</h3>
    </div>
  );
}
