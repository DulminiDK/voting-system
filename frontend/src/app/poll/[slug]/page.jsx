"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { getToken } from "@/lib/auth";

import AboutPoll from "@/components/AboutPoll";
import VoteSection from "@/components/VoteSection";
import VoteSuccess from "@/components/VoteSuccess";
import ResultsSection from "@/components/ResultsSection";
import CommentSection from "@/components/CommentSection";

export default function PollPage() {
  const { slug } = useParams();
  const token = getToken();
  const [category, setCategory] = useState(null);
  const [nominees, setNominees] = useState([]);
  const [results, setResults] = useState([]);
  const [mode, setMode] = useState("vote");
  // vote | results | success

  const [error, setError] = useState(null);
  const [cooldownActive, setCooldownActive] = useState(false);

  useEffect(() => {
    load();

    const interval = setInterval(() => {
      load();
    }, 5000);

    return () => clearInterval(interval);
  }, [slug]);

  async function load() {
    try {
      const cat = await apiFetch(`/categories/${slug}`);

      setCategory(cat);

      const noms = await apiFetch(`/categories/${slug}/nominees`);

      setNominees(noms);

      const res = await apiFetch(`/categories/${slug}/results`);

      setResults(res.results);

      setCooldownActive(res.cooldownActive);

      if (res.cooldownActive) {
        setMode("results");
      }
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleVote(nomineeId) {
    if (!token) {
      alert("Login required");

      return;
    }

    try {
      await apiFetch(
        "/votes",

        {
          method: "POST",

          body: JSON.stringify({
            categoryId: category.id,

            nomineeId,
          }),
        },

        token,
      );

      setMode("success");

      load();
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* MAIN */}

      <main className="max-w-4xl mx-auto mt-8">
        <div className="bg-white p-8 shadow rounded-md">
          {/* TITLE */}
          <h1 className="text-center text-2xl font-semibold">
            {category?.title}
          </h1>
          {/* ABOUT */}
          <AboutPoll category={category} />
          {/* SWITCH AREA */}
          {cooldownActive && (
            <>
              <ResultsSection results={results} />

              <div className="text-center mt-6">
                <h2 className="text-red-500 font-semibold">Congratulations!</h2>

                <p>Your vote has been counted!</p>

                <p>Please comeback in 1 hour to vote again.</p>
              </div>
            </>
          )}

          {!cooldownActive && mode === "vote" && (
            <VoteSection
              nominees={nominees}
              onVote={handleVote}
              onShowResults={() => setMode("results")}
            />
          )}
          {!cooldownActive && mode === "results" && (
            <>
              <ResultsSection results={results} />

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setMode("vote")}
                  className="bg-purple-700 text-white px-4 py-2 rounded"
                >
                  BACK TO VOTE
                </button>
              </div>
            </>
          )}
          {mode === "success" && !cooldownActive && (
            <VoteSuccess onViewResults={() => setMode("results")} />
          )}
          {cooldownActive && (
            <div className="text-center mt-6">
              <h2 className="text-red-500 font-semibold">
                Your vote has been counted!
              </h2>

              <p>Please comeback in 1 hour to vote again.</p>
            </div>
          )}
          {error && <div className="text-red-500">{error}</div>}

          {category && (
            <CommentSection categoryId={category.id} slug={category.slug} />
          )}
        </div>
      </main>
    </div>
  );
}
