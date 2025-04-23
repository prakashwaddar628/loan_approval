"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md sticky">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold tracking-wide">
          <h1 className="font-bold">
            <span className="text-blue-200">L</span>oan
            <span className="text-blue-200">P</span>redictor
          </h1>
        </Link>

        <div className="flex gap-6 text-sm font-medium">
          <Link href="/" className="hover:underline hover:text-blue-200">
            Home
          </Link>
          <Link href="/predict" className="hover:underline hover:text-blue-200">
            Predict
          </Link>
          <Link href="/dashboard" className="hover:underline hover:text-blue-200">
            Dashboard
          </Link>
          <Link href="/about" className="hover:underline hover:text-blue-200">
            About
          </Link>
          <Link href="/login" className="hover:underline hover:text-blue-200">
          Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
