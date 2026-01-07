import { getRepository, AppDataSource } from "@/lib/data-source";
import { UserEntity } from "@/entities/UserEntity";
import { PersonalInfoEntity } from "@/entities/PersonalInfoEntity";
import { MilestoneEntity } from "@/entities/MilestoneEntity";
import { ProjectEntity } from "@/entities/ProjectEntity";
import { CareerEntity } from "@/entities/CareerEntity";
import { CareerProjectEntity } from "@/entities/CareerProjectEntity";
import { AttachmentType } from "@/entities/AttachmentEntity";
import { MilestoneType } from "@/entities/MilestoneEntity";
import { IsNull, In } from "typeorm";
import { AttachmentEntity } from "@/entities/AttachmentEntity";
import { plainToInstance } from "class-transformer";
import { UserDto } from "@/dtos/UserDto";
import { MilestoneDto } from "@/dtos/MilestoneDto";
import { CareerDto } from "@/dtos/CareerDto";
import { ProjectDto } from "@/dtos/ProjectDto";
import { PortfolioData } from "@/dtos/PortfolioData";

export async function getPortfolioData(): Promise<PortfolioData> {
  const userRepo = await getRepository(UserEntity);
  const infoRepo = await getRepository(PersonalInfoEntity);
  const milestoneRepo = await getRepository(MilestoneEntity);
  const careerRepo = await getRepository(CareerEntity);
  const projectRepo = await getRepository(ProjectEntity);
  const attachmentRepo = await getRepository(AttachmentEntity);

  const userId = 1;

  // 데이터 병렬 조회
  const [user, personalInfos, allMilestones, careersWithProjects, projects] =
    await Promise.all([
      userRepo.findOne({ where: { id: 1 } }),
      infoRepo.find({ where: { userId } }),
      milestoneRepo.find({ where: { userId }, order: { displayOrder: "ASC" } }),
      careerRepo.find({
        where: { userId },
        relations: ["careerProjects"], // career_projects 테이블 Join
        order: { startDate: "DESC" },
      }),

      projectRepo.find({
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

  const allAttachments = await attachmentRepo.find({
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

export async function savePortfolioData(data: any): Promise<void> {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const userRepo = queryRunner.manager.getRepository(UserEntity);
    const infoRepo = queryRunner.manager.getRepository(PersonalInfoEntity);
    const milestoneRepo = queryRunner.manager.getRepository(MilestoneEntity);
    const careerRepo = queryRunner.manager.getRepository(CareerEntity);
    const projectRepo = queryRunner.manager.getRepository(ProjectEntity);
    const attachmentRepo = queryRunner.manager.getRepository(AttachmentEntity);
    const careerProjectRepo = queryRunner.manager.getRepository(CareerProjectEntity);

    const userId = 1;

    // 1. User Info Update
    if (data.user) {
        await userRepo.update(userId, {
            nameKo: data.user.nameKr,
            nameEn: data.user.nameEn,
            subTitleKo: data.user.subtitleKr,
            subTitleEn: data.user.subtitleEn,
        });
    }

    // 2. About Info (Introduction, GithubNickname)
    if (data.about) {
        // Introduction
        const introInfo = await infoRepo.findOne({ where: { userId, category: 'ABOUT_CONTENT', keyName: 'INTRODUCTION' } });
        if (introInfo) {
            introInfo.content = data.about.introduction;
            await infoRepo.save(introInfo);
        } else {
             await infoRepo.save({
                 userId,
                 category: 'ABOUT_CONTENT',
                 keyName: 'INTRODUCTION',
                 content: data.about.introduction
             });
        }
        
        // Github Username
        if(data.about.githubNickname) {
             await userRepo.update(userId, { gitUsername: data.about.githubNickname });
        }
    }

    // 3. Milestones (Histories)
    if (data.histories) {
        const existingMilestones = await milestoneRepo.find({ where: { userId } });
        const incomingIds = data.histories.map((h: any) => h.id).filter((id: any) => !isNaN(Number(id)));
        const toDelete = existingMilestones.filter(m => !incomingIds.includes(m.id));
        if(toDelete.length > 0) {
            await milestoneRepo.remove(toDelete);
        }

        for (const history of data.histories) {
            let mappedType: MilestoneType = MilestoneType.PERSONAL; // Default
            if (history.type.toLowerCase() === 'work') mappedType = MilestoneType.SERVICE;
            else if (history.type.toLowerCase() === 'education') mappedType = MilestoneType.EDUCATION;
            else if (history.type.toLowerCase() === 'project') mappedType = MilestoneType.PERSONAL;
            else if (history.type.toLowerCase() === 'other') mappedType = MilestoneType.PERSONAL;
            else if (history.type) mappedType = history.type as MilestoneType;
            
            const entity = new MilestoneEntity();
            if (!isNaN(Number(history.id))) entity.id = Number(history.id);
            entity.type = mappedType;
            entity.title = history.title;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            entity.startDate = history.startDate as any; 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            entity.endDate = (history.endDate || null) as any;
            entity.description = history.description;
            entity.displayOrder = history.order;
            entity.userId = userId;
            
            await milestoneRepo.save(entity);
        }
    }

    // 4. Projects & Attachments
    if (data.projects) {
        const existingProjects = await projectRepo.find({ where: { userId } });
        const incomingProjIds = data.projects.map((p: any) => p.id).filter((id: any) => !isNaN(Number(id)));
        const projectsToDelete = existingProjects.filter(p => !incomingProjIds.includes(p.id));
        if(projectsToDelete.length > 0) {
             await projectRepo.remove(projectsToDelete);
        }

        for (const proj of data.projects) {
            const projectEntity = new ProjectEntity();
            if (!isNaN(Number(proj.id))) {
                projectEntity.id = Number(proj.id);
            }
            projectEntity.title = proj.title;
            projectEntity.description = proj.description;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            projectEntity.techStack = Array.isArray(proj.techStack) ? proj.techStack.join(',') : (proj.techStack as any); 
            projectEntity.demoLink = proj.demoLink;
            projectEntity.gitLink = proj.gitLink;
            projectEntity.startDate = proj.startDate;
            projectEntity.endDate = proj.endDate || null;
            projectEntity.displayOrder = proj.displayOrder;
            projectEntity.hiddenAt = proj.hiddenAt ? new Date(proj.hiddenAt) : undefined;
            projectEntity.userId = userId;

            const savedProject = await projectRepo.save(projectEntity);

            // Save Attachments (Screenshots)
            if (proj.images && Array.isArray(proj.images)) {
                await attachmentRepo.delete({ targetType: 'PROJECT', targetId: savedProject.id });

                let order = 1;
                for (const imgUrl of proj.images) {
                    const attachment = new AttachmentEntity();
                    attachment.targetId = savedProject.id;
                    attachment.targetType = 'PROJECT';
                    attachment.fileUrl = imgUrl;
                    attachment.fileType = AttachmentType.IMAGE;
                    attachment.displayOrder = order++;
                    
                    await attachmentRepo.save(attachment);
                }
            }
        }
    }

    // 5. Careers & CareerProjects
    if (data.careers) {
        const existingCareers = await careerRepo.find({ where: { userId } });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const incomingCareerIds = data.careers.map((c: any) => c.id).filter((id: any) => !isNaN(Number(id)));
        const careersToDelete = existingCareers.filter(c => !incomingCareerIds.includes(c.id));
        if(careersToDelete.length > 0) await careerRepo.remove(careersToDelete);

        for (const career of data.careers) {
            const careerEntity = new CareerEntity();
            if (!isNaN(Number(career.id))) careerEntity.id = Number(career.id);
            careerEntity.company = career.company;
            careerEntity.department = career.department;
            careerEntity.jobTitle = career.jobTitle;
            careerEntity.startDate = career.startDate;
            careerEntity.endDate = career.endDate || null;
            careerEntity.description = career.description;
            careerEntity.userId = userId;

            const savedCareer = await careerRepo.save(careerEntity);

            if(career.projects && Array.isArray(career.projects)) {
                await careerProjectRepo.delete({ careerId: savedCareer.id });

                for (const cp of career.projects) {
                    const cpEntity = new CareerProjectEntity();
                    cpEntity.careerId = savedCareer.id;
                    cpEntity.title = cp.title;
                    cpEntity.description = cp.description;
                    cpEntity.role = cp.role;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    cpEntity.techStack = Array.isArray(cp.techStack) ? cp.techStack.join(',') : (cp.techStack as any);
                    cpEntity.startDate = cp.startDate || null;
                    cpEntity.endDate = cp.endDate || null;
                    
                    await careerProjectRepo.save(cpEntity);
                }
            }
        }
    }

    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw err;
  } finally {
    await queryRunner.release();
  }
}
