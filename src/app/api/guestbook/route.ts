import { NextRequest, NextResponse } from "next/server";
import { getGuestbooks, createGuestbook } from "@/services/guestbookService";
import { GuestbookDto } from "@/dtos/GuestbookDto";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = parseInt(searchParams.get("offset") || "0");

    const guestbooks = await getGuestbooks(limit, offset);
    return NextResponse.json(guestbooks);
  } catch (error) {
    console.error("Failed to fetch guestbooks:", error);
    return NextResponse.json(
      { error: "Failed to fetch guestbooks" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const guestbookData = new GuestbookDto();

    // Validate required fields (Basic validation)
    // Validate required fields (Content is mandatory)
    if (!body.content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    // Default to Anonymous if nickname is missing
    if (!body.nickname) {
      body.nickname = "Anonymous";
    }

    Object.assign(guestbookData, body);

    const newGuestbook = await createGuestbook(guestbookData);
    return NextResponse.json(newGuestbook, { status: 201 });
  } catch (error) {
    console.error("Failed to create guestbook:", error);
    return NextResponse.json(
      { error: "Failed to create guestbook" },
      { status: 500 }
    );
  }
}
