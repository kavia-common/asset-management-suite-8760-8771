import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AppShell } from "./layout/AppShell";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { AssetsPage } from "./pages/AssetsPage";
import { TransfersPage } from "./pages/TransfersPage";
import { AuditLogsPage } from "./pages/AuditLogsPage";
import { ScanPage } from "./pages/ScanPage";

/**
 * PUBLIC_INTERFACE
 * App entry with routing.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="assets" element={<AssetsPage />} />
          <Route path="transfers" element={<TransfersPage />} />
          <Route path="audit" element={<AuditLogsPage />} />
          <Route path="scan" element={<ScanPage />} />
        </Route>

        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
