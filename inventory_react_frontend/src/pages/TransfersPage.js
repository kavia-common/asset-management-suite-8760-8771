import React, { useMemo, useState } from "react";
import { Modal } from "../components/Modal";

/**
 * PUBLIC_INTERFACE
 * Transfers workflow UI (demo-local until backend provides endpoints).
 */
export function TransfersPage() {
  const [transfers, setTransfers] = useState([
    { id: "T-2001", assetTag: "LAP-5420-001", from: "IT Stock", to: "jane@company.com", status: "Pending" },
    { id: "T-2002", assetTag: "DESK-400-010", from: "john@company.com", to: "mark@company.com", status: "Approved" },
  ]);

  const [query, setQuery] = useState("");
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState({ assetTag: "", from: "", to: "" });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return transfers;
    return transfers.filter(
      (t) =>
        t.id.toLowerCase().includes(q) ||
        t.assetTag.toLowerCase().includes(q) ||
        t.from.toLowerCase().includes(q) ||
        t.to.toLowerCase().includes(q) ||
        t.status.toLowerCase().includes(q)
    );
  }, [transfers, query]);

  function approve(id) {
    setTransfers((prev) => prev.map((t) => (t.id === id ? { ...t, status: "Approved" } : t)));
  }

  function reject(id) {
    setTransfers((prev) => prev.map((t) => (t.id === id ? { ...t, status: "Rejected" } : t)));
  }

  function openNew() {
    setDraft({ assetTag: "", from: "IT Stock", to: "" });
    setCreating(true);
  }

  function submit() {
    const id = `T-${Math.floor(2000 + Math.random() * 8000)}`;
    setTransfers((prev) => [{ id, ...draft, status: "Pending" }, ...prev]);
    setCreating(false);
  }

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="card">
        <div className="cardHeader">
          <div className="cardTitle">Transfers</div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <input
              className="input"
              style={{ width: 260 }}
              placeholder="Search transfers..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btnPrimary" onClick={openNew}>New transfer</button>
          </div>
        </div>

        <div className="cardBody">
          <div className="tableWrap">
            <table className="table" aria-label="Transfers table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Asset tag</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Status</th>
                  <th style={{ width: 220 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t.id}>
                    <td><strong>{t.id}</strong></td>
                    <td>{t.assetTag}</td>
                    <td>{t.from}</td>
                    <td>{t.to}</td>
                    <td>
                      <span className={`badge ${
                        t.status === "Approved" ? "badgePrimary" : t.status === "Rejected" ? "badgeDanger" : "badgeSecondary"
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button className="btn btnSmall" onClick={() => approve(t.id)} disabled={t.status !== "Pending"}>
                          Approve
                        </button>
                        <button className="btn btnSmall btnDanger" onClick={() => reject(t.id)} disabled={t.status !== "Pending"}>
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!filtered.length ? (
                  <tr>
                    <td colSpan={6} style={{ padding: 18, color: "rgba(17,24,39,0.65)", fontWeight: 700 }}>
                      No transfers found.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>

          <div className="help" style={{ marginTop: 10 }}>
            This is a full UX flow (request/approve/reject). Wire to backend transfer endpoints when available.
          </div>
        </div>
      </div>

      {creating ? (
        <Modal
          title="Create transfer request"
          onClose={() => setCreating(false)}
          footer={
            <>
              <button className="btn" onClick={() => setCreating(false)}>Cancel</button>
              <button className="btn btnPrimary" onClick={submit} disabled={!draft.assetTag || !draft.to}>
                Submit
              </button>
            </>
          }
        >
          <div className="field">
            <div className="label">Asset tag</div>
            <input className="input" value={draft.assetTag} onChange={(e) => setDraft({ ...draft, assetTag: e.target.value })} />
            <div className="help">Can be filled by scanning barcode/QR in Scan tool.</div>
          </div>
          <div className="field">
            <div className="label">From</div>
            <input className="input" value={draft.from} onChange={(e) => setDraft({ ...draft, from: e.target.value })} />
          </div>
          <div className="field">
            <div className="label">To (user email)</div>
            <input className="input" value={draft.to} onChange={(e) => setDraft({ ...draft, to: e.target.value })} placeholder="user@company.com" />
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
