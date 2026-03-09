import React from "react";

const CYAN = "#0c8db6";

export default function ScrollBackground() {
  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden"
      style={{ backgroundColor: CYAN }}
      aria-hidden
    />
  );
}
