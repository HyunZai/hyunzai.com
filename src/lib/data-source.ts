import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity } from "../entities/UserEntity";
import { CareerEntity } from "../entities/CareerEntity";
import { ProjectEntity } from "../entities/ProjectEntity";
import { PersonalInfoEntity } from "../entities/PersonalInfoEntity";
import { InquiryEntity } from "../entities/InquiryEntity";
import { MilestoneEntity } from "../entities/MilestoneEntity";
import { AttachmentEntity } from "../entities/AttachmentEntity";
import { CareerProjectEntity } from "../entities/CareerProjectEntity";
import { GuestbookEntity } from "../entities/GuestbookEntity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "1234",
  database: process.env.DB_DATABASE || "hyunzai_db",
  synchronize: true, // 개발 환경에서만 true로 설정 (메이저 변경 시 데이터 유실 주의)
  logging: false,
  entities: [
    UserEntity,
    CareerEntity,
    ProjectEntity,
    PersonalInfoEntity,
    InquiryEntity,
    MilestoneEntity,
    AttachmentEntity,
    CareerProjectEntity,
    GuestbookEntity,
  ],
  migrations: [],
  subscribers: [],
});
