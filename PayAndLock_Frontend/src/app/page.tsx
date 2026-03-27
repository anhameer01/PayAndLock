"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

function LockMark() {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(180deg,#4f46e5_0%,#4338ca_100%)] shadow-[0_14px_30px_rgba(79,70,229,0.28)]">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-7 w-7 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5" y="11" width="14" height="9" rx="2" />
        <path d="M8 11V8a4 4 0 1 1 8 0v3" />
        <circle cx="12" cy="15" r="1" fill="currentColor" stroke="none" />
      </svg>
    </div>
  );
}

function InputIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 text-slate-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 19a4 4 0 0 0-8 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CompassMark() {
  return (
    <div
      className="pointer-events-none absolute right-8 hidden opacity-60 lg:block"
      style={{ bottom: "1rem", transform: "scale(1.3)" }}
    >
      <div className="relative h-32 w-24 text-slate-200">
        <div className="absolute left-1/2 top-0 h-14 w-14 -translate-x-1/2 rounded-full border-[10px] border-current" />
        <div className="absolute left-1/2 top-10 h-12 w-12 -translate-x-1/2 rounded-full bg-white/50" />
        <div className="absolute left-4 top-16 h-20 w-4 rotate-[22deg] rounded-full bg-current" />
        <div className="absolute right-4 top-16 h-20 w-4 -rotate-[22deg] rounded-full bg-current" />
      </div>
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!loginId.trim() || !password) {
      setError("please enter valid credentials");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loginId, password }),
      });

      if (!response.ok) {
        const body = await response.json();
        setError(body?.message ?? "please enter valid credentials");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("please enter valid credentials");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f7fd] text-slate-950 text-[18px]">
      <div className="flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_50px_rgba(15,23,42,0.12)] text-[18px]">
          <div className="mb-8 flex flex-col items-center text-center">
            <LockMark />
            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900">Pay &amp; Lock</h1>
            <p className="mt-1 text-sm font-medium text-slate-500">Digital Architect v1</p>
          </div>

          <div>
            <h2 className="text-[1.75rem] font-semibold tracking-tight text-slate-900">Welcome back</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">Please enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label htmlFor="loginId" className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Login ID / Mobile
              </label>
              <div className="mt-2 flex items-center gap-3 rounded-xl bg-slate-100 px-4 py-3 shadow-inner shadow-slate-200/55">
                <InputIcon />
                <input
                  id="loginId"
                  type="text"
                  placeholder="Enter your ID or phone"
                  value={loginId}
                  onChange={(event) => setLoginId(event.target.value)}
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between gap-3">
                <label htmlFor="password" className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs font-semibold text-indigo-600 transition hover:text-indigo-700">
                  Forgot?
                </Link>
              </div>
              <div className="mt-2 flex items-center gap-3 rounded-xl bg-slate-100 px-4 py-3 shadow-inner shadow-slate-200/55">
                <InputIcon />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="........"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="rounded-lg px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-md bg-rose-100 px-3 py-2 text-sm font-semibold text-rose-800">{error}</p>
            )}

            <label className="flex items-center gap-2 text-sm text-slate-500">
              <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
              <span>Keep me signed in</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="flex h-13 w-full items-center justify-center rounded-xl bg-[linear-gradient(180deg,#4f46e5_0%,#4338ca_100%)] px-5 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(79,70,229,0.34)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(79,70,229,0.38)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Secure Sign In"}
              <span className="ml-2 text-base">→</span>
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link href="#" className="font-semibold text-indigo-600 transition hover:text-indigo-700">
              Request access
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-400">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="#">Support Center</Link>
          </div>
        </div>
      </div>

      <CompassMark />
    </main>
  );
}
