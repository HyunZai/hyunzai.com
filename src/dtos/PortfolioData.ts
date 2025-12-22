import { UserDto } from "./UserDto";
import { MilestoneDto } from "./MilestoneDto";
import { ProjectDto } from "./ProjectDto";
import { CareerProjectDto } from "./CareerProjectDto";
import { CareerDto } from "./CareerDto";

// 메인페이지에 최초 1회 조회해서 가져온 모든 데이터
export interface PortfolioData {
  // 기본 정보 & About 섹션 필드 확장
  user: UserDto & {
    imageUrl: string;
    aboutIntro: string;
    skills: string[];
  };

  // Milestone을 '수상 및 자격증'이랑 '타임라인'으로 분리
  achievements: MilestoneDto[];
  milestones: MilestoneDto[];

  // 경력 + 해당 경력에 대한 프로젝트
  careers: (CareerDto & {
    projects: CareerProjectDto[];
  })[];

  // 프로젝트 + 해당 프로젝트의 이미지
  projects: (ProjectDto & {
    images: string[];
  })[];
}
