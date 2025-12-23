import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { getAIContextData } from "@/services/aiContextService";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not set" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // RAG: DB에서 컨텍스트 데이터 조회
    const contextData = await getAIContextData();

    const genAI = new GoogleGenerativeAI(apiKey);

    // System Instruction에 컨텍스트 주입
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      systemInstruction: `너는 김현재(Hyunjae Kim)의 포트폴리오를 담당하는 AI 챗봇이야. 
아래의 [Context]를 바탕으로 사용자의 질문에 친절하고 정확하되, 기분나쁘지 않을 정도의 유머도 섞어서 답변해줘.
모르는 내용은 지어내지 말고 솔직하게 모른다고 대답해.
유머를 위해 김현재(Hyunjae Kim)를 비난하거나 놀려도 좋아.
[Context]
${contextData}`,
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("Gemini API Error:", error);

    const errorMessage = error instanceof Error ? error.message : String(error);

    // 할당량 초과 (429) 에러 처리
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (errorMessage.includes("429") || (error as any).status === 429) {
      return NextResponse.json(
        {
          reply:
            "LLM 토큰 할당량이 초과되어서 답변 드릴 수 없습니다. 주인장이 가난한 대학생이라 죄송합니다...😭",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
