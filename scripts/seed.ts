import { AppDataSource } from "../src/lib/data-source";
import { User, Gender } from "../src/entities/User";
import { Career } from "../src/entities/Career";
import { Project } from "../src/entities/Project";
import { PersonalInfo } from "../src/entities/PersonalInfo";
import { Milestone, MilestoneType } from "../src/entities/Milestone";
import { Inquiry } from "../src/entities/Inquiry";

async function seed() {
    try {
        await AppDataSource.initialize();
        console.log("Data Source has been initialized!");

        const userRepository = AppDataSource.getRepository(User);
        const careerRepository = AppDataSource.getRepository(Career);
        const projectRepository = AppDataSource.getRepository(Project);
        const personalInfoRepository = AppDataSource.getRepository(PersonalInfo);
        const milestoneRepository = AppDataSource.getRepository(Milestone);
        const inquiryRepository = AppDataSource.getRepository(Inquiry);

        // 기존 데이터 삭제 (순서 중요: 자식 -> 부모)
        await inquiryRepository.delete({});
        await milestoneRepository.delete({});
        await personalInfoRepository.delete({});
        await projectRepository.delete({});
        await careerRepository.delete({});
        await userRepository.delete({});

        // 1. Create User
        const user = new User();
        user.nameKo = "김현재";
        user.nameEn = "Kim Hyunzai";
        user.email = "hyunzai@example.com";
        user.subTitleKo = "사용자 경험을 중요하게 생각하는 프론트엔드 개발자";
        user.subTitleEn = "Frontend Developer creating great user experiences";
        user.imageUrl = "https://placehold.co/400"; // Placeholder image
        user.gender = Gender.M;
        user.birthDate = "1995-01-01"; // Example date
        user.address = "Seoul, Republic of Korea";
        await userRepository.save(user);

        // 2. Create Careers
        const career1 = new Career();
        career1.position = "Frontend Developer";
        career1.company = "Tech Company";
        career1.startDate = "2023-01-01";
        career1.description = "React와 Next.js를 이용한 웹 애플리케이션 개발. 대규모 트래픽 처리를 위한 성능 최적화 경험.";
        career1.techStack = "React, Next.js, Redux";
        career1.user = user;
        await careerRepository.save(career1);

        // 3. Create Projects
        const project1 = new Project();
        project1.title = "Portfolio Website";
        project1.thumbnail = "https://placehold.co/600x400";
        project1.displayOrder = 1;
        project1.description = "Next.js와 TypeORM을 이용한 포트폴리오 사이트. Google Gemini를 연동한 RAG 챗봇 기능 포함.";
        project1.techStack = "Next.js, TypeScript, TypeORM, MySQL, Google Gemini";
        project1.demoLink = "https://hyunzai.com";
        project1.startDate = "2023-12-01";
        project1.userId = user.id; // Assign ID directly or user object
        project1.user = user;
        await projectRepository.save(project1);

        // 4. Create Personal Info (TMI)
        const tmi1 = new PersonalInfo();
        tmi1.category = "LIFESTYLE";
        tmi1.keyName = "Hobby";
        tmi1.content = "주말에는 등산을 즐깁니다. 자연 속에서 머리를 식히는 것을 좋아합니다.";
        tmi1.user = user;
        await personalInfoRepository.save(tmi1);

        const skill1 = new PersonalInfo();
        skill1.category = "SKILL";
        skill1.keyName = "Main Stack";
        skill1.content = "Frontend: React, Next.js, TailwindCSS / Backend: Node.js, NestJS, TypeORM";
        skill1.user = user;
        await personalInfoRepository.save(skill1);

        // 5. Create Milestones
        const milestone1 = new Milestone();
        milestone1.startDate = "2014-03-01";
        milestone1.endDate = "2020-02-20";
        milestone1.title = "컴퓨터공학과 졸업";
        milestone1.organization = "XX대학교";
        milestone1.type = MilestoneType.EDUCATION;
        milestone1.displayOrder = 1;
        milestone1.user = user;
        await milestoneRepository.save(milestone1);

        console.log("Seed data has been added!");

    } catch (err) {
        console.error("Error during Data Source initialization", err);
    } finally {
        await AppDataSource.destroy();
    }
}

seed();
