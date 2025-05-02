"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Landing() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/predict");
  };
  return (
    <div className="min-h-[580px] bg-blue-50 rounded-4xl shadow-2xl">
      <main className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16 md:py-4">
        {/* Left Hero Content */}
        <div className="md:w-1/2 space-y-4 md:space-y-6 mb-8 md:mb-0">
          {" "}
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
            AI-Powered <span className="text-blue-600">Loan Prediction</span>
          </h2>
          <h3 className="text-lg md:text-xl text-gray-600">
            With Machine Learning
          </h3>
          <p className="text-gray-500 text-sm md:text-base">
            Predict loan approvals instantly using machine learning models
            trained on real financial data.
          </p>
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition hover:cursor-pointer text-base md:text-lg"
            onClick={handleClick}
          >
            Start Prediction
          </button>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2">
          <Image
            src="/images/loan_landing_page.jpg"
            width={500}
            height={400}
            alt="AI Loan Prediction"
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>
      </main>
    </div>
  );
}
