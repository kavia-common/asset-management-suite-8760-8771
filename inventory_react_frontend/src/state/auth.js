/**
 * Minimal auth store using localStorage.
 * Backend OpenAPI currently only exposes "/" health; this store is ready for real auth endpoints.
 */

const STORAGE_KEY = "ims_auth";

/**
 * PUBLIC_INTERFACE
 * Returns current auth session.
 */
export function getSession() {
  /** @type {{token: string|null, user: any|null, role: string|null}} */
  const empty = { token: null, user: null, role: null };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw);
    return {
      token: parsed?.token ?? null,
      user: parsed?.user ?? null,
      role: parsed?.role ?? null,
    };
  } catch {
    return empty;
  }
}

/**
 * PUBLIC_INTERFACE
 * Saves session to localStorage.
 */
export function setSession(session) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event("ims_auth_changed"));
}

/**
 * PUBLIC_INTERFACE
 * Clears session.
 */
export function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("ims_auth_changed"));
}

/**
 * PUBLIC_INTERFACE
 * Subscribes to session changes.
 */
export function subscribeAuth(callback) {
  const handler = () => callback(getSession());
  window.addEventListener("ims_auth_changed", handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("ims_auth_changed", handler);
    window.removeEventListener("storage", handler);
  };
}
