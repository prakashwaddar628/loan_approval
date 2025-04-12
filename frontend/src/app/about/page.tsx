"use client";

import Navbar from "@/components/Navbar";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
          About Our Project
        </h1>

        {/* Project Description */}
        <section className="mb-12 text-gray-700 space-y-4">
          <p>
            Our project is an <strong>AI-powered Loan Approval Prediction System</strong>
            built with modern machine learning technologies. It helps financial
            institutions assess loan applications more efficiently by predicting
            approval status based on real-world financial indicators.
          </p>
          <p>
            The system is designed to be user-friendly, transparent, and
            scalable — integrating both frontend and backend technologies
            with a trained ML model to ensure fast, real-time predictions.
          </p>
          <p>
            This project was developed as a collaborative effort among three
            passionate developers, aiming to bring smart automation into the
            finance domain.
          </p>
        </section>

        {/* Team Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Meet the Developers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Dev 1", "Dev 2", "Dev 3"].map((dev, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow text-center"
              >
                <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full mb-4" />
                <h3 className="text-lg font-bold text-gray-800">{dev}</h3>
                <p className="text-sm text-gray-600">Full Stack Developer</p>
                <p className="text-xs text-gray-500 mt-2">
                  Passionate about AI, ML, and impactful tech solutions.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Note */}
        <div className="text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Loan Approval Prediction System. All rights reserved.
        </div>
      </div>
    </div>
  );
}
