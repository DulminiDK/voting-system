import { getToken } from "@/lib/auth";

const API = process.env.NEXT_PUBLIC_API_URL;

if (!API) {
  throw new Error("NEXT_PUBLIC_API_URL is missing. Create .env.local");
}

export async function apiFetch(path, options = {}, token = null) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const authToken = token || getToken();

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const res = await fetch(`${API}${path}`, {
    ...options,
    headers,
    cache: "no-store",
  });

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    const msg =
      data && typeof data === "object" && data.message
        ? data.message
        : `Request failed (${res.status})`;

    throw new Error(msg);
  }

  return data;
}