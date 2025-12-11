import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, Index } from "typeorm";
import type { User } from "./User";

export enum MilestoneType {
    EDUCATION = "EDUCATION",
    SERVICE = "SERVICE",
    CERTIFICATE = "CERTIFICATE",
    PERSONAL = "PERSONAL"
}

@Entity("milestones")
@Index("idx_timeline", ["startDate", "displayOrder"])
export class Milestone {
    @PrimaryGeneratedColumn({ type: "int", unsigned: true, comment: "이력 고유 식별자 (PK)" })
    id!: number;

    @Column({ name: "start_date", type: "date", comment: "이력 시작일 (또는 졸업/취득일)" })
    startDate!: string;

    @Column({ name: "end_date", type: "date", nullable: true, comment: "이력 종료일 (현재 진행형이면 NULL)" })
    endDate?: string;

    @Column({ length: 255, comment: "제목 (예: XX대학교 컴퓨터공학과, 육군 병장 만기제대)" })
    title!: string;

    @Column({ length: 255, nullable: true, comment: "소속 기관/회사 (예: XX대학교, XX 회사)" })
    organization?: string;

    @Column({ type: "text", nullable: true, comment: "상세 설명 (배운 내용, 주요 성과 등)" })
    description?: string;

    @Column({ type: "enum", enum: MilestoneType, comment: "이력 유형" })
    type!: MilestoneType;

    @Column({ name: "display_order", type: "int", unsigned: true, comment: "타임라인에 표시될 순서" })
    displayOrder!: number;

    @Column({ type: "int", unsigned: true, comment: "사용자 외래 키 (FK)" })
    userId!: number;

    @ManyToOne("User", (user: User) => user.milestones, { onDelete: "CASCADE" })
    user!: User;

    @CreateDateColumn({ name: "created_at", comment: "생성 일시" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at", comment: "수정 일시" })
    updatedAt!: Date;
}
