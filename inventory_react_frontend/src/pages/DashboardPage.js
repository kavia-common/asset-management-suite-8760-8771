import React, { useEffect, useState } from "react";
import { healthCheck } from "../api/client";

/**
 * PUBLIC_INTERFACE
 * Admin/User dashboard overview.
 */
export function DashboardPage() {
  const [apiStatus, setApiStatus] = useState({ ok: false, loading: true, error: "" });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await healthCheck();
        if (!mounted) return;
        setApiStatus({ ok: true, loading: false, error: "" });
      } catch (e) {
        if (!mounted) return;
        setApiStatus({ ok: false, loading: false, error: e.message || "API error" });
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="grid grid3">
      <div className="card">
        <div className="cardHeader">
          <div className="cardTitle">Backend</div>
          <span className={`badge ${apiStatus.ok ? "badgePrimary" : "badgeDanger"}`}>
            {apiStatus.loading ? "Checking..." : apiStatus.ok ? "Online" : "Offline"}
          </span>
        </div>
        <div className="cardBody">
          <div className="kpiValue">{apiStatus.ok ? "Healthy" : "Needs attention"}</div>
          <div className="kpiLabel">
            {apiStatus.ok
              ? "Connected to API successfully."
              : apiStatus.error || "Could not reach backend."}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="cardHeader">
          <div className="cardTitle">Assets</div>
          <span className="badge badgeSecondary">Demo</span>
        </div>
        <div className="cardBody">
          <div className="kpiValue">—</div>
          <div className="kpiLabel">Will show totals once backend asset endpoints are available.</div>
        </div>
      </div>

      <div className="card">
        <div className="cardHeader">
          <div className="cardTitle">Transfers</div>
          <span className="badge badgeSecondary">Demo</span>
        </div>
        <div className="cardBody">
          <div className="kpiValue">—</div>
          <div className="kpiLabel">Will show pending approvals and recent transfers.</div>
        </div>
      </div>

      <div className="card" style={{ gridColumn: "1 / -1" }}>
        <div className="cardHeader">
          <div className="cardTitle">Getting started</div>
        </div>
        <div className="cardBody">
          <ol style={{ margin: 0, paddingLeft: 18, color: "rgba(17,24,39,0.82)", fontWeight: 650 }}>
            <li>Go to <strong>Assets</strong> to create/edit devices and inventory items.</li>
            <li>Use <strong>Transfers</strong> to request/approve handovers between users.</li>
            <li>Review <strong>Audit Logs</strong> for immutable activity records.</li>
            <li>Use <strong>Scan</strong> to capture barcode/QR codes (camera integration TBD).</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
