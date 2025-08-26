import Link from "next/link";
import { ArrowRight, Truck, DollarSign, MapPin } from "lucide-react";
import { loadPostings } from "@/data/loads";
import { LoadCard } from "@/components/LoadCard";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "StrongSolo Demo Load Board - Home",
  description: "Find freight loads for your trucking business. Browse available loads from trusted brokers.",
};

export default function Home() {
  console.info("Route hit: / (landing page)");
  
  // Show top 3 featured loads
  const featuredLoads = loadPostings.slice(0, 3);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-slate-900 sm:text-6xl">
          StrongSolo Demo Load Board
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Connect carriers with freight loads. Find the perfect load for your truck with our comprehensive load board platform.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/board" className="gap-2">
              View All Loads
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Truck className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Multiple Equipment Types</h3>
          <p className="text-slate-600">
            Dry Van, Reefer, Flatbed, Step Deck, and Power Only loads available.
          </p>
        </div>
        
        <div className="text-center p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <DollarSign className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Competitive Rates</h3>
          <p className="text-slate-600">
            Fair pricing with transparent rate information from verified brokers.
          </p>
        </div>
        
        <div className="text-center p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <MapPin className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Nationwide Coverage</h3>
          <p className="text-slate-600">
            Loads available across all major freight lanes in the United States.
          </p>
        </div>
      </div>

      {/* Featured Loads */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Featured Loads</h2>
          <Button asChild variant="outline">
            <Link href="/board" className="gap-2">
              View All Loads
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {featuredLoads.map((load) => (
            <LoadCard key={load.id} load={load} />
          ))}
        </div>
      </div>
    </div>
  );
}
