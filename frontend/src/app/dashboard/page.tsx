"use client";

import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Prediction = {
  name: string;
  gender: string;
  income: number;
  status: string;
};

export default function Dashboard() {
  const router = useRouter();
  const [recent, setRecent] = useState<Prediction[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Renamed for clarity
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const [fetchError, setFetchError] = useState<string | null>(null); // Added error state
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
  });

  useEffect(() => {
    // Example: Check for a token in local storage
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);

    if (token) {
      fetch("http://127.0.0.1:5000/recent-predictions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          setRecent(data);
          const approved = data.filter(
            (p: Prediction) => p.status === "Approved"
          ).length;
          const rejected = data.filter(
            (p: Prediction) => p.status === "Rejected"
          ).length;
          setStats({
            total: data.length,
            approved,
            rejected,
          });
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch predictions", err);
          setFetchError("Failed to load dashboard data.");
          setIsLoading(false);
        });
    } else {
      setIsLoading(false); // Not logged in, no need to load
    }
  }, []);

  const pieData = [
    { name: "Approved", value: stats.approved },
    { name: "Rejected", value: stats.rejected },
  ];

  const COLORS = ["#16a34a", "#dc2626"];

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-[90vh] text-gray-600 text-lg">
          Loading dashboard data...
        </div>
      </>
    );
  }

  if (fetchError) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-[90vh] text-red-600 text-lg">
          {fetchError} Please try again later.
        </div>
      </>
    );
  }

  if (isLoggedIn) {
    return (
      <>
        <Navbar />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <StatCard
              title="Total Applications"
              value={stats.total}
              color="border-blue-600"
            />
            <StatCard
              title="Approved"
              value={stats.approved}
              color="border-green-600"
            />
            <StatCard
              title="Rejected"
              value={stats.rejected}
              color="border-red-600"
            />
          </div>

          <div className="bg-white rounded-xl shadow p-4 my-4">
            <h2 className="text-lg font-semibold mb-4">
              Approval Distribution
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">Recent Predictions</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left border">
                <thead className="bg-gray-100 font-semibold">
                  <tr>
                    <th className="px-2 py-2">Name</th>
                    <th className="px-2 py-2">Gender</th>
                    <th className="px-2 py-2">Income</th>
                    <th className="px-2 py-2">Status</th>
                  </tr>
                </thead>
              </table>
              <div className="max-h-[220px] overflow-y-scroll">
                <table className="min-w-full text-sm text-left border-t-0">
                  <tbody>
                    {recent.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-2">{item.name}</td>
                        <td className="px-8 py-2">{item.gender}</td>
                        <td className="px-4 py-2">
                          ₹{item.income.toLocaleString()}
                        </td>
                        <td
                          className={`px-4 py-2 font-semibold ${
                            item.status === "Approved"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {item.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-[90vh] text-gray-600 text-lg">
        <p>
          Please{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-600 cursor-pointer hover:underline underline"
          >
            log in
          </span>{" "}
          to view the dashboard.
        </p>
      </div>
    </>
  );
}

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div className={`bg-white shadow rounded-xl p-4 border-l-4 ${color}`}>
      <h2 className="text-sm text-gray-500">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
