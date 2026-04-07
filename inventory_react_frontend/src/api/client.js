import { getSession } from "../state/auth";

/**
 * PUBLIC_INTERFACE
 * Return backend base URL.
 *
 * Uses REACT_APP_API_BASE_URL if provided, otherwise defaults to local dev :3001.
 */
export function getApiBaseUrl() {
  return process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";
}

async function parseJsonSafe(res) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/**
 * PUBLIC_INTERFACE
 * Performs an API request with JSON handling and auth header.
 */
export async function apiRequest(path, { method = "GET", body, headers } = {}) {
  const { token } = getSession();
  const res = await fetch(`${getApiBaseUrl()}${path}`, {
    method,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await parseJsonSafe(res);

  if (!res.ok) {
    const message =
      (data && typeof data === "object" && (data.detail || data.message)) ||
      `Request failed (${res.status})`;
    const err = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

/**
 * PUBLIC_INTERFACE
 * Backend health check.
 */
export function healthCheck() {
  return apiRequest("/", { method: "GET" });
}

/**
 * PUBLIC_INTERFACE
 * Placeholder auth login - requires backend implementation.
 * When backend provides /auth/login, wire it here.
 */
export async function loginMock({ email }) {
  // For demo UX while backend only has "/" route.
  return {
    token: "mock-token",
    user: { id: "demo", email, name: "Demo User" },
    role: "admin",
  };
}
