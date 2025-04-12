import Dashboard from "@/components/Dashboard";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6">
        <Dashboard />
      </div>
    </div>
  );
}
