import { AppDataSource } from "../src/lib/data-source";
import { User } from "../src/entities/User";
import { Career } from "../src/entities/Career";
import { Project } from "../src/entities/Project";
import { PersonalInfo } from "../src/entities/PersonalInfo";

async function seed() {
    try {
        await AppDataSource.initialize();
        console.log("Data Source has been initialized!");

        const userRepository = AppDataSource.getRepository(User);
        const careerRepository = AppDataSource.getRepository(Career);
        const projectRepository = AppDataSource.getRepository(Project);
        const personalInfoRepository = AppDataSource.getRepository(PersonalInfo);

        // 기존 데이터 삭제 (중복 방지)
        // await personalInfoRepository.delete({});
        // await projectRepository.delete({});
        // await careerRepository.delete({});
        // await userRepository.delete({});

        // 1. Create User
        const user = new User();
        user.name = "김현재";
        user.email = "hyunzai@example.com";
        user.bio = "끊임없이 성장하는 개발자 김현재입니다.";
        await userRepository.save(user);

        // 2. Create Careers
        const career1 = new Career();
        career1.title = "Frontend Developer";
        career1.company = "Tech Company";
        career1.startDate = "2023-01";
        career1.description = "React와 Next.js를 이용한 웹 애플리케이션 개발";
        career1.user = user;
        await careerRepository.save(career1);

        // 3. Create Projects
        const project1 = new Project();
        project1.title = "Portfolio Website";
        project1.description = "Next.js와 TypeORM을 이용한 포트폴리오 사이트";
        project1.techStack = ["Next.js", "TypeScript", "TypeORM", "MySQL"];
        project1.link = "https://hyunzai.com";
        project1.user = user;
        await projectRepository.save(project1);

        // 4. Create Personal Info (TMI)
        const tmi1 = new PersonalInfo();
        tmi1.category = "Hobby";
        tmi1.content = "주말에는 등산을 즐깁니다.";
        tmi1.user = user;
        await personalInfoRepository.save(tmi1);

        console.log("Seed data has been added!");

    } catch (err) {
        console.error("Error during Data Source initialization", err);
    } finally {
        await AppDataSource.destroy();
    }
}

seed();
