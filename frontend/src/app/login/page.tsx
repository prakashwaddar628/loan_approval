"use client";

import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      setLoading(true);

      if (res.ok) {
        // Assuming backend returns something like { success: true }
        console.log("Login successful");
        router.push("/dashboard");
        setLoading(false);
      } else {
        alert(data.error || "Invalid credentials");
        setLoading(false);
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    console.log("Forgot password link clicked");
    // TODO: Redirect to forgot password page
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[92vh] flex justify-center items-center bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-full max-w-sm overflow-y-hidden"
        >
          <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

          <label className="block mb-2 text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="email"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username or email"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />

          <label className="block mb-2 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />

          <div className="flex items-center justify-between mb-4">
            <p
              className="text-blue-600 text-sm cursor-pointer hover:underline"
              onClick={handleForgotPassword}
            >
              Forgot password?
            </p>
          </div>

          <button
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded ${
              loading ? "opacity-50" : "hover:bg-blue-700"
            } transition`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="mt-4 text-center text-sm">
            New user?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => router.push("/register")}
            >
              Create account
            </span>
          </p>
        </form>
      </div>
    </>
  );
}
