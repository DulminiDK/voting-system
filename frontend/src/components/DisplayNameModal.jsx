"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { setDisplayName } from "@/lib/auth";

export default function DisplayNameModal({ isOpen, onClose, onSaved }) {
  const [displayName, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  async function handleSave() {
    setError("");

    if (!displayName.trim()) {
      setError("Please enter a display name.");
      return;
    }

    try {
      setLoading(true);

      await apiFetch("/auth/display-name", {
        method: "PUT",
        body: JSON.stringify({
          displayName,
        }),
      });

      setDisplayName(displayName.trim());

      onSaved(displayName.trim());
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-2xl font-bold">Choose a Display Name</h2>

        <p className="mt-2 text-gray-600">
          This name will appear with your comments.
        </p>

        <input
          value={displayName}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter display name"
          className="mt-5 w-full rounded-lg border p-3"
        />

        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-lg border px-4 py-2">
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
