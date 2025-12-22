import { NextRequest, NextResponse } from "next/server";
import { getPortfolioData } from "@/services/portfolioService";

export async function GET(req: NextRequest) {
  try {
    const data = await getPortfolioData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch portfolio data:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio data" },
      { status: 500 }
    );
  }
}
