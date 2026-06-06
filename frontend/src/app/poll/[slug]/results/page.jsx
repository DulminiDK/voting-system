"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

export default function ResultsPage() {
  const { slug } = useParams();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await apiFetch(`/categories/${slug}/results`);
        setData(res);
      } catch (e) {
        setError(e.message);
      }
    }

    load();
  }, [slug]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}

      <header className="bg-gradient-to-r from-purple-700 to-blue-500 text-white">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between">
          <Link href="/" className="font-bold text-xl">
            TechPulse<span className="text-yellow-300">Awards</span>
          </Link>

          <Link
            href={`/poll/${slug}`}
            className="bg-white/20 px-4 py-2 rounded text-sm"
          >
            Back to Poll
          </Link>
        </div>
      </header>

      {/* CONTENT */}

      <main className="max-w-4xl mx-auto mt-8">
        <div className="bg-white p-8 shadow rounded-md">
          <h1 className="text-2xl font-semibold text-center mb-6">Results</h1>

          {error && <div className="text-red-500">{error}</div>}

          {!data ? (
            <div>Loading results...</div>
          ) : (
            <div className="space-y-4">
              {data.results.map((r) => (
                <div key={r.nomineeId}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{r.name}</span>

                    <span>{r.percent}%</span>
                  </div>

                  <div className="bg-gray-200 rounded h-3">
                    <div
                      className="bg-purple-700 h-3 rounded"
                      style={{ width: `${r.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
