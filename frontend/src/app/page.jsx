"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export default function HomePage() {
  const [stats, setStats] = useState({
    categories: 0,
    nominees: 0,
    votes: 0,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await apiFetch("/categories/statistics");
        setStats(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadStats();
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center">
        <h1 className="text-5xl font-bold">TechPulse Awards 2026</h1>

        <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
          A community-driven platform recognizing the most impactful
          technologies, frameworks, cloud platforms, and developer tools.
        </p>

        <section className="mt-20">
          <h2 className="text-2xl font-bold text-center">
            📊 Platform Statistics
          </h2>

          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mt-8">
            {/* Categories */}
            <div className="bg-gradient-to-r from-purple-400 to-blue-400 p-[2px] rounded-xl shadow">
              <div className="bg-white rounded-[10px] p-5 text-center h-full">
                <div className="text-2xl">🏆</div>
                <p className="text-3xl font-bold mt-2">{stats.categories}</p>
                <p className="text-gray-500 text-sm">Categories</p>
              </div>
            </div>

            {/* Nominees */}
            <div className="bg-gradient-to-r from-purple-400 to-blue-400 p-[2px] rounded-xl shadow">
              <div className="bg-white rounded-[10px] p-5 text-center h-full">
                <div className="text-2xl">💻</div>
                <p className="text-3xl font-bold mt-2">{stats.nominees}</p>
                <p className="text-gray-500 text-sm">Nominees</p>
              </div>
            </div>

            {/* Votes */}
            <div className="bg-gradient-to-r from-purple-400 to-blue-400 p-[2px] rounded-xl shadow">
              <div className="bg-white rounded-[10px] p-5 text-center h-full">
                <div className="text-2xl">🗳️</div>
                <p className="text-3xl font-bold mt-2">{stats.votes}</p>
                <p className="text-gray-500 text-sm">Votes Cast</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Why TechPulse Awards?</h2>

            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              A secure, community-driven platform designed to recognize the
              technologies powering modern software development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-4xl mb-4">🔐</div>

              <h3 className="font-semibold text-lg">Secure OTP Login</h3>

              <p className="text-gray-600 mt-2 text-sm">
                Passwordless authentication using one-time passwords delivered
                to your email.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-4xl mb-4">⏱️</div>

              <h3 className="font-semibold text-lg">Fair Voting</h3>

              <p className="text-gray-600 mt-2 text-sm">
                Vote once per category every hour, preventing spam while
                encouraging community participation.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-4xl mb-4">📈</div>

              <h3 className="font-semibold text-lg">Live Rankings</h3>

              <p className="text-gray-600 mt-2 text-sm">
                Watch rankings update dynamically as the community casts votes.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-4xl mb-4">💬</div>

              <h3 className="font-semibold text-lg">Community Discussions</h3>

              <p className="text-gray-600 mt-2 text-sm">
                Join discussions, share opinions, and interact with other
                technology enthusiasts.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold">🔥 Featured Categories</h2>

            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Discover some of the most popular award categories and vote for
              the technologies shaping the future of software development.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {/* AI */}
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition">
              <div className="text-5xl mb-5">🤖</div>

              <h3 className="text-xl font-semibold">Best AI Assistant</h3>

              <p className="text-gray-600 mt-3">
                Recognizing the AI assistants transforming productivity,
                development, and everyday work.
              </p>
            </div>

            {/* Frontend */}
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition">
              <div className="text-5xl mb-5">💻</div>

              <h3 className="text-xl font-semibold">Best Frontend Framework</h3>

              <p className="text-gray-600 mt-3">
                Vote for the framework delivering the best developer experience
                and modern web applications.
              </p>
            </div>

            {/* Cloud */}
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition">
              <div className="text-5xl mb-5">☁️</div>

              <h3 className="text-xl font-semibold">Best Cloud Platform</h3>

              <p className="text-gray-600 mt-3">
                Celebrating cloud platforms that power scalable, reliable, and
                innovative applications.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/categories"
              className="inline-block bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition"
            >
              Explore All Categories →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
