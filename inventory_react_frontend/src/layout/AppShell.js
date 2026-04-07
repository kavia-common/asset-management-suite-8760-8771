import React, { useEffect, useMemo, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { clearSession, getSession, subscribeAuth } from "../state/auth";

function useAuthSession() {
  const [session, setSessionState] = useState(getSession());
  useEffect(() => subscribeAuth(setSessionState), []);
  return session;
}

const navItems = [
  { to: "/", label: "Dashboard", group: "Overview" },
  { to: "/assets", label: "Assets", group: "Management" },
  { to: "/transfers", label: "Transfers", group: "Management" },
  { to: "/audit", label: "Audit Logs", group: "Security" },
  { to: "/scan", label: "Scan", group: "Tools" },
];

/**
 * PUBLIC_INTERFACE
 * Main app shell with sidebar + topbar.
 */
export function AppShell() {
  const { user, role } = useAuthSession();
  const location = useLocation();
  const navigate = useNavigate();

  const pageTitle = useMemo(() => {
    const match = navItems.find((n) => n.to === location.pathname);
    return match?.label || "Inventory Suite";
  }, [location.pathname]);

  function onLogout() {
    clearSession();
    navigate("/login", { replace: true });
  }

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brandMark" aria-hidden="true" />
          <div>
            <div className="brandTitle">Inventory Suite</div>
            <div className="help">Asset / Inventory Management</div>
          </div>
        </div>

        {["Overview", "Management", "Security", "Tools"].map((group) => (
          <div key={group}>
            <div className="navGroupTitle">{group}</div>
            {navItems
              .filter((n) => n.group === group)
              .map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className={({ isActive }) =>
                    `navItem ${isActive ? "navItemActive" : ""}`
                  }
                  end={n.to === "/"}
                >
                  <span aria-hidden="true">•</span>
                  <span>{n.label}</span>
                </NavLink>
              ))}
          </div>
        ))}
      </aside>

      <main className="main">
        <div className="topbar">
          <div className="topbarTitle">{pageTitle}</div>
          <div className="topbarRight">
            <div className="pill" title="Current role">
              Role: <span className="badge badgePrimary">{role || "unknown"}</span>
            </div>
            <div className="pill" title="Signed in user">
              {user?.email || "anonymous"}
            </div>
            <button className="btn btnSmall" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>

        <Outlet />
      </main>
    </div>
  );
}
