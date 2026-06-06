"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await apiFetch("/categories");
        setCategories(data);
      } catch (e) {
        setError(e.message);
      }
    }

    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-purple-700 to-blue-500 text-white">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            TechPulse<span className="text-yellow-300">Awards</span>
          </h1>

          <nav className="space-x-6 text-sm hidden md:block">
            <Link href="/" className="hover:underline">
              Poll
            </Link>

            <span className="cursor-pointer hover:underline">AI</span>
            <span className="cursor-pointer hover:underline">Development</span>
            <span className="cursor-pointer hover:underline">Cloud</span>
          </nav>
        </div>
      </header>

      {/* CONTENT */}

      <main className="max-w-4xl mx-auto mt-10">
        <div className="bg-white shadow rounded-md p-8">
          <h2 className="text-2xl font-semibold mb-2">TechPulse Awards 2026</h2>

          <p className="text-gray-500 mb-6">
            Vote for the most impactful technologies, platforms, and developer
            tools in the global tech community.
          </p>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="space-y-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="border rounded-md p-5 hover:shadow transition"
              >
                <h3 className="font-semibold text-lg mb-1">{cat.title}</h3>

                <p className="text-sm text-gray-500">
                  Vote frequency: {cat.vote_frequency_minutes} minutes
                </p>

                <p className="text-green-600 text-sm mt-1">● Ongoing</p>

                <Link
                  href={`/poll/${cat.slug}`}
                  className="inline-block mt-4 bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 text-sm"
                >
                  Explore Category
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
