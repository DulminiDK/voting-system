"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getToken, getEmail, clearToken } from "@/lib/auth";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = getToken();

    if (token) {
      setLoggedIn(true);
      setEmail(getEmail() || "");
    }
  }, []);

  return (
    <header className="bg-gradient-to-r from-purple-700 to-blue-500 text-white">
      <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          TechPulse<span className="text-yellow-300">Awards</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="hover:underline">
            Home
          </Link>

          <Link href="/categories" className="hover:underline">
            Categories
          </Link>

          <Link href="/leaderboard" className="hover:underline">
            Leaderboard
          </Link>

          <Link href="/about" className="hover:underline">
            About
          </Link>

          {loggedIn ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="bg-white text-purple-700 px-4 py-2 rounded-md font-medium"
              >
                👤 Account
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border text-gray-800 overflow-hidden">
                  <div className="px-4 py-3 border-b text-sm break-all">
                    {email}
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-white text-purple-700 px-4 py-2 rounded-md font-medium"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

function handleLogout() {
  clearToken();

  localStorage.removeItem("vote_email");

  window.location.href = "/";
}
