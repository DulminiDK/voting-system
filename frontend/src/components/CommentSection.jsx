"use client";

import { useEffect, useState } from "react";

import { apiFetch } from "@/lib/api";
import { getToken, getDisplayName } from "@/lib/auth";

import DisplayNameModal from "./DisplayNameModal";
import { timeAgo } from "@/lib/time";
import { organizeComments } from "@/lib/comments";

export default function CommentSection({ categoryId, slug }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showDisplayModal, setShowDisplayModal] = useState(false);

  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const loggedIn = !!getToken();
  const [displayName, setDisplayNameState] = useState(getDisplayName());

  useEffect(() => {
    loadComments();
  }, []);

  async function loadComments() {
    try {
      const data = await apiFetch(`/comments/${slug}`);
      setComments(organizeComments(data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handlePost() {
    if (!loggedIn) return;

    if (!displayName) {
      setShowDisplayModal(true);
      return;
    }

    if (!comment.trim()) {
      return;
    }

    try {
      setSaving(true);

      await apiFetch("/comments", {
        method: "POST",
        body: JSON.stringify({
          categoryId,
          content: comment.trim(),
          parentId: null,
        }),
      });

      setComment("");
      await loadComments();
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleReply(parentId) {
    if (!replyText.trim()) return;

    try {
      await apiFetch("/comments", {
        method: "POST",
        body: JSON.stringify({
          categoryId,
          content: replyText.trim(),
          parentId,
        }),
      });

      setReplyText("");
      setReplyTo(null);

      await loadComments();
    } catch (err) {
      alert(err.message);
    }
  }

  function getInitial(name) {
    if (!name) return "?";

    return name.trim().charAt(0).toUpperCase();
  }

  return (
    <section className="mt-20 border-t pt-12">
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          💬 Community Discussion
        </h2>

        <p className="mt-2 text-gray-500">
          Share your thoughts and discuss this category with the community.
        </p>
      </div>

      {/* Comment Form */}
      {!loggedIn ? (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center">
          <div className="text-3xl">🔐</div>

          <h3 className="mt-3 font-semibold text-gray-900">
            Join the discussion
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Sign in to share your thoughts and reply to comments.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 font-semibold text-white">
              {getInitial(displayName)}
            </div>

            <div>
              <p className="text-xs text-gray-500">Commenting as</p>

              <p className="font-semibold text-gray-900">
                {displayName || "Choose a display name"}
              </p>
            </div>
          </div>

          <textarea
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about this category..."
            className="w-full resize-none rounded-lg border border-gray-200 p-3 text-sm outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
          />

          <div className="mt-3 flex justify-end">
            <button
              onClick={handlePost}
              disabled={saving || !comment.trim()}
              className="rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </div>
      )}

      {/* Comments */}
      <div className="mt-10">
        {loading ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
            <p className="text-sm text-gray-500">Loading discussion...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center">
            <div className="text-4xl">💬</div>

            <h3 className="mt-3 font-semibold text-gray-800">
              No comments yet
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Be the first to start the discussion!
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {comments.map((comment) => {
              const author = comment.display_name || comment.email;

              return (
                <article
                  key={comment.id}
                  className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  {/* Comment Header */}
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 font-semibold text-white">
                      {getInitial(author)}
                    </div>

                    <div className="min-w-0">
                      <h4 className="font-semibold text-gray-900">{author}</h4>

                      <p className="text-xs text-gray-500">
                        {timeAgo(comment.created_at)}
                      </p>
                    </div>
                  </div>

                  {/* Comment Content */}
                  <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-6 text-gray-700">
                    {comment.content}
                  </p>

                  {/* Comment Actions */}
                  <div className="mt-4">
                    <button
                      onClick={() =>
                        setReplyTo(replyTo === comment.id ? null : comment.id)
                      }
                      className="text-sm font-medium text-gray-500 transition hover:text-purple-600"
                    >
                      ↩ Reply
                    </button>
                  </div>

                  {/* Reply Form */}
                  {replyTo === comment.id && (
                    <div className="mt-4 rounded-lg bg-gray-50 p-4">
                      <textarea
                        rows={3}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write a reply..."
                        className="w-full resize-none rounded-lg border border-gray-200 bg-white p-3 text-sm outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                      />

                      <div className="mt-3 flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setReplyTo(null);
                            setReplyText("");
                          }}
                          className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 transition hover:bg-white"
                        >
                          Cancel
                        </button>

                        <button
                          onClick={() => handleReply(comment.id)}
                          disabled={!replyText.trim()}
                          className="rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Post Reply
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Replies */}
                  {comment.replies?.length > 0 && (
                    <div className="mt-6 ml-4 border-l-2 border-purple-100 pl-5 sm:ml-8">
                      <div className="space-y-4">
                        {comment.replies.map((reply) => {
                          const replyAuthor = reply.display_name || reply.email;

                          return (
                            <div
                              key={reply.id}
                              className="rounded-lg bg-gray-50 p-4"
                            >
                              <div className="flex items-start gap-3">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-blue-400 text-sm font-semibold text-white">
                                  {getInitial(replyAuthor)}
                                </div>

                                <div className="min-w-0">
                                  <h5 className="text-sm font-semibold text-gray-900">
                                    {replyAuthor}
                                  </h5>

                                  <p className="text-xs text-gray-500">
                                    {timeAgo(reply.created_at)}
                                  </p>
                                </div>
                              </div>

                              <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-gray-700">
                                {reply.content}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Display Name Modal */}
      <DisplayNameModal
        isOpen={showDisplayModal}
        onClose={() => setShowDisplayModal(false)}
        onSaved={(savedDisplayName) => {
          setDisplayNameState(savedDisplayName);
          setShowDisplayModal(false);
        }}
      />
    </section>
  );
}
