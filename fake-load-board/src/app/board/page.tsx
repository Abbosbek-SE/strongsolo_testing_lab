import { Suspense } from "react";
import type { Metadata } from "next";
import { searchLoads, paginateResults } from "@/lib/search";
import { loadPostings } from "@/data/loads";
import type { Equipment } from "@/data/loads";
import { LoadCard } from "@/components/LoadCard";
import { Filters } from "@/components/Filters";
import { Pagination } from "@/components/Pagination";

export const metadata: Metadata = {
  title: "Load Board - StrongSolo Demo",
  description: "Browse available freight loads. Filter by equipment type, origin, and destination.",
};

interface BoardPageProps {
  searchParams: Promise<{
    equipment?: Equipment;
    origin?: string;
    destination?: string;
    page?: string;
  }>;
}

async function BoardContent({ searchParams }: BoardPageProps) {
  console.info("Route hit: /board (load board listing)");
  const resolvedParams = await searchParams;
  
  const currentPage = parseInt(resolvedParams.page || "1", 10);
  const itemsPerPage = 10;

  // Apply filters
  const filteredLoads = searchLoads(loadPostings, {
    equipment: resolvedParams.equipment,
    origin: resolvedParams.origin,
    destination: resolvedParams.destination,
  });

  // Apply pagination
  const paginatedResult = paginateResults(
    filteredLoads,
    currentPage,
    itemsPerPage
  );

  const { items: loads, totalPages, totalItems } = paginatedResult;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Load Board</h1>
        <p className="text-slate-600">
          Browse available freight loads and find the perfect match for your equipment.
        </p>
      </div>

      <Filters />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">
            {totalItems === 0
              ? "No loads found"
              : `${totalItems} load${totalItems === 1 ? "" : "s"} available`}
          </h2>
        </div>

        {loads.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-slate-500 text-lg mb-2">
              No loads match your current filters.
            </div>
            <div className="text-slate-400">
              Try adjusting your search criteria or clear all filters.
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-6 lg:grid-cols-2">
              {loads.map((load) => (
                <LoadCard key={load.id} load={load} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default function BoardPage({ searchParams }: BoardPageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BoardContent searchParams={searchParams} />
    </Suspense>
  );
}