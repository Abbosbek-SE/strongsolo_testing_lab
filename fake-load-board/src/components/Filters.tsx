"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import type { Equipment } from "@/data/loads";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const EQUIPMENT_OPTIONS: Equipment[] = [
  "Dry Van",
  "Reefer", 
  "Flatbed",
  "Step Deck",
  "Power Only",
];

export function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [equipment, setEquipment] = useState<string>(
    searchParams.get("equipment") || ""
  );
  const [origin, setOrigin] = useState(searchParams.get("origin") || "");
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );

  // Debounce function
  useEffect(() => {
    const timer = setTimeout(() => {
      updateUrl();
    }, 300);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [equipment, origin, destination]);

  const updateUrl = () => {
    const params = new URLSearchParams();
    
    if (equipment) params.set("equipment", equipment);
    if (origin) params.set("origin", origin);
    if (destination) params.set("destination", destination);
    
    // Reset to page 1 when filters change
    if (equipment || origin || destination) {
      params.set("page", "1");
    }

    const paramString = params.toString();
    router.push(`/board${paramString ? `?${paramString}` : ""}`);
  };

  const clearFilters = () => {
    setEquipment("");
    setOrigin("");
    setDestination("");
    router.push("/board");
  };

  const hasFilters = equipment || origin || destination;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Search className="h-5 w-5 text-slate-600" />
        <h2 className="text-lg font-semibold">Filter Loads</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-4">
        <div>
          <label htmlFor="equipment" className="block text-sm font-medium text-slate-700 mb-1">
            Equipment Type
          </label>
          <Select
            id="equipment"
            value={equipment}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setEquipment(e.target.value)}
          >
            <option value="">All Equipment</option>
            {EQUIPMENT_OPTIONS.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label htmlFor="origin" className="block text-sm font-medium text-slate-700 mb-1">
            Origin
          </label>
          <Input
            id="origin"
            type="text"
            placeholder="Search origin..."
            value={origin}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrigin(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-slate-700 mb-1">
            Destination
          </label>
          <Input
            id="destination"
            type="text"
            placeholder="Search destination..."
            value={destination}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDestination(e.target.value)}
          />
        </div>

        <div className="flex items-end">
          {hasFilters && (
            <Button
              type="button"
              variant="outline"
              onClick={clearFilters}
              className="w-full"
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}