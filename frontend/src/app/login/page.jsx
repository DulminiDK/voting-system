"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { setEmail, setToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState("email"); // "email" | "otp"
  const [email, setEmailState] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  async function requestOtp() {
    setMsg(null);
    setLoading(true);
    try {
      await apiFetch("/auth/request-otp", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setEmail(email);
      setStep("otp");
      setMsg(
        "OTP sent. Check Ethereal inbox (or backend console if MAIL_CONSOLE=1).",
      );
    } catch (e) {
      setMsg(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp() {
    setMsg(null);
    setLoading(true);
    try {
      const res = await apiFetch("/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ email, otp }),
      });

      setToken(res.token);
      setMsg("Login success!");
      router.push("/");
    } catch (e) {
      setMsg(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white shadow p-6">
        <h1 className="text-2xl font-semibold">Login to Vote</h1>
        <p className="text-sm text-gray-600 mt-1">
          Enter your email, receive OTP, then verify.
        </p>

        {msg && (
          <div className="mt-4 rounded-lg bg-gray-100 p-3 text-sm">{msg}</div>
        )}

        {step === "email" ? (
          <div className="mt-6 space-y-3">
            <label className="text-sm font-medium">Email</label>
            <input
              className="w-full rounded-lg border p-3"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmailState(e.target.value)}
            />

            <button
              className="w-full rounded-lg bg-purple-700 text-white p-3 font-medium disabled:opacity-60"
              onClick={requestOtp}
              disabled={loading || !email.includes("@")}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            <div className="text-sm text-gray-700">
              OTP sent to <b>{email}</b>
            </div>

            <label className="text-sm font-medium">OTP (6 digits)</label>
            <input
              className="w-full rounded-lg border p-3 tracking-widest"
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              className="w-full rounded-lg bg-purple-700 text-white p-3 font-medium disabled:opacity-60"
              onClick={verifyOtp}
              disabled={loading || otp.length !== 6}
            >
              {loading ? "Verifying..." : "Verify & Login"}
            </button>

            <button
              className="w-full rounded-lg border p-3 text-sm"
              onClick={() => setStep("email")}
              disabled={loading}
            >
              Change email
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
