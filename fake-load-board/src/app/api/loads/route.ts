import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { loadPostings } from "@/data/loads";
import { searchLoads, paginateResults } from "@/lib/search";
import type { Equipment } from "@/data/loads";

const searchSchema = z.object({
  equipment: z.enum(["Dry Van", "Reefer", "Flatbed", "Step Deck", "Power Only"]).optional(),
  origin: z.string().optional(),
  destination: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
});

export async function GET(request: NextRequest) {
  console.info("API hit: /api/loads");
  
  try {
    const { searchParams } = new URL(request.url);
    
    const validatedParams = searchSchema.parse({
      equipment: searchParams.get("equipment"),
      origin: searchParams.get("origin"),
      destination: searchParams.get("destination"),
      page: searchParams.get("page"),
      limit: searchParams.get("limit"),
    });

    // Apply filters
    const filteredLoads = searchLoads(loadPostings, {
      equipment: validatedParams.equipment as Equipment,
      origin: validatedParams.origin,
      destination: validatedParams.destination,
    });

    // Apply pagination
    const paginatedResult = paginateResults(
      filteredLoads,
      validatedParams.page,
      validatedParams.limit
    );

    return NextResponse.json({
      loads: paginatedResult.items,
      pagination: {
        currentPage: paginatedResult.currentPage,
        totalPages: paginatedResult.totalPages,
        totalItems: paginatedResult.totalItems,
        itemsPerPage: validatedParams.limit,
      },
    });
  } catch (error) {
    console.error("Error in /api/loads:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}