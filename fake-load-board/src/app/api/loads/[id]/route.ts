import { NextRequest, NextResponse } from "next/server";
import { loadPostings } from "@/data/loads";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  console.info(`API hit: /api/loads/${resolvedParams.id}`);
  
  try {
    const load = loadPostings.find((l) => l.id === resolvedParams.id);

    if (!load) {
      return NextResponse.json(
        { error: "Load not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ load });
  } catch (error) {
    console.error(`Error in /api/loads/${resolvedParams.id}:`, error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}