"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function Predict() {
  const [formData, setFormData] = useState({
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

  const [result, setResult] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setResult(data.loan_status || "Something went wrong!");
    } catch (err) {
      console.error("Prediction error: ", err);
      setResult("Error Occured!");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Loan Prediction Form</h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded-lg shadow"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Number of Dependents" name="no_of_dependents" type="number" onChange={handleChange} />
            <Select label="Education" name="education" options={["Graduate", "Not Graduate"]} onChange={handleChange} />
            <Select label="Self Employed" name="self_employed" options={["Yes", "No"]} onChange={handleChange} />
            <Input label="Income (₹)" name="income_annum" type="number" onChange={handleChange} />
            <Input label="Loan Amount (₹)" name="loan_amount" type="number" onChange={handleChange} />
            <Input label="Loan Term (in months)" name="loan_term" type="number" onChange={handleChange} />
            <Input label="CIBIL Score" name="cibil_score" type="number" onChange={handleChange} />
            <Input label="Residential Asset Value" name="residential_assets_value" type="number" onChange={handleChange} />
            <Input label="Commercial Asset Value" name="commercial_assets_value" type="number" onChange={handleChange} />
            <Input label="Luxury Asset Value" name="luxury_assets_value" type="number" onChange={handleChange} />
            <Input label="Bank Asset Value" name="bank_asset_value" type="number" onChange={handleChange} />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition">Submit</button>
        </form>

        {result && (
          <div className="mt-6 text-xl font-semibold text-center">
            Prediction Result:{" "}
            <span className={result === "Approved" ? "text-green-600":"text-red-600"}>
              {result}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}


function Input({label, name, type, onChange}:any){
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
      <input
      type={type}
      name={name}
      required
      onChange={onChange}
      className="w-full border border-gray-300 p-2 rounded"
      />
    </div>
  )
}

function Select ({label, name, options, onChange}:any){
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
      <select name={name} required onChange={onChange} className="w-full border border-gray-300 p-2 rounded">
        <option value="">--select--</option>
        {options.map((opt: string, i: number)=>(
          <option key={i} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  )
}