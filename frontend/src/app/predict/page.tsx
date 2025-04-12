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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setFormData((prev)=>({...prev, [name]:value}));
  };

  const handleSubmit = async(e: React.FormEvent)=>{
    e.preventDefault();

    try{
      const res = await fetch("http://127.0.0.1:5000/predict",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setResult(data.loan_status || "Something went wrong!");
    }catch (err){
      console.error("Prediction error: ",err);
      setResult("Error Occured!");
    }
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Loan Prediction Form</h1>

        
      </div>
    </div>
  )
}