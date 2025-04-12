"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Landing() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/predict')
  };
  return (
    <div className="max-h-screen bg-gray-50">
      <main className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-20">
        {/* Left Hero Content */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
            AI-Powered <span className="text-blue-600">Loan Prediction</span>
          </h2>
          <h3 className="text-xl text-gray-600">With Machine Learning</h3>
          <p className="text-gray-500">
            Predict loan approvals instantly using machine learning models trained on real financial data.
          </p>

          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition hover:cursor-pointer" onClick={handleClick}>
            Start Prediction
          </button>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 mt-10 md:mt-0">
          <Image
            src="/images/loan_landing_page.jpg"
            width={500}
            height={400}
            alt="AI Loan Prediction"
            className="rounded-lg shadow-lg"
          />
        </div>
      </main>
    </div>
  );
}
