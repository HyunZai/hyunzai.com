import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Career } from "../entities/Career";
import { Project } from "../entities/Project";
import { PersonalInfo } from "../entities/PersonalInfo";
import { Inquiry } from "../entities/Inquiry";
import { Milestone } from "../entities/Milestone";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "1234",
    database: process.env.DB_DATABASE || "hyunzai_db",
    synchronize: true, // 개발 환경에서만 true로 설정 (메이저 변경 시 데이터 유실 주의)
    logging: false,
    entities: [User, Career, Project, PersonalInfo, Inquiry, Milestone],
    migrations: [],
    subscribers: [],
});
