import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type JsonRecord = Record<string, unknown>;

function getBackendBaseUrls() {
  const configuredBaseUrl = process.env.BACKEND_API_BASE_URL?.trim().replace(/\/$/, "");

  return Array.from(
    new Set(
      [configuredBaseUrl, "https://localhost:7257", "http://localhost:24271"].filter(
        Boolean,
      ) as string[],
    ),
  );
}

function getMetricConfig(metric: string) {
  const asRecord = (value: unknown): JsonRecord =>
    value && typeof value === "object" ? (value as JsonRecord) : {};

  const asArray = (value: unknown): JsonRecord[] =>
    Array.isArray(value) ? value.map((item) => asRecord(item)) : [];

  switch (metric) {
    case "total-visits":
      return {
        endpoint: "/api/Visit",
        title: "Visit Ledger",
        description: "Latest visit records captured by the field team.",
        normalize(payload: unknown) {
          const rows = asArray(asRecord(payload).data);
          return rows.map((item) => ({
            primary: String(item.ShopName ?? "Unknown Shop"),
            secondary: String(item.EmployeeName ?? item.OwnerName ?? "Unassigned"),
            meta:
              [item.City, item.State]
                .filter((value) => typeof value === "string" && value)
                .join(", ") || "Location pending",
            extra:
              typeof item.VisitedAt === "string"
                ? new Date(item.VisitedAt).toLocaleDateString("en-IN")
                : "Recent",
            status: item.SoldKey ? "Key Sold" : "Visit Only",
          }));
        },
      };
    case "total-retailers":
      return {
        endpoint: "/api/Retailer?page=1&pageSize=8",
        title: "Retailer Portfolio",
        description: "Retailer accounts returned from the live backend.",
        normalize(payload: unknown) {
          const rows = asArray(asRecord(payload).data);
          return rows.map((item) => ({
            primary: String(item.shopName ?? item.ShopName ?? "Retailer"),
            secondary: String(item.ownerName ?? item.OwnerName ?? "Owner pending"),
            meta:
              [item.city ?? item.City, item.state ?? item.State]
                .filter((value) => typeof value === "string" && value)
                .join(", ") || "Location pending",
            extra: String(item.retailerCode ?? item.RetailerCode ?? "No code"),
            status: String(item.status ?? item.Status ?? "Active"),
          }));
        },
      };
    case "monthly-target":
      return {
        endpoint: "/api/Billing",
        title: "Monthly Billing Feed",
        description: "Billing entries supporting the current monthly target view.",
        normalize(payload: unknown) {
          const rows = asArray(payload);
          return rows.slice(0, 8).map((item) => ({
            primary: String(item.shopName ?? item.ShopName ?? "Shop"),
            secondary: String(item.ownerName ?? item.OwnerName ?? "Owner pending"),
            meta: String(item.paymentMode ?? item.PaymentMode ?? "Mode pending"),
            extra: String(item.billingDate ?? item.BillingDate ?? "Date pending"),
            status:
              item.billingAmount ?? item.BillingAmount
                ? `₹${String(item.billingAmount ?? item.BillingAmount)}`
                : "Amount pending",
          }));
        },
      };
    case "target-achieved":
      return {
        endpoint: "/api/Visit",
        title: "Achieved Target Signals",
        description: "Visits with successful key-sale outcomes contributing toward target achievement.",
        normalize(payload: unknown) {
          const rows = asArray(asRecord(payload).data).filter((item) => Boolean(item.SoldKey));
          return rows.slice(0, 8).map((item) => ({
            primary: String(item.ShopName ?? "Shop"),
            secondary: String(item.EmployeeName ?? "Field staff"),
            meta:
              [item.City, item.State]
                .filter((value) => typeof value === "string" && value)
                .join(", ") || "Location pending",
            extra:
              typeof item.VisitedAt === "string"
                ? new Date(item.VisitedAt).toLocaleDateString("en-IN")
                : "Recent",
            status: "Achieved",
          }));
        },
      };
    case "remaining-target":
      return {
        endpoint: "/api/Billing",
        title: "Remaining Target Pipeline",
        description: "Billing activity that still needs follow-through to close the gap.",
        normalize(payload: unknown) {
          const rows = asArray(payload);
          return rows.slice(0, 8).map((item) => ({
            primary: String(item.shopName ?? item.ShopName ?? "Shop"),
            secondary: String(item.deviceDetails ?? item.DeviceDetails ?? "Device pending"),
            meta: String(item.paymentMode ?? item.PaymentMode ?? "Mode pending"),
            extra: String(item.billingDate ?? item.BillingDate ?? "Date pending"),
            status: item.isRebilling ?? item.IsRebilling ? "Re-Billing" : "Primary Billing",
          }));
        },
      };
    default:
      return null;
  }
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ metric: string }> },
) {
  const { metric } = await context.params;
  const config = getMetricConfig(metric);

  if (!config) {
    return NextResponse.json({ message: "Unknown dashboard metric" }, { status: 404 });
  }

  const authToken = (await cookies()).get("auth_token")?.value;
  if (!authToken) {
    return NextResponse.json({ message: "Sign in again to load dashboard details." }, { status: 401 });
  }

  let lastMessage = "Unable to load dashboard data.";

  for (const baseUrl of getBackendBaseUrls()) {
    try {
      if (baseUrl.startsWith("https://")) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      }

      const response = await fetch(`${baseUrl}${config.endpoint}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (response.status === 401) {
        return NextResponse.json(
          { message: "Your session expired. Please sign in again." },
          { status: 401 },
        );
      }

      if (!response.ok) {
        lastMessage = `Backend responded with ${response.status}.`;
        continue;
      }

      const payload = await response.json().catch(() => null);
      return NextResponse.json({
        title: config.title,
        description: config.description,
        items: config.normalize(payload),
      });
    } catch {
      lastMessage = `Unable to connect to ${baseUrl}${config.endpoint}`;
    }
  }

  return NextResponse.json({ message: lastMessage }, { status: 502 });
}
