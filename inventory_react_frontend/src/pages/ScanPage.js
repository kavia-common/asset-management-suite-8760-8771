import React, { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * Scanning UX: camera placeholder + manual code entry.
 *
 * For production, integrate a barcode/QR library (e.g., zxing) and optional OCR.
 */
export function ScanPage() {
  const [code, setCode] = useState("");
  const [last, setLast] = useState("");

  function simulateScan() {
    const simulated = `SIM-${Math.floor(100000 + Math.random() * 900000)}`;
    setLast(simulated);
    setCode(simulated);
  }

  return (
    <div className="grid grid2">
      <div className="card">
        <div className="cardHeader">
          <div className="cardTitle">Camera</div>
          <span className="badge badgeSecondary">Placeholder</span>
        </div>
        <div className="cardBody">
          <div
            style={{
              aspectRatio: "16 / 9",
              borderRadius: 16,
              border: "1px dashed rgba(37,99,235,0.45)",
              background: "linear-gradient(180deg, rgba(37,99,235,0.08), rgba(255,255,255,0))",
              display: "grid",
              placeItems: "center",
              padding: 14,
              color: "rgba(17,24,39,0.75)",
              fontWeight: 800,
            }}
          >
            Camera feed will appear here.
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <button className="btn btnPrimary" onClick={simulateScan}>
              Simulate scan
            </button>
            <button className="btn" onClick={() => { setCode(""); setLast(""); }}>
              Clear
            </button>
          </div>

          <div className="help" style={{ marginTop: 10 }}>
            Next: integrate browser camera scanning library and parse QR/barcode payloads.
          </div>
        </div>
      </div>

      <div className="card">
        <div className="cardHeader">
          <div className="cardTitle">Result</div>
        </div>
        <div className="cardBody">
          <div className="field">
            <div className="label">Scanned code</div>
            <input
              className="input"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Scan or paste barcode/QR value"
            />
            <div className="help">
              Use this value in Assets (Tag field) or Transfers (Asset tag).
            </div>
          </div>

          {last ? (
            <div className="alert alertSuccess">
              Captured: <strong>{last}</strong>
            </div>
          ) : (
            <div className="alert">
              No scan yet. Use <strong>Simulate scan</strong> or enter a value manually.
            </div>
          )}

          <div className="help" style={{ marginTop: 10 }}>
            When backend adds lookup endpoints, this page can fetch matching asset details and navigate directly.
          </div>
        </div>
      </div>
    </div>
  );
}
