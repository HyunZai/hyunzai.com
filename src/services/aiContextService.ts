import { getRepository } from "@/lib/data-source";
import { UserEntity } from "@/entities/UserEntity";
import { PersonalInfoEntity } from "@/entities/PersonalInfoEntity";
import { CareerEntity } from "@/entities/CareerEntity";
import { ProjectEntity } from "@/entities/ProjectEntity";
import { MilestoneEntity } from "@/entities/MilestoneEntity";
import { IsNull } from "typeorm";

export async function getAIContextData(): Promise<string> {
  const userRepo = await getRepository(UserEntity);
  const infoRepo = await getRepository(PersonalInfoEntity);
  const careerRepo = await getRepository(CareerEntity);
  const projectRepo = await getRepository(ProjectEntity);
  const milestoneRepo = await getRepository(MilestoneEntity);
  const userId = 1;

  // 1. 모든 데이터 병렬 조회
  const [user, personalInfos, careers, projects, milestones] =
    await Promise.all([
      userRepo.findOne({ where: { id: userId } }),
      infoRepo.find({ where: { userId } }),
      careerRepo.find({
        where: { userId },
        relations: ["careerProjects"],
        order: { startDate: "DESC" },
      }),
      projectRepo.find({
        where: { userId, hiddenAt: IsNull() },
        order: { displayOrder: "ASC" },
      }),
      milestoneRepo.find({
        where: { userId },
        order: { startDate: "DESC" },
      }),
    ]);

  if (!user) return "";

  // 2. Markdown 포맷팅
  const parts: string[] = [];

  // --- 기본 프로필 ---
  parts.push(`# User Profile
- Name: ${user.nameKo} (${user.nameEn})
- Email: ${user.email}
- Bio: ${user.subTitleKo}
- GitHub: ${user.gitUsername || "N/A"}
- Address: ${user.address}
`);

  // --- 개인 정보 (MBTI, 성격, 취미 등) ---
  const infoMap = personalInfos.reduce((acc, info) => {
    if (!acc[info.category]) acc[info.category] = [];
    acc[info.category].push(`- ${info.keyName}: ${info.content}`);
    return acc;
  }, {} as Record<string, string[]>);

  if (infoMap["SKILL"]) {
    parts.push(`## Tech Skills\n${infoMap["SKILL"].join("\n")}`);
  }

  if (infoMap["PERSONALITY"]) {
    parts.push(
      `## Personality (MBTI & Traits)\n${infoMap["PERSONALITY"].join("\n")}`
    );
  }

  if (infoMap["LIFESTYLE"]) {
    parts.push(`## Lifestyle & Hobbies\n${infoMap["LIFESTYLE"].join("\n")}`);
  }

  if (infoMap["TMI"]) {
    parts.push(`## Fun Facts (TMI)\n${infoMap["TMI"].join("\n")}`);
  }

  if (infoMap["ETC"]) {
    parts.push(`## Values & Philosophy\n${infoMap["ETC"].join("\n")}`);
  }

  // --- 경력 ---
  parts.push(`## Careers`);
  careers.forEach((career) => {
    parts.push(`### ${career.company} (${career.jobTitle})
- Period: ${career.startDate} ~ ${career.endDate || "Present"}
- Role: ${career.description || "N/A"}`);

    if (career.careerProjects && career.careerProjects.length > 0) {
      parts.push(`  **Projects**:`);
      career.careerProjects.forEach((cp) => {
        parts.push(
          `  - ${cp.title}: ${cp.description} (Stack: ${cp.techStack})`
        );
      });
    }
    parts.push(""); // Newline
  });

  // --- 사이드 프로젝트 ---
  parts.push(`## Side Projects`);
  projects.forEach((p) => {
    parts.push(`### ${p.title}
- Description: ${p.description}
- Stack: ${p.techStack}
- Links: Demo(${p.demoLink || "N/A"}), GitHub(${p.gitLink || "N/A"})`);
  });

  // --- 마일스톤 (수상, 자격증) ---
  const awards = milestones.filter(
    (m) => m.type === "AWARD" || m.type === "CERTIFICATION"
  );
  if (awards.length > 0) {
    parts.push(`## Awards & Certifications`);
    awards.forEach((a) => {
      parts.push(
        `- [${a.type}] ${a.title} (${a.organization}, ${a.startDate})`
      );
    });
  }

  return parts.join("\n\n");
}
