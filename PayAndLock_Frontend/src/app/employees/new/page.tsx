"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { addEmployee, createEmployeeRecord, ensureEmployeesSeeded } from "@/lib/employee-store";

const indiaLocations = [
  { name: "Maharashtra", cities: ["Mumbai", "Pune", "Nagpur"] },
  { name: "Karnataka", cities: ["Bengaluru", "Mysore", "Mangalore"] },
  { name: "Delhi", cities: ["New Delhi", "North Delhi", "South Delhi"] },
  { name: "Tamil Nadu", cities: ["Chennai", "Coimbatore", "Madurai"] },
];

const stateHeads = [
  { id: "sh1", name: "Ravi Kumar" },
  { id: "sh2", name: "Meera Joshi" },
];

const asms = [
  { id: "asm1", name: "Julian Vane", state: "Maharashtra" },
  { id: "asm2", name: "Aarti Singh", state: "Karnataka" },
];

const roleOptions = ["Super Admin", "State Head", "ASM", "BDM"];

export default function NewEmployeePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    role: "",
    target: "",
    manager: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [savedMessage, setSavedMessage] = useState("");
  const [messageTone, setMessageTone] = useState<"success" | "error">("error");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedProof, setSelectedProof] = useState<{
    name: string;
    url: string | null;
    isImage: boolean;
  } | null>(null);
  const portraitInputRef = useRef<HTMLInputElement>(null);
  const proofInputRef = useRef<HTMLInputElement>(null);

  const citiesForState = useMemo(() => {
    const stateItem = indiaLocations.find((item) => item.name === form.state);
    return stateItem ? stateItem.cities : [];
  }, [form.state]);

  const managerOptions = useMemo(() => {
    if (form.role === "ASM") {
      return stateHeads;
    }
    if (form.role === "BDM") {
      return asms;
    }
    return [];
  }, [form.role]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSavedMessage("");
  };

  const handlePortraitClick = () => {
    if (portraitInputRef.current) portraitInputRef.current.click();
  };

  const handlePortraitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setSelectedImage(url);
  };

  const handleProofClick = () => {
    if (proofInputRef.current) proofInputRef.current.click();
  };

  const handleProofChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    setSelectedProof({
      name: file.name,
      url: isImage ? URL.createObjectURL(file) : null,
      isImage,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.fullName || !form.email || !form.role) {
      setSavedMessage("Complete required fields before saving.");
      setMessageTone("error");
      return;
    }

    ensureEmployeesSeeded();
    addEmployee(
      createEmployeeRecord({
        name: form.fullName,
        email: form.email,
        phone: form.phone,
        state: form.state,
        city: form.city,
        role: form.role,
        target: form.target,
        manager: form.manager,
      }),
    );
    setSavedMessage("Employee profile created successfully.");
    setMessageTone("success");
    router.push("/employees");
  };

  return (
    <AppShell
      currentPath="/employees"
      searchPlaceholder="Search Pay & Lock CRM..."
      userName="Pay & Lock CRM"
      userRole=""
      sidebarAccountName="Admin Account"
      sidebarAccountEmail="admin@paylock.com"
      sidebarAccountAvatarSrc="/images/employees/admin-avatar.svg"
    >
      <div className="flex min-h-full flex-col gap-6 text-[16px]">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[13px] font-semibold text-slate-500">
              <Link href="/employees" className="hover:text-indigo-600">
                Employees
              </Link>{" "}
              &gt; <span className="text-indigo-600">Add New Employee</span>
            </div>
            <h2 className="mt-4 text-[44px] font-semibold tracking-tight text-slate-950">
              Create Employee Profile
            </h2>
            <p className="mt-1 max-w-3xl text-[18px] leading-7 text-slate-600">
              Fill in necessary details and establish reporting hierarchy for Indian operations.
            </p>
          </div>

          <button className="text-[14px] font-semibold text-indigo-700">Discard Draft</button>
        </div>

        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_316px]">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <section className="rounded-[24px] bg-white p-7 shadow-[0_14px_36px_rgba(15,23,42,0.05)]">
              <h3 className="flex items-center gap-2 text-[20px] font-semibold text-slate-950">
                <span className="text-indigo-600">◔</span> Personal Information
              </h3>

              <div className="mt-6 grid grid-cols-2 gap-5">
                <div className="col-span-2">
                  <label className="mb-2 block text-[14px] font-semibold text-slate-500">Full Name</label>
                  <input
                    value={form.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-[16px] outline-none"
                    placeholder="e.g. Arjun Mehta"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[14px] font-semibold text-slate-500">Email Address</label>
                  <input
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    type="email"
                    placeholder="arjun@paylock.com"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-[16px] outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[14px] font-semibold text-slate-500">Mobile</label>
                  <input
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-[16px] outline-none"
                  />
                </div>

                <div className="col-span-2">
                  <label className="mb-2 block text-[14px] font-semibold text-slate-500">Residential Address</label>
                  <input
                    value={form.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    placeholder="Street, building, sector"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-[16px] outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[14px] font-semibold text-slate-500">State</label>
                  <select
                    value={form.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-[16px] outline-none"
                  >
                    <option value="">Select State</option>
                    {indiaLocations.map((state) => (
                      <option key={state.name} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-[14px] font-semibold text-slate-500">City</label>
                  <select
                    value={form.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    disabled={!form.state}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-[16px] outline-none"
                  >
                    <option>{form.state ? "Select City" : "Select state first"}</option>
                    {citiesForState.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            <section className="rounded-[24px] bg-white p-7 shadow-[0_14px_36px_rgba(15,23,42,0.05)]">
              <h3 className="flex items-center gap-2 text-[20px] font-semibold text-slate-950">
                <span className="text-indigo-600">◔</span> Role & Targets
              </h3>

              <div className="mt-6 grid grid-cols-2 gap-5">
                <div>
                  <label className="mb-2 block text-[14px] font-semibold text-slate-500">Designation / Role</label>
                  <select
                    value={form.role}
                    onChange={(e) => handleChange("role", e.target.value)}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-[16px] outline-none"
                  >
                    <option value="">Select Role</option>
                    {roleOptions.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-[14px] font-semibold text-slate-500">Monthly Sales Target (₹)</label>
                  <input
                    value={form.target}
                    onChange={(e) => handleChange("target", e.target.value)}
                    placeholder="750000"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-[16px] outline-none"
                  />
                </div>

                <div className="col-span-2">
                  <label className="mb-2 block text-[14px] font-semibold text-slate-500">Reporting Manager</label>
                  <select
                    value={form.manager}
                    onChange={(e) => handleChange("manager", e.target.value)}
                    disabled={!managerOptions.length}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-[16px] outline-none"
                  >
                    <option value="">
                      {form.role === "ASM"
                        ? "Choose State Head"
                        : form.role === "BDM"
                        ? "Choose ASM"
                        : "No manager required"}
                    </option>
                    {managerOptions.map((mgr) => (
                      <option key={mgr.id} value={mgr.name}>
                        {mgr.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            <div className="relative flex w-full justify-end pt-1">
              <div className="absolute left-0 top-1/2 min-h-[24px] -translate-y-1/2">
                {savedMessage ? (
                  <p
                    className={`text-[14px] font-semibold ${
                      messageTone === "success" ? "text-emerald-600" : "text-amber-600"
                    }`}
                  >
                    {savedMessage}
                  </p>
                ) : null}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="reset"
                  onClick={() => {
                    setForm({
                      fullName: "",
                      email: "",
                      phone: "",
                      address: "",
                      state: "",
                      city: "",
                      role: "",
                      target: "",
                      manager: "",
                      password: "",
                    });
                    setSavedMessage("");
                    setMessageTone("error");
                    setSelectedImage(null);
                    setSelectedProof(null);
                  }}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-[14px] font-semibold text-slate-700"
                >
                  Reset Form
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-5 py-3 text-[14px] font-semibold text-white"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>

          <aside className="flex flex-col gap-6">
            <section className="relative flex min-h-[214px] flex-col items-center justify-center rounded-[24px] bg-white px-6 py-7 text-center shadow-[0_14px_36px_rgba(15,23,42,0.05)]">
              <div className="relative flex h-[84px] w-[84px] items-center justify-center overflow-hidden rounded-full border-2 border-slate-200 bg-slate-50">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={handlePortraitClick}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handlePortraitClick();
                    }
                  }}
                  className="relative h-full w-full cursor-pointer"
                >
                  <Image
                    src={selectedImage || "/images/employees/photo.svg"}
                    alt="Profile photo"
                    fill
                    sizes="84px"
                    className="object-contain p-3"
                  />
                </div>
              </div>
              <input
                ref={portraitInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePortraitChange}
              />
              <p className="mt-4 text-center text-[16px] font-semibold text-slate-900">Employee Portrait</p>
              <p className="mt-2 max-w-[190px] text-center text-[12px] leading-6 text-slate-600">
                Use a clear front-facing ID-style photo.
              </p>
              {selectedImage ? (
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="mt-3 text-[13px] font-semibold text-rose-600"
                >
                  Remove Image
                </button>
              ) : null}
            </section>

            <section className="rounded-[24px] bg-white px-6 py-6 text-center shadow-[0_14px_36px_rgba(15,23,42,0.05)]">
              <h3 className="text-center text-[18px] font-semibold text-slate-950">Verification Documents</h3>
              <button
                type="button"
                onClick={handleProofClick}
                className="mt-4 w-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center transition hover:border-indigo-300 hover:bg-indigo-50/30"
              >
                {selectedProof?.isImage && selectedProof.url ? (
                  <div className="flex flex-col items-center">
                    <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-slate-200 bg-white">
                      <Image
                        src={selectedProof.url}
                        alt="Selected ID proof"
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <p className="mt-3 max-w-[200px] truncate text-[14px] font-semibold text-slate-800">
                      {selectedProof.name}
                    </p>
                    <p className="mt-1 text-[12px] text-slate-600">Tap to replace ID proof</p>
                  </div>
                ) : selectedProof ? (
                  <div className="flex flex-col items-center">
                    <Image src="/images/employees/Icon.svg" alt="ID proof" width={28} height={20} className="mx-auto" />
                    <p className="mt-3 max-w-[200px] truncate text-[14px] font-semibold text-slate-800">
                      {selectedProof.name}
                    </p>
                    <p className="mt-1 text-[12px] text-slate-600">PDF selected. Tap to replace file.</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Image src="/images/employees/Icon.svg" alt="ID proof" width={28} height={20} className="mx-auto" />
                    <p className="mt-3 text-[14px] font-semibold text-slate-800">Upload ID Proof</p>
                    <p className="mt-1 text-[12px] text-slate-600">PDF, JPG, or PNG (Max 5MB)</p>
                  </div>
                )}
              </button>
              <input
                ref={proofInputRef}
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={handleProofChange}
              />
              {selectedProof ? (
                <button
                  type="button"
                  onClick={() => setSelectedProof(null)}
                  className="mt-3 text-[13px] font-semibold text-rose-600"
                >
                  Remove File
                </button>
              ) : null}
            </section>

            <section className="rounded-[24px] bg-white px-6 py-6 shadow-[0_14px_36px_rgba(15,23,42,0.05)]">
              <h3 className="text-center text-[18px] font-semibold text-slate-950">Access & Security</h3>
              <div className="mt-5">
                <label className="mb-2 block text-[14px] font-semibold text-slate-500">Initial Password</label>
                <div className="flex h-12 items-center rounded-xl border border-slate-200 bg-slate-50 px-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    placeholder="password"
                    className="w-full border-none bg-transparent text-[16px] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-[14px] font-semibold text-indigo-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <div>
                  <p className="text-[14px] font-semibold text-slate-900">Enable 2FA</p>
                  <p className="text-[12px] text-slate-600">Require mobile OTP</p>
                </div>
                <button
                  type="button"
                  aria-pressed={twoFactorEnabled}
                  onClick={() => setTwoFactorEnabled((value) => !value)}
                  className={`flex h-6 w-11 items-center rounded-full px-1 transition ${
                    twoFactorEnabled ? "bg-emerald-500" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`h-4 w-4 rounded-full bg-white transition ${
                      twoFactorEnabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
