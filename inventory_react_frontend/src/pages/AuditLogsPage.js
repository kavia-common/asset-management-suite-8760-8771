import React, { useMemo, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * Audit logs viewer (demo-local until backend provides endpoints).
 */
export function AuditLogsPage() {
  const [logs] = useState([
    { ts: "2026-04-07 06:00", actor: "admin@example.com", action: "ASSET_CREATED", detail: "Created asset LAP-5420-001" },
    { ts: "2026-04-07 06:02", actor: "admin@example.com", action: "TRANSFER_REQUESTED", detail: "Transfer LAP-5420-001 to jane@company.com" },
    { ts: "2026-04-07 06:03", actor: "admin@example.com", action: "TRANSFER_APPROVED", detail: "Approved transfer T-2001" },
  ]);

  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return logs;
    return logs.filter(
      (l) =>
        l.ts.toLowerCase().includes(q) ||
        l.actor.toLowerCase().includes(q) ||
        l.action.toLowerCase().includes(q) ||
        l.detail.toLowerCase().includes(q)
    );
  }, [logs, query]);

  return (
    <div className="card">
      <div className="cardHeader">
        <div className="cardTitle">Audit Logs</div>
        <input
          className="input"
          style={{ width: 320 }}
          placeholder="Filter logs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="cardBody">
        <div className="tableWrap">
          <table className="table" aria-label="Audit logs table">
            <thead>
              <tr>
                <th style={{ width: 170 }}>Timestamp</th>
                <th style={{ width: 220 }}>Actor</th>
                <th style={{ width: 180 }}>Action</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l, idx) => (
                <tr key={idx}>
                  <td>{l.ts}</td>
                  <td>{l.actor}</td>
                  <td><span className="badge badgePrimary">{l.action}</span></td>
                  <td>{l.detail}</td>
                </tr>
              ))}
              {!filtered.length ? (
                <tr>
                  <td colSpan={4} style={{ padding: 18, color: "rgba(17,24,39,0.65)", fontWeight: 700 }}>
                    No audit events found.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="help" style={{ marginTop: 10 }}>
          Audit logs should be immutable and queryable by admins. Wire to backend audit endpoints when available.
        </div>
      </div>
    </div>
  );
}
