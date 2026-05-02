import { headers } from "next/headers";

export async function getServerSession() {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");

  if (!host) {
    return null;
  }

  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (process.env.NODE_ENV === "development" ? "http" : "https");

  const cookie = requestHeaders.get("cookie") ?? "";

  const response = await fetch(`${protocol}://${host}/api/auth/get-session`, {
    headers: { cookie },
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data?.session ? data : null;
}
