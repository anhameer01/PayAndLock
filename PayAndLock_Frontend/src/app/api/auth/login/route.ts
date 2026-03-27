import { NextResponse } from "next/server";

function getBackendLoginUrls() {
  const configuredBaseUrl = process.env.BACKEND_API_BASE_URL?.trim().replace(/\/$/, "");

  const urls = [
    configuredBaseUrl ? `${configuredBaseUrl}/api/Auth/login` : null,
    "https://localhost:7257/api/Auth/login",
    "http://localhost:24271/api/Auth/login",
  ].filter(Boolean) as string[];

  return Array.from(new Set(urls));
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const loginId = typeof body.loginId === "string" ? body.loginId.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!loginId || !password) {
    return NextResponse.json({ message: "please enter valid credentials" }, { status: 400 });
  }

  const backendUrls = getBackendLoginUrls();

  let lastErrorMessage = "Unable to reach login service";
  let lastStatus = 502;

  for (const url of backendUrls) {
    try {
      if (url.startsWith("https://")) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      }

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loginId, password }),
        cache: "no-store",
      });

      const payload = await response.json().catch(() => ({}));

      if (response.ok) {
        const forwardedResponse = NextResponse.json(payload, { status: 200 });

        if (typeof payload?.token === "string" && payload.token) {
          forwardedResponse.cookies.set("auth_token", payload.token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            path: "/",
          });
        }

        return forwardedResponse;
      }

      lastErrorMessage =
        typeof payload?.message === "string" ? payload.message : "please enter valid credentials";
      lastStatus = response.status;

      if (response.status !== 404) {
        return NextResponse.json({ message: lastErrorMessage }, { status: response.status });
      }
    } catch {
      lastErrorMessage = `Unable to reach login service. Start the backend server and verify ${url}.`;
    }
  }

  return NextResponse.json({ message: lastErrorMessage }, { status: lastStatus });
}
