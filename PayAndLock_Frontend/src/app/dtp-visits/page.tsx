"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { AppCard, AppShell } from "@/components/app-shell";

type VisitHistoryRecord = {
  id: string;
  date: string;
  time: string;
  employee: string;
  shop: string;
  location: string;
  mobile: string;
  sold: boolean;
  interest: string;
};

type VisitForm = {
  email: string;
  contactNo: string;
  paymentProofOfPurchage: string;
  shopOwnerNameAndAddress: string;
  numberOfKeySold: string;
  districtName: string;
  pinCode: string;
  visitTheShop: string;
  interested: string;
  shopType: string;
  asm: string;
  bdm: string;
  officeAssociateName: string;
  stateName: string;
  shopName: string;
};

const initialVisitHistory: VisitHistoryRecord[] = [
  {
    id: "visit-1",
    date: "2026-03-25",
    time: "10:45",
    employee: "Rahul Sharma",
    shop: "Digital Galaxy",
    location: "Mumbai, Maharashtra",
    mobile: "+91 98765 43210",
    sold: true,
    interest: "Yes",
  },
  {
    id: "visit-2",
    date: "2026-03-25",
    time: "09:15",
    employee: "Priya Kapoor",
    shop: "Metro Hardware",
    location: "Pune, Maharashtra",
    mobile: "+91 91234 56780",
    sold: false,
    interest: "Maybe",
  },
  {
    id: "visit-3",
    date: "2026-03-24",
    time: "16:30",
    employee: "Rahul Sharma",
    shop: "Quick Stop Mobiles",
    location: "Mumbai, Maharashtra",
    mobile: "+91 99887 76543",
    sold: true,
    interest: "Yes",
  },
  {
    id: "visit-4",
    date: "2026-03-24",
    time: "14:15",
    employee: "Ellen Roy",
    shop: "Tech Solutions Plus",
    location: "Pune, Maharashtra",
    mobile: "+91 99667 45123",
    sold: true,
    interest: "Yes",
  },
  {
    id: "visit-5",
    date: "2026-03-23",
    time: "11:30",
    employee: "Priya Kapoor",
    shop: "Smart Retail Store",
    location: "Indore, Madhya Pradesh",
    mobile: "+91 98556 23456",
    sold: false,
    interest: "No",
  },
];

const employeeOptions = ["All Staff", "Rahul Sharma", "Priya Kapoor", "Ellen Roy"];
const districtOptions = ["District", "Mumbai", "Pune", "Indore", "Bhopal"];

const emptyForm: VisitForm = {
  email: "",
  contactNo: "",
  paymentProofOfPurchage: "",
  shopOwnerNameAndAddress: "",
  numberOfKeySold: "",
  districtName: "",
  pinCode: "",
  visitTheShop: "",
  interested: "",
  shopType: "",
  asm: "",
  bdm: "",
  officeAssociateName: "",
  stateName: "",
  shopName: "",
};

function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 16V7" />
      <path d="M8.5 10.5L12 7l3.5 3.5" />
      <path d="M20 16.5a3.5 3.5 0 0 1-3.5 3.5h-9A3.5 3.5 0 0 1 4 16.5a3.5 3.5 0 0 1 3.3-3.49" />
      <path d="M16.7 13.01A3.5 3.5 0 0 1 20 16.5" />
    </svg>
  );
}

function FormSection({
  title,
  helper,
  children,
}: {
  title: string;
  helper: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[24px] bg-slate-50 p-5">
      <div className="mb-4">
        <h4 className="text-[22px] font-semibold text-slate-950">{title}</h4>
        <p className="mt-1 text-[15px] leading-6 text-slate-500">{helper}</p>
      </div>
      {children}
    </section>
  );
}

export default function DTPVisitsPage() {
  const [form, setForm] = useState<VisitForm>(emptyForm);
  const [historyEmployee, setHistoryEmployee] = useState("All Staff");
  const [historyDistrict, setHistoryDistrict] = useState("District");
  const [historyDate, setHistoryDate] = useState("");
  const [historyCurrentPage, setHistoryCurrentPage] = useState(1);
  const [submittedMessage, setSubmittedMessage] = useState("");
  const [visitRecords, setVisitRecords] = useState<VisitHistoryRecord[]>(initialVisitHistory);
  const [paymentProofFile, setPaymentProofFile] = useState<string | null>(null);
  const [visitTheShopFile, setVisitTheShopFile] = useState<string | null>(null);
  const paymentProofInputRef = useRef<HTMLInputElement>(null);
  const visitShopInputRef = useRef<HTMLInputElement>(null);

  const filteredHistory = useMemo(() => {
    return visitRecords.filter((visit) => {
      const matchesEmployee = historyEmployee === "All Staff" || visit.employee === historyEmployee;
      const matchesDistrict =
        historyDistrict === "District" || visit.location.toLowerCase().includes(historyDistrict.toLowerCase());
      const matchesDate = !historyDate || visit.date === historyDate;
      return matchesEmployee && matchesDistrict && matchesDate;
    });
  }, [historyDate, historyDistrict, historyEmployee, visitRecords]);

  const itemsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(filteredHistory.length / itemsPerPage));
  const safeCurrentPage = Math.min(historyCurrentPage, totalPages);
  const paginatedHistory = filteredHistory.slice(
    (safeCurrentPage - 1) * itemsPerPage,
    safeCurrentPage * itemsPerPage,
  );

  function updateField(field: keyof VisitForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSubmittedMessage("");
  }

  function resetForm() {
    setForm(emptyForm);
    setPaymentProofFile(null);
    setVisitTheShopFile(null);
    setSubmittedMessage("");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.shopName || !form.contactNo || !form.districtName || !form.stateName) {
      setSubmittedMessage("Please complete the required DTPL fields before submitting.");
      return;
    }

    const nextRecord: VisitHistoryRecord = {
      id: `visit-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      time: new Date().toTimeString().slice(0, 5),
      employee: form.officeAssociateName || form.bdm || form.asm || "Field Staff",
      shop: form.shopName,
      location: [form.districtName, form.stateName].filter(Boolean).join(", "),
      mobile: form.contactNo,
      sold: Number(form.numberOfKeySold || "0") > 0,
      interest: form.interested || "Maybe",
    };

    setVisitRecords((prev) => [nextRecord, ...prev]);
    setSubmittedMessage("DTPL visit recorded successfully.");
    setHistoryCurrentPage(1);
    resetForm();
  }

  return (
    <AppShell currentPath="/dtp-visits" searchPlaceholder="Search visits, retailers, or districts...">
      <div className="flex min-h-full flex-col gap-6">
        <div>
          <h2 className="text-[40px] font-semibold tracking-tight text-slate-950">DTPL Visits</h2>
          <p className="mt-1 text-[18px] text-slate-600">
            Capture complete DTPL field visit details and review the latest submission history in one place.
          </p>
        </div>

        <AppCard className="p-7">
          <div className="mb-6">
            <h3 className="text-[28px] font-semibold text-slate-950">New Visit Entry</h3>
            <p className="mt-2 text-[17px] text-slate-600">
              Structured to match the requested DTPL field list while keeping the existing dashboard styling intact.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <FormSection
              title="Retailer Visit Capture"
              helper="Complete the exact DTPL visit details below using the requested field names."
            >
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {[
                  { label: "Email", key: "email", type: "email", placeholder: "Retailer email" },
                  { label: "Contact No.", key: "contactNo", placeholder: "+91 00000 00000" },
                  { label: "Shop Name", key: "shopName", placeholder: "Retail outlet name" },
                  { label: "Number of key sold", key: "numberOfKeySold", type: "number", placeholder: "0" },
                  { label: "District Name", key: "districtName", placeholder: "District" },
                  { label: "Pin Code", key: "pinCode", placeholder: "Postal code" },
                  { label: "Interested (Yes/No/Maybe)", key: "interested", placeholder: "Yes / No / Maybe" },
                  { label: "Shop Type (mobile/appliance/other shops)", key: "shopType", placeholder: "mobile / appliance / other shops" },
                  { label: "ASM", key: "asm", placeholder: "Assigned ASM" },
                  { label: "BDM", key: "bdm", placeholder: "Assigned BDM" },
                  { label: "OFFICE ASSOCIATE NAME", key: "officeAssociateName", placeholder: "Office associate" },
                  { label: "STATE NAME", key: "stateName", placeholder: "State" },
                ].map((field) => (
                  <label key={field.key} className="block">
                    <span className="text-[14px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {field.label}
                    </span>
                    <input
                      type={field.type ?? "text"}
                      placeholder={field.placeholder}
                      value={form[field.key as keyof VisitForm]}
                      onChange={(event) => updateField(field.key as keyof VisitForm, event.target.value)}
                      className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-[17px] text-slate-800 outline-none"
                    />
                  </label>
                ))}

                <label className="block md:col-span-2 xl:col-span-3">
                  <span className="text-[14px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Shop Owner Name And Address
                  </span>
                  <textarea
                    value={form.shopOwnerNameAndAddress}
                    onChange={(event) => updateField("shopOwnerNameAndAddress", event.target.value)}
                    placeholder="Owner name and full address"
                    className="mt-2 min-h-[110px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[17px] text-slate-800 outline-none"
                  />
                </label>
              </div>
            </FormSection>

            <FormSection
              title="Document Uploads"
              helper="Attach the requested purchase proof and visit evidence using the same upload card style already used in the app."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <span className="text-[14px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Payment proof of purchage
                  </span>
                  <button
                    type="button"
                    onClick={() => paymentProofInputRef.current?.click()}
                    className="mt-2 flex h-[116px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-center"
                  >
                    {paymentProofFile ? (
                      <div className="flex flex-col items-center">
                        <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                          <Image src={paymentProofFile} alt="Payment proof" fill sizes="56px" className="object-cover" />
                        </div>
                        <span className="mt-2 text-[14px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                          File Selected
                        </span>
                      </div>
                    ) : (
                      <>
                        <UploadIcon />
                        <span className="mt-2 text-[14px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                          Upload payment proof
                        </span>
                      </>
                    )}
                  </button>
                  <input
                    ref={paymentProofInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;
                      setPaymentProofFile(URL.createObjectURL(file));
                      updateField("paymentProofOfPurchage", file.name);
                    }}
                  />
                </div>

                <div>
                  <span className="text-[14px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    visit the shop?
                  </span>
                  <button
                    type="button"
                    onClick={() => visitShopInputRef.current?.click()}
                    className="mt-2 flex h-[116px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-center"
                  >
                    {visitTheShopFile ? (
                      <div className="flex flex-col items-center">
                        <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                          <Image src={visitTheShopFile} alt="Visit the shop" fill sizes="56px" className="object-cover" />
                        </div>
                        <span className="mt-2 text-[14px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                          File Selected
                        </span>
                      </div>
                    ) : (
                      <>
                        <UploadIcon />
                        <span className="mt-2 text-[14px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                          Upload visit image
                        </span>
                      </>
                    )}
                  </button>
                  <input
                    ref={visitShopInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;
                      setVisitTheShopFile(URL.createObjectURL(file));
                      updateField("visitTheShop", file.name);
                    }}
                  />
                </div>
              </div>
            </FormSection>

            <div className="flex items-center gap-3">
              <button className="rounded-xl bg-indigo-600 px-6 py-3 text-[16px] font-semibold text-white shadow-[0_12px_24px_rgba(79,70,229,0.26)]">
                Submit Visit
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-[16px] font-semibold text-slate-700"
              >
                Reset Form
              </button>
              <span className="text-[15px] font-medium text-slate-500">{submittedMessage}</span>
            </div>
          </form>
        </AppCard>

        <AppCard className="p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-[28px] font-semibold text-slate-950">Visit History</h3>
              <p className="mt-2 text-[17px] text-slate-600">
                Recent DTPL visits appear here after submission, along with filter controls for quick review.
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-[1.2fr_1fr_1fr_auto] gap-3 rounded-2xl bg-slate-50 p-3">
            <input
              type="date"
              value={historyDate}
              onChange={(event) => setHistoryDate(event.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-[18px] outline-none"
            />
            <select
              value={historyEmployee}
              onChange={(event) => setHistoryEmployee(event.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-[18px] outline-none"
            >
              {employeeOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <select
              value={historyDistrict}
              onChange={(event) => setHistoryDistrict(event.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-[18px] outline-none"
            >
              {districtOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => {
                setHistoryEmployee("All Staff");
                setHistoryDistrict("District");
                setHistoryDate("");
              }}
              className="rounded-xl border border-slate-200 bg-white px-5 text-[17px] font-semibold text-slate-600"
            >
              Clear
            </button>
          </div>

          <div className="mt-5 grid grid-cols-[1.1fr_1fr_1.3fr_0.8fr_0.7fr] gap-4 border-b border-slate-100 pb-3 text-[16px] font-semibold uppercase tracking-[0.16em] text-slate-400">
            <span>Date</span>
            <span>Employee</span>
            <span>Shop Details</span>
            <span>Interested</span>
            <span>Sold</span>
          </div>

          <div className="divide-y divide-slate-100">
            {paginatedHistory.map((visit) => (
              <div key={visit.id} className="grid grid-cols-[1.1fr_1fr_1.3fr_0.8fr_0.7fr] gap-4 py-5">
                <div>
                  <p className="text-[20px] font-semibold text-slate-900">
                    {new Date(visit.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-[16px] text-slate-500">{visit.time}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-[13px] font-semibold text-violet-700">
                    {visit.employee
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  <span className="text-[18px] font-medium text-slate-800">{visit.employee}</span>
                </div>
                <div>
                  <p className="text-[20px] font-semibold leading-6 text-slate-900">{visit.shop}</p>
                  <p className="mt-1 text-[16px] text-slate-500">{visit.location}</p>
                  <p className="text-[16px] text-slate-500">{visit.mobile}</p>
                </div>
                <div className="flex items-center text-[17px] text-slate-700">{visit.interest}</div>
                <div className="flex items-center">
                  <span
                    className={`rounded-full px-3 py-1 text-[14px] font-semibold uppercase ${
                      visit.sold ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {visit.sold ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
            <p className="text-[14px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Showing {paginatedHistory.length} of {filteredHistory.length} visits
            </p>
            <div className="flex items-center gap-2 text-[17px] font-semibold">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setHistoryCurrentPage(page)}
                  className={`h-8 w-8 rounded-full border ${
                    safeCurrentPage === page
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "border-slate-200 text-slate-500"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </AppCard>
      </div>
    </AppShell>
  );
}
