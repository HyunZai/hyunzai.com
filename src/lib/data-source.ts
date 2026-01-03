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

const isDevelopment = process.env.NODE_ENV !== "production";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "1234",
  database: process.env.DB_DATABASE || "hyunzai_db",
  synchronize: isDevelopment, // 개발 환경에서만 true (운영 환경 데이터 보호)
  logging: isDevelopment, // 개발 환경에서만 로그 출력
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
  subscribers: [],
});

export const getRepository = async <
  Entity extends import("typeorm").ObjectLiteral
>(
  entity: import("typeorm").EntityTarget<Entity>
): Promise<import("typeorm").Repository<Entity>> => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource.getRepository(entity);
};
