import { NextRequest, NextResponse } from "next/server";
import { getPortfolioData, savePortfolioData } from "@/services/portfolioService";

export const dynamic = "force-dynamic";

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

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        await savePortfolioData(body);
        return NextResponse.json({ success: true, message: "Saved successfully" });
    } catch (error) {
        console.error("Failed to save portfolio data:", error);
        return NextResponse.json(
            { error: "Failed to save portfolio data" },
            { status: 500 }
        );
    }
}
