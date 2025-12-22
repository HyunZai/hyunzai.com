import { NextRequest, NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { AppDataSource } from "@/lib/data-source";
import { UserEntity } from "@/entities/UserEntity";

// Initialize Gemini Chat Model
const model = new ChatGoogleGenerativeAI({
  model: "gemini-pro",
  maxOutputTokens: 2048,
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // 1. Initialize DB if not connected
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    // 2. Retrieve Data (RAG - Context Injection)
    const userRepository = AppDataSource.getRepository(UserEntity);

    const user = await userRepository.findOne({
      where: { id: 1 },
      relations: ["careers", "projects", "personalInfos", "milestones"],
    });

    if (!user) {
      return NextResponse.json(
        { error: "Portfolio owner data not found" },
        { status: 404 }
      );
    }

    // 3. Construct Context String
    const context = `
            Profile:
            Name (KO): ${user.nameKo}
            Name (EN): ${user.nameEn}
            Email: ${user.email}
            Sub Title: ${user.subTitleKo}

            Projects:
            ${user.projects
              .map(
                (p) =>
                  `- ${p.title}: ${p.description} (Stack: ${p.techStack}) [Demo: ${p.demoLink}]`
              )
              .join("\n")}

            Personal Info / TMI:
            ${user.personalInfos
              .map((i) => `- [${i.category}] ${i.keyName}: ${i.content}`)
              .join("\n")}

            Milestones:
            ${user.milestones
              .map(
                (m) =>
                  `- ${m.startDate} ~ ${m.endDate || "Present"}: ${m.title} (${
                    m.organization
                  })`
              )
              .join("\n")}
        `;

    // 4. Create Prompt
    const systemPrompt = `You are a portfolio chatbot for "Kim Hyunzai" (김현재).
        Respond to the user's question based ONLY on the following context information.
        If the answer is not in the context, say "죄송합니다, 그 정보는 제 포트폴리오에 없어서 알 수 없습니다."
        Be friendly, professional, and concise. Speak in Korean essentially, but you can use English technical terms.
        
        Context:
        ${context}
        `;

    // 5. Generate Answer
    const response = await model.invoke([
      ["system", systemPrompt],
      ["human", message],
    ]);

    const answer = response.content;

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
