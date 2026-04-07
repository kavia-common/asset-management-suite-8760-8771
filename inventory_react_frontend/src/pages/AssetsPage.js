import React, { useMemo, useState } from "react";
import { Modal } from "../components/Modal";

function uid() {
  return Math.random().toString(16).slice(2);
}

/**
 * PUBLIC_INTERFACE
 * Assets CRUD page (demo-local until backend provides endpoints).
 */
export function AssetsPage() {
  const [assets, setAssets] = useState([
    { id: "A-1001", name: "Dell Latitude 5420", tag: "LAP-5420-001", status: "In Stock" },
    { id: "A-1002", name: "HP ProDesk 400", tag: "DESK-400-010", status: "Allocated" },
  ]);

  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return assets;
    return assets.filter(
      (a) =>
        a.id.toLowerCase().includes(q) ||
        a.name.toLowerCase().includes(q) ||
        a.tag.toLowerCase().includes(q) ||
        a.status.toLowerCase().includes(q)
    );
  }, [assets, query]);

  function openNew() {
    setEditing({ id: `A-${Math.floor(1000 + Math.random() * 9000)}`, name: "", tag: "", status: "In Stock" });
  }

  function openEdit(a) {
    setEditing({ ...a });
  }

  function save() {
    setAssets((prev) => {
      const exists = prev.some((p) => p.id === editing.id);
      if (exists) return prev.map((p) => (p.id === editing.id ? editing : p));
      return [{ ...editing, id: editing.id || uid() }, ...prev];
    });
    setEditing(null);
  }

  function remove(id) {
    setAssets((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="card">
        <div className="cardHeader">
          <div className="cardTitle">Assets</div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <input
              className="input"
              style={{ width: 260 }}
              placeholder="Search assets..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btnPrimary" onClick={openNew}>New asset</button>
          </div>
        </div>
        <div className="cardBody">
          <div className="tableWrap">
            <table className="table" aria-label="Assets table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Tag</th>
                  <th>Status</th>
                  <th style={{ width: 160 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id}>
                    <td><strong>{a.id}</strong></td>
                    <td>{a.name}</td>
                    <td>{a.tag}</td>
                    <td>
                      <span className={`badge ${
                        a.status === "Allocated" ? "badgeSecondary" : "badgePrimary"
                      }`}>
                        {a.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button className="btn btnSmall" onClick={() => openEdit(a)}>Edit</button>
                        <button className="btn btnSmall btnDanger" onClick={() => remove(a.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!filtered.length ? (
                  <tr>
                    <td colSpan={5} style={{ padding: 18, color: "rgba(17,24,39,0.65)", fontWeight: 700 }}>
                      No assets match your search.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>

          <div className="help" style={{ marginTop: 10 }}>
            Backend currently exposes only <code>/</code> health check. Once asset CRUD endpoints exist,
            this page will be wired to real API calls.
          </div>
        </div>
      </div>

      {editing ? (
        <Modal
          title={assets.some((a) => a.id === editing.id) ? "Edit asset" : "New asset"}
          onClose={() => setEditing(null)}
          footer={
            <>
              <button className="btn" onClick={() => setEditing(null)}>Cancel</button>
              <button className="btn btnPrimary" onClick={save}>Save</button>
            </>
          }
        >
          <div className="field">
            <div className="label">Asset ID</div>
            <input className="input" value={editing.id} onChange={(e) => setEditing({ ...editing, id: e.target.value })} />
          </div>
          <div className="field">
            <div className="label">Name</div>
            <input className="input" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
          </div>
          <div className="field">
            <div className="label">Tag (barcode/QR)</div>
            <input className="input" value={editing.tag} onChange={(e) => setEditing({ ...editing, tag: e.target.value })} />
            <div className="help">Typically scanned from device label; can be populated via Scan tool.</div>
          </div>
          <div className="field">
            <div className="label">Status</div>
            <select
              className="select"
              value={editing.status}
              onChange={(e) => setEditing({ ...editing, status: e.target.value })}
            >
              <option>In Stock</option>
              <option>Allocated</option>
              <option>Maintenance</option>
              <option>Retired</option>
            </select>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
