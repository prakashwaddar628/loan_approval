"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function Predict() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    no_of_dependents: "",
    education: "",
    self_employed: "",
    income_annum: "",
    loan_amount: "",
    loan_term: "",
    cibil_score: "",
    residential_assets_value: "",
    commercial_assets_value: "",
    luxury_assets_value: "",
    bank_asset_value: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [result, setResult] = useState<string | null>(null);

  const validateField = (name: string, value: string) => {
    let error = "";
    if (value === "") {
      error = "This field is required";
    } else if (!isNaN(Number(value)) && Number(value) < 0) {
      error = "Value must be non-negative";
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: any = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (value === "") {
        newErrors[key] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const dataToSend = {
      ...formData,
      education: formData.education === "Graduate" ? 1 : 0,
      self_employed: formData.self_employed === "Yes" ? 1 : 0,
    };

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const data = await res.json();
      setResult(data.loan_status || "Something went wrong!");
    } catch (err) {
      console.error("Prediction error:", err);
      setResult("Error occurred!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Loan Prediction Form</h1>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Full Name" name="name" type="text" value={formData.name} error={errors.name} onChange={handleChange} />
            <Select label="Gender" name="gender" options={["Male", "Female"]} value={formData.gender} error={errors.gender} onChange={handleChange} />
            <Input label="Number of Dependents" name="no_of_dependents" type="number" value={formData.no_of_dependents} error={errors.no_of_dependents} onChange={handleChange} />
            <Select label="Education" name="education" options={["Graduate", "Not Graduate"]} value={formData.education} error={errors.education} onChange={handleChange} />
            <Select label="Self Employed" name="self_employed" options={["Yes", "No"]} value={formData.self_employed} error={errors.self_employed} onChange={handleChange} />
            <Input label="Income (₹)" name="income_annum" type="number" value={formData.income_annum} error={errors.income_annum} onChange={handleChange} />
            <Input label="Loan Amount (₹)" name="loan_amount" type="number" value={formData.loan_amount} error={errors.loan_amount} onChange={handleChange} />
            <Input label="Loan Term (in months)" name="loan_term" type="number" value={formData.loan_term} error={errors.loan_term} onChange={handleChange} />
            <Input label="CIBIL Score" name="cibil_score" type="number" value={formData.cibil_score} error={errors.cibil_score} onChange={handleChange} />
            <Input label="Residential Asset Value" name="residential_assets_value" type="number" value={formData.residential_assets_value} error={errors.residential_assets_value} onChange={handleChange} />
            <Input label="Commercial Asset Value" name="commercial_assets_value" type="number" value={formData.commercial_assets_value} error={errors.commercial_assets_value} onChange={handleChange} />
            <Input label="Luxury Asset Value" name="luxury_assets_value" type="number" value={formData.luxury_assets_value} error={errors.luxury_assets_value} onChange={handleChange} />
            <Input label="Bank Asset Value" name="bank_asset_value" type="number" value={formData.bank_asset_value} error={errors.bank_asset_value} onChange={handleChange} />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition">
            Submit
          </button>
        </form>

        {result && (
          <div className="mt-6 text-xl font-semibold text-center">
            Prediction Result: {" "}
            <span className={result === "Approved" ? "text-green-600" : "text-red-600"}>{result}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function Input({ label, name, type, value, error, onChange }: any) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full border p-2 rounded ${error ? "border-red-500" : "border-gray-300"}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

function Select({ label, name, options, value, error, onChange }: any) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full border p-2 rounded ${error ? "border-red-500" : "border-gray-300"}`}
      >
        <option value="">-- Select --</option>
        {options.map((opt: string, i: number) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
