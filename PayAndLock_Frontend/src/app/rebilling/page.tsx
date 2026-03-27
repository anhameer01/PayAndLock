"use client";

import { useState } from "react";
import { AppCard, AppSectionTitle, AppShell, PageIntro } from "@/components/app-shell";

type RebillingForm = {
  retailerName: string;
  contactPerson: string;
  mobile: string;
  existingPlan: string;
  existingDevice: string;
  rebillingType: string;
  amount: string;
  purchaseDate: string;
  paymentMode: string;
  remarks: string;
};

type RebillingRecord = RebillingForm & {
  id: string;
  status: string;
};

const emptyForm: RebillingForm = {
  retailerName: "",
  contactPerson: "",
  mobile: "",
  existingPlan: "",
  existingDevice: "",
  rebillingType: "Renewal",
  amount: "",
  purchaseDate: "",
  paymentMode: "",
  remarks: "",
};

const initialRecords: RebillingRecord[] = [
  {
    id: "rebill-1",
    retailerName: "Digital Galaxy",
    contactPerson: "Aman Shah",
    mobile: "+91 98765 43210",
    existingPlan: "Gold Annual",
    existingDevice: "2 POS Terminals",
    rebillingType: "Renewal",
    amount: "18500",
    purchaseDate: "2026-03-22",
    paymentMode: "Online",
    remarks: "Renewal bundled with extended support.",
    status: "Confirmed",
  },
  {
    id: "rebill-2",
    retailerName: "Metro Hardware",
    contactPerson: "Neha Verma",
    mobile: "+91 91234 56780",
    existingPlan: "Silver",
    existingDevice: "1 Smart Lock",
    rebillingType: "New Purchase",
    amount: "9200",
    purchaseDate: "2026-03-24",
    paymentMode: "Cash",
    remarks: "Additional device requested for second counter.",
    status: "Pending",
  },
];

export default function RebillingPage() {
  const [form, setForm] = useState<RebillingForm>(emptyForm);
  const [records, setRecords] = useState<RebillingRecord[]>(initialRecords);
  const [message, setMessage] = useState("");

  function updateField(field: keyof RebillingForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setMessage("");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.retailerName || !form.existingPlan || !form.amount) {
      setMessage("Complete the required re-billing fields before saving.");
      return;
    }

    const nextRecord: RebillingRecord = {
      ...form,
      id: `rebill-${Date.now()}`,
      status: form.rebillingType === "Renewal" ? "Confirmed" : "Pending",
    };

    setRecords((prev) => [nextRecord, ...prev]);
    setForm(emptyForm);
    setMessage("Re-billing request saved successfully.");
  }

  return (
    <AppShell currentPath="/rebilling" searchPlaceholder="Search renewals, devices, or retailer names...">
      <div className="flex min-h-full flex-col gap-6">
        <PageIntro
          title="Re-Billing"
          description="Handle retailer renewals and additional device purchases using the same structured workflow as the rest of the CRM."
        />

        <AppCard className="p-7">
          <AppSectionTitle title="Create Re-Billing Request" kicker="Renewal or Additional Device" />
          <form className="mt-6 grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
            {[
              { label: "Retailer Name", key: "retailerName", type: "text", placeholder: "Retailer account name" },
              { label: "Contact Person", key: "contactPerson", type: "text", placeholder: "Primary owner / manager" },
              { label: "Mobile", key: "mobile", type: "tel", placeholder: "+91 00000 00000" },
              { label: "Existing Plan", key: "existingPlan", type: "text", placeholder: "Plan currently assigned" },
              { label: "Existing Device", key: "existingDevice", type: "text", placeholder: "Current installed device" },
              { label: "Amount", key: "amount", type: "number", placeholder: "Billing amount" },
              { label: "Purchase Date", key: "purchaseDate", type: "date", placeholder: "" },
              { label: "Payment Mode", key: "paymentMode", type: "text", placeholder: "Cash / Online / UPI" },
            ].map((field) => (
              <label key={field.key} className="block">
                <span className="text-[14px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {field.label}
                </span>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.key as keyof RebillingForm]}
                  onChange={(event) => updateField(field.key as keyof RebillingForm, event.target.value)}
                  className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-[17px] text-slate-800 outline-none"
                />
              </label>
            ))}

            <label className="block">
              <span className="text-[14px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Renewal / New Purchase
              </span>
              <select
                value={form.rebillingType}
                onChange={(event) => updateField("rebillingType", event.target.value)}
                className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-[17px] text-slate-800 outline-none"
              >
                <option>Renewal</option>
                <option>New Purchase</option>
              </select>
            </label>

            <label className="block md:col-span-2">
              <span className="text-[14px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Remarks
              </span>
              <textarea
                value={form.remarks}
                onChange={(event) => updateField("remarks", event.target.value)}
                placeholder="Commercial notes, approval context, or hardware details..."
                className="mt-2 min-h-[120px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[17px] text-slate-800 outline-none"
              />
            </label>

            <div className="md:col-span-2 flex items-center gap-3">
              <button className="rounded-xl bg-indigo-600 px-6 py-3 text-[16px] font-semibold text-white shadow-[0_12px_24px_rgba(79,70,229,0.26)]">
                Save Re-Billing
              </button>
              <button
                type="button"
                onClick={() => {
                  setForm(emptyForm);
                  setMessage("");
                }}
                className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-[16px] font-semibold text-slate-700"
              >
                Reset
              </button>
              <span className="text-[15px] font-medium text-slate-500">{message}</span>
            </div>
          </form>
        </AppCard>

        <AppCard className="p-7">
          <AppSectionTitle title="Recent Re-Billing Activity" kicker="Latest submissions" />
          <div className="mt-5 overflow-hidden rounded-[24px] border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left">
              <thead className="bg-slate-950 text-[14px] uppercase tracking-[0.18em] text-slate-300">
                <tr>
                  <th className="px-4 py-4 font-medium">Retailer</th>
                  <th className="px-4 py-4 font-medium">Plan / Device</th>
                  <th className="px-4 py-4 font-medium">Type</th>
                  <th className="px-4 py-4 font-medium">Amount</th>
                  <th className="px-4 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white text-[16px] text-slate-700">
                {records.map((record) => (
                  <tr key={record.id}>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-slate-950">{record.retailerName}</p>
                      <p className="text-[14px] text-slate-500">{record.contactPerson}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-slate-900">{record.existingPlan}</p>
                      <p className="text-[14px] text-slate-500">{record.existingDevice}</p>
                    </td>
                    <td className="px-4 py-4">{record.rebillingType}</td>
                    <td className="px-4 py-4 font-semibold text-slate-950">₹{Number(record.amount || 0).toLocaleString("en-IN")}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-[14px] font-semibold ${
                          record.status === "Confirmed"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AppCard>
      </div>
    </AppShell>
  );
}
