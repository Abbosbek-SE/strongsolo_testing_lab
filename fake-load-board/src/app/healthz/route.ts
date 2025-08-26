import { NextResponse } from "next/server";

export async function GET() {
  console.info("Health check hit: /healthz");
  
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "strongsolo-load-board",
  });
}