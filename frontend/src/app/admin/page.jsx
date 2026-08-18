"use client";

import { useEffect, useState } from "react";

import { apiFetch } from "@/lib/api";
import { getToken } from "@/lib/auth";

export default function AdminPage() {
  const token = getToken();

  const [categories, setCategories] = useState([]);

  const [nominees, setNominees] = useState([]);

  const [categoryId, setCategoryId] = useState("");

  const [name, setName] = useState("");

  const [company, setCompany] = useState("");

  useEffect(() => {
    loadCategories();

    loadNominees();
  }, []);

  async function loadCategories() {
    const data = await apiFetch("/categories");

    setCategories(data);
  }

  async function loadNominees() {
    const data = await apiFetch("/admin/nominees", {}, token);

    setNominees(data);
  }

  async function addNominee() {
    await apiFetch(
      "/admin/nominees",

      {
        method: "POST",

        body: JSON.stringify({
          categoryId,
          name,
          company,
        }),
      },

      token,
    );

    alert("Nominee added");

    loadNominees();
  }

  async function deleteNominee(id) {
    if (!confirm("Delete nominee?")) return;

    await apiFetch(
      "/admin/nominees/" + id,

      {
        method: "DELETE",
      },

      token,
    );

    loadNominees();
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* ADD FORM */}

      <div className="bg-white p-6 shadow rounded mb-6">
        <h2 className="font-semibold mb-3">Add Nominee</h2>

        <select
          className="border p-2 block mb-2"
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select Category</option>

          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.title}
            </option>
          ))}
        </select>

        <input
          placeholder="Name"
          className="border p-2 block mb-2"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Company"
          className="border p-2 block mb-2"
          onChange={(e) => setCompany(e.target.value)}
        />

        <button
          onClick={addNominee}
          className="bg-purple-700 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* NOMINEES TABLE */}

      <div className="bg-white p-6 shadow rounded">
        <h2 className="font-semibold mb-3">All Nominees</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>

              <th className="p-2 border">Name</th>

              <th className="p-2 border">Company</th>

              <th className="p-2 border">Category</th>

              <th className="p-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {nominees.map((n) => (
              <tr key={n.id}>
                <td className="p-2 border">{n.id}</td>

                <td className="p-2 border">{n.name}</td>

                <td className="p-2 border">{n.company}</td>

                <td className="p-2 border">{n.category}</td>

                <td className="p-2 border">
                  <button
                    onClick={() => deleteNominee(n.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
