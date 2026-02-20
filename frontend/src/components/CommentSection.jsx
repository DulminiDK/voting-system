"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { getToken } from "@/lib/auth";

export default function CommentSection({ slug, categoryId }) {
  const [comments, setComments] = useState([]);

  const [text, setText] = useState("");

  const [replyText, setReplyText] = useState("");

  const [replyTo, setReplyTo] = useState(null);

  const token = getToken();

  async function load() {
    const res = await apiFetch(`/comments/${slug}`);

    setComments(res);
  }

  useEffect(() => {
    load();
  }, []);

  async function addComment(parentId = null) {
    if (!token) {
      alert("Login required");

      return;
    }

    const content = parentId ? replyText : text;

    if (!content) return;

    await apiFetch(
      "/comments",

      {
        method: "POST",

        body: JSON.stringify({
          categoryId,
          content,
          parentId,
        }),
      },

      token,
    );

    setText("");

    setReplyText("");

    setReplyTo(null);

    load();
  }

  const parentComments = comments.filter((c) => !c.parent_id);

  const getReplies = (id) => comments.filter((c) => c.parent_id === id);

  return (
    <div className="bg-white shadow rounded-md mt-8 p-6">
      <h2 className="font-semibold mb-4">Comments</h2>

      {/* Add comment */}

      <textarea
        className="w-full border rounded p-2"
        placeholder="Add comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={() => addComment()}
        className="bg-purple-700 text-white px-4 py-2 mt-2 rounded"
      >
        Submit
      </button>

      {/* Comments */}

      <div className="mt-6 space-y-6">
        {parentComments.map((comment) => (
          <div key={comment.id} className="border p-3 rounded">
            <div className="text-sm text-gray-500">{comment.email}</div>

            <div className="mt-1">{comment.content}</div>

            {/* Reply button */}

            <button
              onClick={() => setReplyTo(comment.id)}
              className="text-purple-600 text-sm mt-2"
            >
              Reply
            </button>

            {/* Reply box */}

            {replyTo === comment.id && (
              <div className="mt-2">
                <textarea
                  className="w-full border rounded p-2"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />

                <button
                  onClick={() => addComment(comment.id)}
                  className="bg-purple-700 text-white px-3 py-1 mt-1 rounded"
                >
                  Submit Reply
                </button>
              </div>
            )}

            {/* Replies */}

            <div className="ml-6 mt-4 space-y-3">
              {getReplies(comment.id).map((reply) => (
                <div key={reply.id} className="border p-2 rounded bg-gray-50">
                  <div className="text-sm text-gray-500">{reply.email}</div>

                  <div>{reply.content}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
