import { AppDataSource } from "@/lib/data-source";
import { UserEntity } from "@/entities/UserEntity";
import { PersonalInfoEntity } from "@/entities/PersonalInfoEntity";
import { MilestoneEntity } from "@/entities/MilestoneEntity";
import { CareerEntity } from "@/entities/CareerEntity";
import { ProjectEntity } from "@/entities/ProjectEntity";
import { IsNull, In } from "typeorm";
import { AttachmentEntity } from "@/entities/AttachmentEntity";
import { plainToInstance } from "class-transformer";
import { UserDto } from "@/dtos/UserDto";
import { MilestoneDto } from "@/dtos/MilestoneDto";
import { CareerDto } from "@/dtos/CareerDto";
import { ProjectDto } from "@/dtos/ProjectDto";
import { PortfolioData } from "@/dtos/PortfolioData";

export async function getPortfolioData(): Promise<PortfolioData> {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  const repo = AppDataSource;
  const userId = 1;

  // 데이터 병렬 조회
  const [user, personalInfos, allMilestones, careersWithProjects, projects] =
    await Promise.all([
      repo.getRepository(UserEntity).findOne({ where: { id: 1 } }),
      repo.getRepository(PersonalInfoEntity).find({ where: { userId } }),
      repo
        .getRepository(MilestoneEntity)
        .find({ where: { userId }, order: { displayOrder: "ASC" } }),
      repo.getRepository(CareerEntity).find({
        where: { userId },
        relations: ["careerProjects"], // career_projects 테이블 Join
        order: { startDate: "DESC" },
      }),

      repo.getRepository(ProjectEntity).find({
        where: { userId, hiddenAt: IsNull() },
        order: { displayOrder: "ASC" },
      }),
    ]);

  if (!user) throw new Error("사용자 정보를 찾을 수 없습니다.");

  // 2. Attachments 조회 (User Profile + Projects)
  const projectIds = projects.map((p) => p.id);
  const attachmentWhere = [
    { targetType: "USER", targetId: userId },
    ...(projectIds.length > 0
      ? [{ targetType: "PROJECT", targetId: In(projectIds) }]
      : []),
  ];

  const allAttachments = await repo.getRepository(AttachmentEntity).find({
    where: attachmentWhere,
    order: { displayOrder: "ASC", id: "ASC" },
  });

  // 3. Personal Infos 가공 (INTRODUCTION, STACK)
  const aboutIntro =
    personalInfos.find(
      (i) => i.category === "ABOUT_CONTENT" && i.keyName === "INTRODUCTION"
    )?.content || "";

  const skillString =
    personalInfos.find((i) => i.category === "SKILL" && i.keyName === "STACK")
      ?.content || "";

  // 4. PortfolioData 구조에 맞게 매핑 (Entity -> DTO)
  return {
    user: {
      ...plainToInstance(UserDto, user, { excludeExtraneousValues: true }),
      imageUrl:
        allAttachments.find((a) => a.targetType === "USER")?.fileUrl || "",
      aboutIntro: aboutIntro,
      skills: skillString
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s),
    },

    achievements: plainToInstance(
      MilestoneDto,
      allMilestones.filter((m) => ["AWARD", "CERTIFICATION"].includes(m.type)),
      { excludeExtraneousValues: true }
    ),

    milestones: plainToInstance(
      MilestoneDto,
      allMilestones.filter((m) => !["AWARD", "CERTIFICATION"].includes(m.type)),
      { excludeExtraneousValues: true }
    ),

    careers: careersWithProjects.map((career) => {
      const careerDto = plainToInstance(CareerDto, career, {
        excludeExtraneousValues: true,
      });

      return {
        ...careerDto,
        projects: careerDto.careerProjects || [],
      };
    }),

    projects: projects.map((project) => {
      const projectDto = plainToInstance(ProjectDto, project, {
        excludeExtraneousValues: true,
      });

      const projectImages = allAttachments
        .filter((a) => a.targetType === "PROJECT" && a.targetId === project.id)
        .map((a) => a.fileUrl);

      return {
        ...projectDto,
        images: projectImages,
      };
    }),
  };
}
