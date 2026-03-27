"use client";

export type EmployeeRecord = {
  id: string;
  name: string;
  email: string;
  role: string;
  roleTone: string;
  location: string;
  subLocation: string;
  state: string;
  city: string;
  phone: string;
  target: string;
  progress: string;
  progressWidth: string;
  progressColor: string;
  manager: string;
};

export const EMPLOYEES_STORAGE_KEY = "pay-and-lock-employees";

export const initialEmployees: EmployeeRecord[] = [
  {
    id: "emp-1",
    name: "Julian Vane",
    email: "julian.v@paylock.com",
    role: "ASM",
    roleTone: "bg-indigo-100 text-indigo-700",
    location: "Mumbai",
    subLocation: "Andheri",
    state: "Maharashtra",
    city: "Mumbai",
    phone: "+91 98765 43210",
    target: "₹1.2Cr",
    progress: "88%",
    progressWidth: "w-[88%]",
    progressColor: "bg-emerald-500",
    manager: "Ravi Kumar (State Head)",
  },
  {
    id: "emp-2",
    name: "Elena Rodriguez",
    email: "e.rodriguez@paylock.com",
    role: "State Head",
    roleTone: "bg-emerald-100 text-emerald-700",
    location: "Delhi",
    subLocation: "Connaught Place",
    state: "Delhi",
    city: "New Delhi",
    phone: "+91 98877 66554",
    target: "₹8.5Cr",
    progress: "100%",
    progressWidth: "w-full",
    progressColor: "bg-indigo-600",
    manager: "Arjun Kapoor (Super Admin)",
  },
  {
    id: "emp-3",
    name: "Marcus Chen",
    email: "m.chen@paylock.com",
    role: "ASM",
    roleTone: "bg-slate-100 text-slate-700",
    location: "Hyderabad",
    subLocation: "Hitech City",
    state: "Telangana",
    city: "Hyderabad",
    phone: "+91 99988 77766",
    target: "₹4.5Cr",
    progress: "42%",
    progressWidth: "w-[42%]",
    progressColor: "bg-amber-700",
    manager: "Ravi Kumar (State Head)",
  },
  {
    id: "emp-4",
    name: "Sophia Knight",
    email: "s.knight@paylock.com",
    role: "BDM",
    roleTone: "bg-violet-100 text-violet-700",
    location: "Bengaluru",
    subLocation: "Whitefield",
    state: "Karnataka",
    city: "Bengaluru",
    phone: "+91 91234 56789",
    target: "₹92L",
    progress: "75%",
    progressWidth: "w-[75%]",
    progressColor: "bg-emerald-600",
    manager: "Meera Joshi (ASM)",
  },
  {
    id: "emp-5",
    name: "Rajesh Singh",
    email: "r.singh@paylock.com",
    role: "State Head",
    roleTone: "bg-emerald-100 text-emerald-700",
    location: "Pune",
    subLocation: "Kalyani Nagar",
    state: "Maharashtra",
    city: "Pune",
    phone: "+91 98888 11223",
    target: "₹6.8Cr",
    progress: "95%",
    progressWidth: "w-[95%]",
    progressColor: "bg-emerald-600",
    manager: "Arjun Kapoor (Super Admin)",
  },
  {
    id: "emp-6",
    name: "Priya Kapoor",
    email: "p.kapoor@paylock.com",
    role: "BDM",
    roleTone: "bg-violet-100 text-violet-700",
    location: "Jaipur",
    subLocation: "C-Scheme",
    state: "Rajasthan",
    city: "Jaipur",
    phone: "+91 99777 22334",
    target: "₹58L",
    progress: "62%",
    progressWidth: "w-[62%]",
    progressColor: "bg-amber-700",
    manager: "Rajesh Singh (State Head)",
  },
  {
    id: "emp-7",
    name: "Amit Verma",
    email: "a.verma@paylock.com",
    role: "ASM",
    roleTone: "bg-indigo-100 text-indigo-700",
    location: "Ahmedabad",
    subLocation: "Mahal",
    state: "Gujarat",
    city: "Ahmedabad",
    phone: "+91 98555 44667",
    target: "₹2.1Cr",
    progress: "71%",
    progressWidth: "w-[71%]",
    progressColor: "bg-emerald-500",
    manager: "Rajesh Singh (State Head)",
  },
  {
    id: "emp-8",
    name: "Neha Sharma",
    email: "n.sharma@paylock.com",
    role: "BDM",
    roleTone: "bg-violet-100 text-violet-700",
    location: "Chennai",
    subLocation: "Nungambakkam",
    state: "Tamil Nadu",
    city: "Chennai",
    phone: "+91 99333 55778",
    target: "₹45L",
    progress: "81%",
    progressWidth: "w-[81%]",
    progressColor: "bg-emerald-600",
    manager: "Elena Rodriguez (State Head)",
  },
  {
    id: "emp-9",
    name: "Vikram Patel",
    email: "v.patel@paylock.com",
    role: "ASM",
    roleTone: "bg-indigo-100 text-indigo-700",
    location: "Kolkata",
    subLocation: "Ballygunge",
    state: "West Bengal",
    city: "Kolkata",
    phone: "+91 98222 66889",
    target: "₹1.8Cr",
    progress: "58%",
    progressWidth: "w-[58%]",
    progressColor: "bg-amber-700",
    manager: "Elena Rodriguez (State Head)",
  },
  {
    id: "emp-10",
    name: "Ananya Desai",
    email: "a.desai@paylock.com",
    role: "BDM",
    roleTone: "bg-violet-100 text-violet-700",
    location: "Lucknow",
    subLocation: "Gomti Nagar",
    state: "Uttar Pradesh",
    city: "Lucknow",
    phone: "+91 99111 77334",
    target: "₹52L",
    progress: "68%",
    progressWidth: "w-[68%]",
    progressColor: "bg-emerald-600",
    manager: "Marcus Chen (ASM)",
  },
  {
    id: "emp-11",
    name: "Sanjay Kapoor",
    email: "s.kapoor@paylock.com",
    role: "ASM",
    roleTone: "bg-indigo-100 text-indigo-700",
    location: "Surat",
    subLocation: "Vesu",
    state: "Gujarat",
    city: "Surat",
    phone: "+91 98999 55443",
    target: "₹1.4Cr",
    progress: "79%",
    progressWidth: "w-[79%]",
    progressColor: "bg-emerald-500",
    manager: "Rajesh Singh (State Head)",
  },
  {
    id: "emp-12",
    name: "Divya Nair",
    email: "d.nair@paylock.com",
    role: "BDM",
    roleTone: "bg-violet-100 text-violet-700",
    location: "Kochi",
    subLocation: "Ernakulum",
    state: "Kerala",
    city: "Kochi",
    phone: "+91 99888 33221",
    target: "₹38L",
    progress: "74%",
    progressWidth: "w-[74%]",
    progressColor: "bg-emerald-600",
    manager: "Sophia Knight (BDM)",
  },
  {
    id: "emp-13",
    name: "Rohit Mishra",
    email: "r.mishra@paylock.com",
    role: "ASM",
    roleTone: "bg-indigo-100 text-indigo-700",
    location: "Indore",
    subLocation: "MG Road",
    state: "Madhya Pradesh",
    city: "Indore",
    phone: "+91 98777 11223",
    target: "₹1.6Cr",
    progress: "55%",
    progressWidth: "w-[55%]",
    progressColor: "bg-amber-700",
    manager: "Rajesh Singh (State Head)",
  },
  {
    id: "emp-14",
    name: "Shruti Malhotra",
    email: "s.malhotra@paylock.com",
    role: "Super Admin",
    roleTone: "bg-amber-100 text-amber-700",
    location: "Delhi",
    subLocation: "Connaught Place",
    state: "Delhi",
    city: "New Delhi",
    phone: "+91 99666 44556",
    target: "₹12Cr",
    progress: "91%",
    progressWidth: "w-[91%]",
    progressColor: "bg-indigo-600",
    manager: "Arjun Kapoor (Super Admin)",
  },
  {
    id: "emp-15",
    name: "Arjun Sharma",
    email: "arjun.s@paylock.com",
    role: "BDM",
    roleTone: "bg-violet-100 text-violet-700",
    location: "Chandigarh",
    subLocation: "Sector 17",
    state: "Chandigarh",
    city: "Chandigarh",
    phone: "+91 98555 77889",
    target: "₹42L",
    progress: "67%",
    progressWidth: "w-[67%]",
    progressColor: "bg-emerald-600",
    manager: "Elena Rodriguez (State Head)",
  },
  {
    id: "emp-16",
    name: "Anjali Singh",
    email: "anjali.s@paylock.com",
    role: "ASM",
    roleTone: "bg-indigo-100 text-indigo-700",
    location: "Nashik",
    subLocation: "Aurangabad Road",
    state: "Maharashtra",
    city: "Nashik",
    phone: "+91 99444 88776",
    target: "₹1.3Cr",
    progress: "84%",
    progressWidth: "w-[84%]",
    progressColor: "bg-emerald-500",
    manager: "Rajesh Singh (State Head)",
  },
  {
    id: "emp-17",
    name: "Karan Patel",
    email: "k.patel@paylock.com",
    role: "BDM",
    roleTone: "bg-violet-100 text-violet-700",
    location: "Vadodara",
    subLocation: "Gotri Road",
    state: "Gujarat",
    city: "Vadodara",
    phone: "+91 99333 11556",
    target: "₹48L",
    progress: "73%",
    progressWidth: "w-[73%]",
    progressColor: "bg-emerald-600",
    manager: "Amit Verma (ASM)",
  },
  {
    id: "emp-18",
    name: "Richa Verma",
    email: "r.verma@paylock.com",
    role: "ASM",
    roleTone: "bg-indigo-100 text-indigo-700",
    location: "Gurgaon",
    subLocation: "DLF Cyber Hub",
    state: "Haryana",
    city: "Gurgaon",
    phone: "+91 98222 99445",
    target: "₹2.4Cr",
    progress: "86%",
    progressWidth: "w-[86%]",
    progressColor: "bg-emerald-500",
    manager: "Elena Rodriguez (State Head)",
  },
  {
    id: "emp-19",
    name: "Vikrant Kumar",
    email: "v.kumar@paylock.com",
    role: "BDM",
    roleTone: "bg-violet-100 text-violet-700",
    location: "Bhopal",
    subLocation: "Arera Colony",
    state: "Madhya Pradesh",
    city: "Bhopal",
    phone: "+91 99111 66223",
    target: "₹35L",
    progress: "60%",
    progressWidth: "w-[60%]",
    progressColor: "bg-amber-700",
    manager: "Rohit Mishra (ASM)",
  },
  {
    id: "emp-20",
    name: "Deepika Singh",
    email: "d.singh@paylock.com",
    role: "ASM",
    roleTone: "bg-indigo-100 text-indigo-700",
    location: "Bangalore",
    subLocation: "Indiranagar",
    state: "Karnataka",
    city: "Bangalore",
    phone: "+91 98000 12345",
    target: "₹2.8Cr",
    progress: "92%",
    progressWidth: "w-[92%]",
    progressColor: "bg-emerald-500",
    manager: "Sophia Knight (BDM)",
  },
];

export function readEmployees(): EmployeeRecord[] {
  if (typeof window === "undefined") {
    return initialEmployees;
  }

  const raw = window.localStorage.getItem(EMPLOYEES_STORAGE_KEY);
  if (!raw) {
    return initialEmployees;
  }

  try {
    const parsed = JSON.parse(raw) as EmployeeRecord[];
    return parsed.length ? parsed : initialEmployees;
  } catch {
    return initialEmployees;
  }
}

export function writeEmployees(employees: EmployeeRecord[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(EMPLOYEES_STORAGE_KEY, JSON.stringify(employees));
}

export function ensureEmployeesSeeded() {
  if (typeof window === "undefined") return;
  if (!window.localStorage.getItem(EMPLOYEES_STORAGE_KEY)) {
    writeEmployees(initialEmployees);
  }
}

export function buildRoleTone(role: string) {
  switch (role) {
    case "State Head":
      return "bg-emerald-100 text-emerald-700";
    case "BDM":
      return "bg-violet-100 text-violet-700";
    case "Super Admin":
      return "bg-amber-100 text-amber-700";
    case "ASM":
      return "bg-indigo-100 text-indigo-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export function createEmployeeRecord(input: {
  name: string;
  email: string;
  phone: string;
  state: string;
  city: string;
  role: string;
  target: string;
  manager: string;
}): EmployeeRecord {
  const numericTarget = Number(input.target.replace(/[^\d]/g, ""));
  const targetValue =
    numericTarget >= 10000000
      ? `₹${(numericTarget / 10000000).toFixed(1)}Cr`
      : numericTarget >= 100000
      ? `₹${(numericTarget / 100000).toFixed(0)}L`
      : `₹${input.target || "0"}`;

  return {
    id: `emp-${Date.now()}`,
    name: input.name,
    email: input.email,
    role: input.role,
    roleTone: buildRoleTone(input.role),
    location: input.city || input.state || "Unassigned",
    subLocation: input.state || "India",
    state: input.state || "Unassigned",
    city: input.city || "Unassigned",
    phone: input.phone || "Not provided",
    target: targetValue,
    progress: "0%",
    progressWidth: "w-[0%]",
    progressColor: "bg-indigo-600",
    manager: input.manager || "No manager required",
  };
}

export function addEmployee(record: EmployeeRecord) {
  const employees = readEmployees();
  writeEmployees([record, ...employees]);
}
