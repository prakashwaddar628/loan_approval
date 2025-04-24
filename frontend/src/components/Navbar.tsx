"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleClick = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      localStorage.removeItem("isLoggedIn");
      toast.success("Logged out successfully!");
      router.push("/login");
    } else {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      toast.success("Logged in successfully!");
    }
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md sticky">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-wide">
          <p className="text-orange-500">
            Lend<span className="text-white">Wise</span>
          </p>
        </Link>

        <div className="flex gap-6 text-sm font-medium">
          <Link href="/" className="hover:underline hover:text-blue-200">
            Home
          </Link>
          <Link href="/predict" className="hover:underline hover:text-blue-200">
            Predict
          </Link>
          <Link
            href="/dashboard"
            className="hover:underline hover:text-blue-200"
          >
            Dashboard
          </Link>
          <Link href="/about" className="hover:underline hover:text-blue-200">
            About
          </Link>
          {isLoggedIn ? (
            <button
              onClick={handleClick}
              className="hover:underline hover:text-blue-200"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className="hover:underline hover:text-blue-200">
              Login
            </Link>
          )}
        </div>

      </div>

    </nav>
  );
}