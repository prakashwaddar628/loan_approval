"use client";

import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!username) {
      setErrors((prev) => ({ ...prev, username: "Username is required" }));
      return;
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("authToken", data.token);
        console.log("Login successful");
        toast.success("Login successful!",{ 
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
         });
        router.push("/");
      } else {
        toast.error(data.error || "Invalid credentials!",{ 
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
         });
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Something went wrong. Please try again.",{ 
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
  
       });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push("/forgotpassword");
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
            className={`w-full p-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded mb-1`}
          />
          {errors.username && <p className="text-red-500 text-xs italic mb-2">{errors.username}</p>}

          <label className="block mb-2 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className={`w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded mb-1`}
          />
          {errors.password && <p className="text-red-500 text-xs italic mb-2">{errors.password}</p>}

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
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700 cursor-pointer"
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
      <ToastContainer />
    </>
  );
}