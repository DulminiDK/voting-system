"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import {
  Bot,
  Monitor,
  Server,
  Cloud,
  Hammer,
  Globe,
  Trophy,
} from "lucide-react";

const categoryIcons = {
  "Best AI Assistant": {
    icon: Bot,
    bg: "bg-purple-100",
    color: "text-purple-700",
  },
  "Best Frontend Framework": {
    icon: Monitor,
    bg: "bg-red-100",
    color: "text-blue-700",
  },
  "Best Backend Framework": {
    icon: Server,
    bg: "bg-emerald-100",
    color: "text-emerald-700",
  },
  "Best Cloud Platform": {
    icon: Cloud,
    bg: "bg-sky-100",
    color: "text-sky-700",
  },
  "Best Developer Tool": {
    icon: Hammer,
    bg: "bg-orange-100",
    color: "text-orange-700",
  },
  "Best Open Source Project": {
    icon: Globe,
    bg: "bg-green-100",
    color: "text-green-700",
  },
};

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

      {/* CONTENT */}

      <main className="max-w-4xl mx-auto mt-10">
        <div className="bg-white shadow rounded-md p-8">
          <h2 className="text-2xl font-semibold mb-2">Award Categories</h2>

          <p className="text-gray-500 mb-6">
            Explore the active award categories and cast your vote for the
            technologies shaping the future of software development.
          </p>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="space-y-4">
            {categories.map((cat) => {
              const category = categoryIcons[cat.title];

              const Icon = category?.icon || Trophy;
              const bgColor = category?.bg || "bg-gray-100";
              const iconColor = category?.color || "text-gray-700";

              return (
                <div
                  key={cat.id}
                  className="border rounded-md p-5 hover:shadow transition"
                >
                  <h3 className="flex items-center gap-3 text-lg font-semibold mb-1">
                    <div
                      className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center`}
                    >
                      <Icon className={`w-6 h-6 ${iconColor}`} />
                    </div>

                    <span className="text-lg font-semibold">{cat.title}</span>
                  </h3>

                  <p className="text-sm text-gray-500">
                    Voting interval: 1 hour
                  </p>

                  <p className="text-green-800 text-sm mt-1">🟢 Live</p>

                  <Link
                    href={`/poll/${cat.slug}`}
                    className="inline-block mt-4 bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 text-sm"
                  >
                    Explore Category
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
