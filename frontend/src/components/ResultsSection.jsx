"use client";

import { useEffect, useState } from "react";

export default function ResultsSection({ results }) {
  const [animatedResults, setAnimatedResults] = useState([]);

  useEffect(() => {
    // trigger animation after render
    const timeout = setTimeout(() => {
      setAnimatedResults(results);
    }, 200);

    return () => clearTimeout(timeout);
  }, [results]);

  return (
    <div className="bg-white shadow rounded-md mt-8 p-6">
      <h2 className="text-center font-semibold mb-6">LIVE RANKING</h2>

      <div className="space-y-4">
        {animatedResults.map((r, index) => {
          const rank = index + 1;

          return (
            <div key={r.nomineeId} className="border rounded-lg p-4">
              {/* Top row */}

              <div className="flex justify-between mb-2">
                <div className="flex gap-3 items-center">
                  {/* Rank */}

                  <div
                    className={`

                    w-7 h-7 flex items-center justify-center
                    text-white rounded

                    ${rank === 1 && "bg-yellow-500"}
                    ${rank === 2 && "bg-gray-400"}
                    ${rank === 3 && "bg-orange-500"}
                    ${rank > 3 && "bg-purple-700"}

                  `}
                  >
                    {rank}
                  </div>

                  {/* Name */}

                  <div className="font-medium">
                    {r.name}

                    {r.country && (
                      <span className="text-gray-500 ml-2 text-sm">
                        {r.country}
                      </span>
                    )}
                  </div>
                </div>

                {/* Vote info */}

                <div className="text-sm text-gray-600">
                  {r.votes} votes • {r.percent}%
                </div>
              </div>

              {/* Progress bar */}

              <div className="bg-gray-200 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-purple-700 h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${r.percent}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
