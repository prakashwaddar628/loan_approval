"use client";

import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

export default function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8 || password.match(/[a-z]/) === null || password.match(/[A-Z]/) === null || password.match(/[0-9]/) === null ){
      toast.error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return;
    }
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, password }),
      });

      const data = await res.json();
      setIsLoading(false);

      if (res.ok) {
        toast.success("Registration successful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        router.push("/login");
      } else {
        toast.error(data.error || "Registration failed!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[92vh] flex justify-center items-center bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-full max-w-sm overflow-y-hidden"
        >
          <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>

          <label className="block mb-2 text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />

          <label className="block mb-2 text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
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
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />

          <label className="block mb-2 text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="confirm password"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />

          <div className="flex items-center justify-between mb-4 cursor-pointer">
            <label className="flex items-center text-sm">
              <input type="checkbox" required className="mr-2" />
              I agree to the terms & conditions
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {isLoading? "Registering..." : "Register"}
          </button>

          <p className="mt-4 text-center text-sm">
            already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => router.push("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
