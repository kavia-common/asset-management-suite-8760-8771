import React, { useEffect } from "react";

/**
 * PUBLIC_INTERFACE
 * Accessible modal with Escape-to-close and overlay click handling.
 */
export function Modal({ title, children, footer, onClose }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="modalOverlay" role="dialog" aria-modal="true" aria-label={title}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <div className="modalTitle">{title}</div>
          <button className="btn btnSmall" onClick={onClose} aria-label="Close dialog">
            Close
          </button>
        </div>
        <div className="modalBody">{children}</div>
        {footer ? <div className="modalFooter">{footer}</div> : null}
      </div>
      <div
        style={{ position: "fixed", inset: 0 }}
        onClick={onClose}
        aria-hidden="true"
      />
    </div>
  );
}
