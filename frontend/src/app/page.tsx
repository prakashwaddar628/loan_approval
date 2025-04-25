import Footer from "@/components/Footer";
import Landing from "@/components/Landing";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col max-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow px-4 sm:px-8 py-4 overflow-y-hidden">
        <Landing />
      </main>
      <Footer />
    </div>
  );
}
