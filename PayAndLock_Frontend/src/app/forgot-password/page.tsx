"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

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
      <path d="M4 12h16" />
      <path d="M4 7h10" />
      <path d="M4 17h7" />
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

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [loginId, setLoginId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirectPending, setRedirectPending] = useState(false);

  useEffect(() => {
    if (!redirectPending) return;

    const timeoutId = window.setTimeout(() => {
      router.push("/");
    }, 1800);

    return () => window.clearTimeout(timeoutId);
  }, [redirectPending, router]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!loginId.trim()) {
      setError("Please enter your login ID or mobile number.");
      return;
    }

    setLoading(true);

    window.setTimeout(() => {
      setLoading(false);
      setRedirectPending(true);
      setMessage("Reset request received. Redirecting you to login...");
    }, 900);
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
            <h2 className="text-[1.75rem] font-semibold tracking-tight text-slate-900">Forgot password?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Enter your login ID or mobile number and we&apos;ll start your secure recovery flow.
            </p>
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

            {error ? (
              <p className="rounded-md bg-rose-100 px-3 py-2 text-sm font-semibold text-rose-800">{error}</p>
            ) : null}

            {message ? (
              <p className="rounded-md bg-emerald-100 px-3 py-2 text-sm font-semibold text-emerald-800">{message}</p>
            ) : null}

            <button
              type="submit"
              disabled={loading || redirectPending}
              className="flex h-13 w-full items-center justify-center rounded-xl bg-[linear-gradient(180deg,#4f46e5_0%,#4338ca_100%)] px-5 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(79,70,229,0.34)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(79,70,229,0.38)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Submitting..." : redirectPending ? "Redirecting..." : "Reset Password"}
              <span className="ml-2 text-base">→</span>
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            Remember your password?{" "}
            <Link href="/" className="font-semibold text-indigo-600 transition hover:text-indigo-700">
              Back to sign in
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
