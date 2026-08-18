"use client";
import { useState } from "react";

export default function VoteSection({ nominees, onVote, onShowResults }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="bg-white shadow rounded-md mt-8 p-6">
      <h2 className="text-center font-semibold mb-4">VOTE SECTION</h2>

      <div className="grid md:grid-cols-2 gap-3">
        {nominees.map((n) => (
          <label
            key={n.id}
            className={`border rounded px-4 py-3 cursor-pointer flex justify-between items-center
            ${selected === n.id ? "bg-purple-700 text-white" : "bg-gray-50"}
            `}
          >
            <div>
              {n.name} - {n.company}
            </div>

            <input
              type="radio"
              name="vote"
              checked={selected === n.id}
              onChange={() => setSelected(n.id)}
            />
          </label>
        ))}
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button onClick={onShowResults} className="border px-4 py-2 rounded">
          RESULTS
        </button>

        <button
          className="bg-purple-700 text-white px-4 py-2 rounded"
          onClick={() => onVote(selected)}
        >
          VOTE NOW
        </button>

        
      </div>
    </div>
  );
}
