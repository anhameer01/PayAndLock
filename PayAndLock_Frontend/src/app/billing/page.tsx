"use client";

import { useState } from "react";
import { AppCard, AppSectionTitle, AppShell, PageIntro } from "@/components/app-shell";

type BillingFormData = {
  shopName: string;
  ownerName: string;
  mobile: string;
  city: string;
  state: string;
  deviceDetails: string;
  billingAmount: string;
  paymentMode: string;
  billingDate: string;
  rebillingType: string;
  rebillingNotes: string;
};

type BillingRecord = {
  id: string;
  shop: string;
  amount: string;
  status: string;
  date: string;
  ownerName: string;
  mobile: string;
  city: string;
  state: string;
  deviceDetails: string;
  paymentMode: string;
  isRebilling: boolean;
  rebillingType: string;
  rebillingNotes: string;
};

const emptyForm: BillingFormData = {
  shopName: "",
  ownerName: "",
  mobile: "",
  city: "",
  state: "",
  deviceDetails: "",
  billingAmount: "",
  paymentMode: "",
  billingDate: "",
  rebillingType: "",
  rebillingNotes: "",
};

const initialBillingRecords: BillingRecord[] = [
  {
    id: "bill-1",
    shop: "Empire Tech Hub",
    amount: "₹25,800",
    status: "Paid",
    date: "2026-03-25",
    ownerName: "Alex Thompson",
    mobile: "9826004997",
    city: "Indore",
    state: "Madhya Pradesh",
    deviceDetails: "iPhone",
    paymentMode: "online",
    isRebilling: false,
    rebillingType: "",
    rebillingNotes: "",
  },
  {
    id: "bill-2",
    shop: "Valley Solutions",
    amount: "₹12,450",
    status: "Due",
    date: "2026-03-27",
    ownerName: "Sarah James",
    mobile: "9898989898",
    city: "Bhopal",
    state: "Madhya Pradesh",
    deviceDetails: "Android POS",
    paymentMode: "cash",
    isRebilling: false,
    rebillingType: "",
    rebillingNotes: "",
  },
];

type BillingMode = "new" | "rebilling" | null;

export default function BillingPage() {
  const [formData, setFormData] = useState<BillingFormData>(emptyForm);
  const [billingRecords, setBillingRecords] = useState<BillingRecord[]>(initialBillingRecords);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submittedMessage, setSubmittedMessage] = useState("");
  const [lastDeletedRecord, setLastDeletedRecord] = useState<BillingRecord | null>(null);
  const [activeMode, setActiveMode] = useState<BillingMode>(null);

  function updateField(field: keyof BillingFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSubmittedMessage("");
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!formData.shopName || !formData.ownerName || !formData.billingAmount || !formData.billingDate) {
      setSubmittedMessage("Please fill required billing fields.");
      return;
    }

    const nextRecord: BillingRecord = {
      id: editingId ?? `bill-${Date.now()}`,
      shop: formData.shopName,
      amount: `₹${Number(formData.billingAmount).toLocaleString("en-IN")}`,
      status: formData.paymentMode.toLowerCase() === "online" ? "Paid" : "Due",
      date: formData.billingDate,
      ownerName: formData.ownerName,
      mobile: formData.mobile,
      city: formData.city,
      state: formData.state,
      deviceDetails: formData.deviceDetails,
      paymentMode: formData.paymentMode,
      isRebilling: activeMode === "rebilling",
      rebillingType: formData.rebillingType,
      rebillingNotes: formData.rebillingNotes,
    };

    setBillingRecords((prev) =>
      editingId ? prev.map((record) => (record.id === editingId ? nextRecord : record)) : [nextRecord, ...prev],
    );
    setSubmittedMessage(editingId ? "Billing record updated successfully." : "Billing record saved successfully.");
    setEditingId(null);
    setFormData(emptyForm);
    setActiveMode(null);
  }

  function handleEdit(record: BillingRecord) {
    setEditingId(record.id);
    setActiveMode(record.isRebilling ? "rebilling" : "new");
    setFormData({
      shopName: record.shop,
      ownerName: record.ownerName,
      mobile: record.mobile,
      city: record.city,
      state: record.state,
      deviceDetails: record.deviceDetails,
      billingAmount: record.amount.replace(/[^\d]/g, ""),
      paymentMode: record.paymentMode,
      billingDate: record.date,
      rebillingType: record.rebillingType,
      rebillingNotes: record.rebillingNotes,
    });
    setSubmittedMessage("Editing billing record.");
  }

  function handleDelete(id: string) {
    const deletedRecord = billingRecords.find((record) => record.id === id) ?? null;
    setBillingRecords((prev) => prev.filter((record) => record.id !== id));
    setLastDeletedRecord(deletedRecord);
    if (editingId === id) {
      setEditingId(null);
      setFormData(emptyForm);
      setActiveMode(null);
    }
    setSubmittedMessage("Billing record deleted.");
  }

  function handleUndoDelete() {
    if (!lastDeletedRecord) return;
    setBillingRecords((prev) => [lastDeletedRecord, ...prev]);
    setSubmittedMessage("Billing record restored.");
    setLastDeletedRecord(null);
  }

  function openMode(mode: BillingMode) {
    setActiveMode(mode);
    setEditingId(null);
    setFormData(emptyForm);
    setSubmittedMessage("");
  }

  return (
    <AppShell currentPath="/billing" searchPlaceholder="Search billing records, shops, or states...">
      <div className="flex min-h-full flex-col gap-5">
        <PageIntro
          title="Billing" 
          description="Manage shop billing, recurring payments, and renewal cycles." 
        />

        {activeMode ? (
          <AppCard>
            <AppSectionTitle
              title={activeMode === "rebilling" ? "Re-Billing" : "New Billing"}
              kicker={activeMode === "rebilling" ? "Renewal / Additional Purchase" : "Create Invoice"}
            />
            <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
              {[
                { label: "Shop Name", key: "shopName", type: "text" },
                { label: "Owner Name", key: "ownerName", type: "text" },
                { label: "Mobile", key: "mobile", type: "tel" },
                { label: "City", key: "city", type: "text" },
                { label: "State", key: "state", type: "text" },
                { label: "Device Details", key: "deviceDetails", type: "text" },
                { label: "Billing Amount", key: "billingAmount", type: "number" },
                { label: "Payment Mode", key: "paymentMode", type: "text" },
                { label: "Billing Date", key: "billingDate", type: "date" },
              ].map((input) => (
                <label key={input.key} className="block text-base font-semibold text-slate-700">
                  {input.label}
                  <input
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-base text-slate-800 outline-none focus:border-indigo-400"
                    value={formData[input.key as keyof BillingFormData]}
                    type={input.type}
                    onChange={(e) => updateField(input.key as keyof BillingFormData, e.target.value)}
                  />
                </label>
              ))}

              {activeMode === "rebilling" ? (
                <>
                  <label className="block text-base font-semibold text-slate-700">
                    Re-Billing Type
                    <input
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-base text-slate-800 outline-none focus:border-indigo-400"
                      value={formData.rebillingType}
                      type="text"
                      onChange={(e) => updateField("rebillingType", e.target.value)}
                    />
                  </label>
                  <label className="block text-base font-semibold text-slate-700 md:col-span-2">
                    Re-Billing Notes
                    <textarea
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-base text-slate-800 outline-none focus:border-indigo-400"
                      value={formData.rebillingNotes}
                      onChange={(e) => updateField("rebillingNotes", e.target.value)}
                      rows={4}
                    />
                  </label>
                </>
              ) : null}

              <div className="col-span-full flex flex-wrap items-center gap-3">
                <button className="rounded-xl bg-indigo-600 px-6 py-3 text-base font-semibold text-white">
                  {editingId ? "Update Billing" : activeMode === "rebilling" ? "Save Re-Billing" : "Save Billing"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveMode(null);
                    setEditingId(null);
                    setFormData(emptyForm);
                    setSubmittedMessage("");
                  }}
                  className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <span className="text-base text-slate-500">{submittedMessage}</span>
                {lastDeletedRecord ? (
                  <button
                    type="button"
                    onClick={handleUndoDelete}
                    className="text-base font-semibold text-indigo-600"
                  >
                    Undo
                  </button>
                ) : null}
              </div>
            </form>
          </AppCard>
        ) : null}

        {activeMode === null ? (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => openMode("new")}
              className="rounded-xl bg-indigo-600 px-6 py-3 text-base font-semibold text-white"
            >
              New Billing
            </button>
            <button
              type="button"
              onClick={() => openMode("rebilling")}
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-700"
            >
              Re-Billing
            </button>
          </div>
        ) : null}

        <AppCard>
          <AppSectionTitle title="Billing Overview" kicker="Latest entries" />
          <div className="mt-4 overflow-auto">
            <table className="min-w-full text-left text-base">
              <thead className="border-b border-slate-200 text-slate-500">
                <tr>
                  <th className="px-3 py-2">Shop</th>
                  <th className="px-3 py-2">Amount</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Type</th>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {billingRecords.map((record) => (
                  <tr key={record.id} className="border-b border-slate-100">
                    <td className="px-3 py-2 font-semibold text-slate-800">{record.shop}</td>
                    <td className="px-3 py-2">{record.amount}</td>
                    <td className={`px-3 py-2 ${record.status === "Paid" ? "text-emerald-700" : "text-amber-700"}`}>
                      {record.status}
                    </td>
                    <td className="px-3 py-2">{record.isRebilling ? "Re-Billing" : "New Billing"}</td>
                    <td className="px-3 py-2">{record.date}</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleEdit(record)}
                          className="font-semibold text-indigo-600"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(record.id)}
                          className="font-semibold text-rose-600"
                        >
                          Delete
                        </button>
                      </div>
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
