"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AppCard, AppShell, PageIntro } from "@/components/app-shell";
import {
  ensureEmployeesSeeded,
  readEmployees,
  type EmployeeRecord,
} from "@/lib/employee-store";

const footerMetrics = [
  {
    label: "Total Active Staff",
    value: "284",
    change: "+12%",
    icon: "/images/dashboard/Employees.svg",
  },
  {
    label: "Retention Score",
    value: "84.2%",
    change: "Target Met",
    icon: "/images/dashboard/complete.svg",
  },
  {
    label: "Regional Territories",
    value: "16",
    change: "",
    icon: "/images/dashboard/Billing.svg",
  },
];

export default function EmployeesPage() {
  const [employees] = useState<EmployeeRecord[]>(() => {
    ensureEmployeesSeeded();
    return readEmployees();
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [draftRole, setDraftRole] = useState("All");
  const [draftState, setDraftState] = useState("All");
  const [draftCity, setDraftCity] = useState("All");
  const [appliedRole, setAppliedRole] = useState("All");
  const [appliedState, setAppliedState] = useState("All");
  const [appliedCity, setAppliedCity] = useState("All");

  const stateOptions = useMemo(() => {
    return ["All", ...new Set(employees.map((employee) => employee.state).filter(Boolean))];
  }, [employees]);

  const cityOptions = useMemo(() => {
    const filteredByState =
      draftState === "All"
        ? employees
        : employees.filter((employee) => employee.state === draftState);

    return ["All", ...new Set(filteredByState.map((employee) => employee.city).filter(Boolean))];
  }, [draftState, employees]);

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch =
        !searchText ||
        employee.name.toLowerCase().includes(searchText.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchText.toLowerCase()) ||
        employee.location.toLowerCase().includes(searchText.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchText.toLowerCase()) ||
        employee.manager.toLowerCase().includes(searchText.toLowerCase());

      const matchesRole = appliedRole === "All" || employee.role === appliedRole;
      const matchesState = appliedState === "All" || employee.state === appliedState;
      const matchesCity = appliedCity === "All" || employee.city === appliedCity;

      return matchesSearch && matchesRole && matchesState && matchesCity;
    });
  }, [appliedCity, appliedRole, appliedState, employees, searchText]);

  const itemsPerPage = 4;
  const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedEmployees = filteredEmployees.slice(
    (safeCurrentPage - 1) * itemsPerPage,
    safeCurrentPage * itemsPerPage,
  );

  const applyFilters = () => {
    setCurrentPage(1);
    setAppliedRole(draftRole);
    setAppliedState(draftState);
    setAppliedCity(draftCity);
  };

  const clearFilters = () => {
    setCurrentPage(1);
    setDraftRole("All");
    setDraftState("All");
    setDraftCity("All");
    setAppliedRole("All");
    setAppliedState("All");
    setAppliedCity("All");
    setSearchText("");
  };

  return (
    <AppShell
      currentPath="/employees"
      searchPlaceholder="Search employees, roles, or territories..."
      searchValue={searchText}
      onSearchChange={setSearchText}
      userName="Admin Panel"
      userRole=""
      userAvatarSrc="/images/dashboard/user-avatar.svg"
      sidebarAccountName="Marcus Sterling"
      sidebarAccountEmail="Global Administrator"
      sidebarAccountAvatarSrc="/images/dashboard/user-avatar.svg"
    >
      <div className="flex min-h-full flex-col gap-6">
        <PageIntro
          title="Team Directory"
          description="Manage your organizational structure, monitor regional performance targets, and coordinate field operations across all active territories."
          action={
            <Link
              href="/employees/new"
              className="rounded-xl bg-indigo-600 px-5 py-3 text-[18px] font-semibold text-white shadow-[0_12px_24px_rgba(79,70,229,0.26)]"
            >
              + Add Employee
            </Link>
          }
        />

        <div className="flex flex-wrap items-center gap-3 rounded-[24px] bg-white px-6 py-5 shadow-[0_14px_36px_rgba(15,23,42,0.05)]">
          <span className="rounded-lg bg-slate-50 px-4 py-2 text-[16px] font-semibold text-slate-600">
            Filters:
          </span>

          <select
            value={draftRole}
            onChange={(event) => setDraftRole(event.target.value)}
            className="rounded-lg border border-slate-200 px-4 py-2 text-[16px] font-semibold text-slate-700 outline-none"
          >
            <option value="All">Role: All</option>
            <option value="Super Admin">Role: Super Admin</option>
            <option value="State Head">Role: State Head</option>
            <option value="ASM">Role: ASM</option>
            <option value="BDM">Role: BDM</option>
          </select>

          <select
            value={draftState}
            onChange={(event) => {
              const nextState = event.target.value;
              setDraftState(nextState);
              if (nextState === "All") {
                setDraftCity("All");
              } else if (draftCity !== "All" && !employees.some((employee) => employee.state === nextState && employee.city === draftCity)) {
                setDraftCity("All");
              }
            }}
            className="rounded-lg border border-slate-200 px-4 py-2 text-[16px] font-semibold text-slate-700 outline-none"
          >
            {stateOptions.map((state) => (
              <option key={state} value={state}>
                {state === "All" ? "State: All" : `State: ${state}`}
              </option>
            ))}
          </select>

          <select
            value={draftCity}
            onChange={(event) => setDraftCity(event.target.value)}
            className="rounded-lg border border-slate-200 px-4 py-2 text-[16px] font-semibold text-slate-700 outline-none"
          >
            {cityOptions.map((city) => (
              <option key={city} value={city}>
                {city === "All" ? "City: All" : `City: ${city}`}
              </option>
            ))}
          </select>

          <button className="ml-auto text-[16px] font-semibold text-indigo-700" onClick={clearFilters}>
            Clear All
          </button>
          <button
            className="rounded-xl bg-indigo-600 px-5 py-2 text-[16px] font-semibold text-white"
            onClick={applyFilters}
          >
            Apply View
          </button>
        </div>

        <AppCard className="p-6">
          <div className="grid grid-cols-[1.5fr_1fr_1fr_0.9fr_1.1fr_1fr_80px] gap-4 border-b border-slate-100 pb-4 text-[14px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            <span>Employee</span>
            <span>Role</span>
            <span>Location</span>
            <span>Phone</span>
            <span>Target Status</span>
            <span>Manager</span>
            <span>Actions</span>
          </div>

          <div className="divide-y divide-slate-100">
            {paginatedEmployees.length === 0 ? (
              <div className="py-12 text-center text-[16px] font-semibold text-slate-500">
                No results found
              </div>
            ) : (
              paginatedEmployees.map((employee) => (
                <div
                  key={employee.id}
                  className="grid grid-cols-[1.5fr_1fr_1fr_0.9fr_1.1fr_1fr_80px] gap-4 py-5 text-[19px]"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/dashboard/employee-placeholder.svg"
                      alt={employee.name}
                      width={44}
                      height={44}
                      className="rounded-xl"
                    />
                    <div>
                      <p className="font-semibold text-slate-800">{employee.name}</p>
                      <p className="text-[14px] text-slate-400">{employee.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <span className={`rounded-full px-3 py-1 text-[14px] font-semibold ${employee.roleTone}`}>
                      {employee.role}
                    </span>
                  </div>

                  <div className="flex flex-col justify-center">
                    <span className="font-medium text-slate-700">{employee.location}</span>
                    <span className="text-[14px] text-slate-400">{employee.subLocation}</span>
                  </div>

                  <div className="flex items-center text-slate-500">{employee.phone}</div>

                  <div className="flex flex-col justify-center">
                    <div className="mb-2 flex items-center justify-between text-[14px] font-semibold">
                      <span className="text-slate-700">{employee.target}</span>
                      <span className="text-slate-400">{employee.progress}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100">
                      <div className={`h-2 rounded-full ${employee.progressColor} ${employee.progressWidth}`} />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Image
                      src="/images/dashboard/employee-placeholder.svg"
                      alt={employee.manager}
                      width={26}
                      height={26}
                      className="rounded-full"
                    />
                    <span className="font-medium text-slate-700">{employee.manager}</span>
                  </div>

                  <div className="flex items-center justify-center text-lg text-slate-400">⋮</div>
                </div>
              ))
            )}
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
            <p className="text-[14px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Showing {paginatedEmployees.length} of {filteredEmployees.length} filtered employees
            </p>
            <div className="flex items-center gap-2 text-[16px] font-semibold">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={safeCurrentPage === 1}
                className="h-8 w-8 rounded-full border border-slate-200 text-slate-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`h-8 w-8 rounded-full border ${
                    safeCurrentPage === page
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : "border-slate-200 text-slate-500"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={safeCurrentPage === totalPages}
                className="h-8 w-8 rounded-full border border-slate-200 text-slate-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ›
              </button>
            </div>
          </div>
        </AppCard>

        <div className="grid grid-cols-3 gap-5">
          {footerMetrics.map((metric) => (
            <AppCard key={metric.label}>
              <div className="flex items-center justify-between">
                <Image src={metric.icon} alt="" width={28} height={28} />
                {metric.change ? (
                  <span className="text-[16px] font-semibold text-emerald-500">{metric.change}</span>
                ) : null}
              </div>
              <p className="mt-6 text-[48px] font-semibold tracking-tight text-slate-900">{metric.value}</p>
              <p className="mt-2 text-[14px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                {metric.label}
              </p>
            </AppCard>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
