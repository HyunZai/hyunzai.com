import { NextRequest, NextResponse } from "next/server";
import { saveInquiry } from "@/services/inquiryService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "이름, 이메일, 메시지는 필수 입력 항목입니다." },
        { status: 400 }
      );
    }

    await saveInquiry({ name, email, message });

    return NextResponse.json(
      { message: "문의가 성공적으로 접수되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to save inquiry:", error);
    return NextResponse.json(
      { error: "문의 접수 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
