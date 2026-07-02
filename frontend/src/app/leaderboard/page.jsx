"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await apiFetch("/leaderboard");
        setLeaderboard(data);
      } catch (error) {
        console.error(error);
      }
    }

    load();
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">🏆 Global Rankings</h1>

        <p className="text-gray-500 mt-3">
          Updated in real time based on community votes.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {leaderboard.map((category) => (
          <div
            key={category.categoryId}
            className="bg-gradient-to-r from-purple-400 to-blue-400 p-[2px] rounded-xl shadow"
          >
            <div
              className="
    rounded-xl
    p-5
    h-full
    bg-gradient-to-br
    from-purple-50
    via-white
    to-blue-50
  "
            >
              <h2 className="font-bold text-xl mb-5">
                {category.categoryTitle}
              </h2>

              <div className="space-y-4">
                {category.leaders.map((nominee, index) => {
                  const medal = index === 0 ? "🏆" : index === 1 ? "🥈" : "🥉";

                  const borderClass =
                    index === 0
                      ? "border-2 border-yellow-400 bg-yellow-50"
                      : "border";

                  return (
                    <div
                      key={nominee.nomineeId}
                      className={`rounded-lg p-4 ${borderClass}`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold text-lg">
                            {medal} {nominee.name}
                          </div>

                          <div className="text-sm text-gray-500">
                            {nominee.company}
                          </div>
                        </div>

                        <div className="font-medium">{nominee.votes} votes</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
