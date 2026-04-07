import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginMock } from "../api/client";
import { setSession } from "../state/auth";

/**
 * PUBLIC_INTERFACE
 * Login page. Uses mock login until backend exposes auth endpoints.
 */
export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = useMemo(() => email.trim() && password.trim(), [email, password]);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const session = await loginMock({ email, password });
      setSession(session);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="authShell">
      <div className="authCard">
        <div className="authHeader">
          <div className="brand">
            <div className="brandMark" aria-hidden="true" />
            <div>
              <div className="brandTitle">Inventory Suite</div>
              <div className="help">Ocean Professional</div>
            </div>
          </div>
          <h1 className="authTitle">Sign in</h1>
          <p className="authSubtitle">Access dashboards, assets, transfers and audit logs.</p>
        </div>

        <div className="authBody">
          {error ? <div className="alert alertError" role="alert">{error}</div> : null}

          <form onSubmit={onSubmit}>
            <div className="field">
              <div className="label">Email</div>
              <input
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                placeholder="you@company.com"
              />
            </div>
            <div className="field">
              <div className="label">Password</div>
              <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <div className="help">Demo mode until backend auth endpoints are available.</div>
            </div>

            <button className="btn btnPrimary" type="submit" disabled={!canSubmit || loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
