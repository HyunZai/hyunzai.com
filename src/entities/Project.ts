import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, Index } from "typeorm";
import { User } from "./User";

@Entity("projects")
export class Project {
    @PrimaryGeneratedColumn({ type: "int", unsigned: true, comment: "프로젝트 고유 식별자 (PK)" })
    id!: number;

    @Column({ length: 255, comment: "프로젝트 제목" })
    title!: string;

    @Column({ length: 1024, comment: "썸네일 URL" })
    thumbnail!: string;

    @Column({ name: "display_order", type: "int", unsigned: true, comment: "화면에 표시할 순서" })
    @Index("idx_order")
    displayOrder!: number;

    @Column({ type: "text", comment: "프로젝트 상세 설명" })
    description!: string;

    @Column({ name: "tech_stack", type: "text", comment: "사용된 기술 스택 (콤마로 구분된 문자열 배열)" })
    techStack!: string;

    @Column({ name: "demo_link", length: 512, nullable: true, comment: "프로젝트 데모 링크" })
    demoLink?: string;

    @Column({ name: "git_link", length: 512, nullable: true, comment: "프로젝트 Git 저장소 링크" })
    gitLink?: string;

    @Column({ name: "start_date", type: "date", nullable: true, comment: "프로젝트 시작일" })
    @Index("idx_start_date")
    startDate?: string;

    @Column({ name: "end_date", type: "date", nullable: true, comment: "프로젝트 종료일" })
    endDate?: string;

    @Column({ name: "hidden_at", type: "timestamp", nullable: true, comment: "숨김 처리 일시" })
    @Index("idx_hidden_at")
    hiddenAt?: Date;

    @Column({ type: "int", unsigned: true, comment: "사용자 외래 키 (FK)" })
    userId!: number;

    @ManyToOne(() => User, (user) => user.projects, { onDelete: "CASCADE" })
    user!: User;

    @CreateDateColumn({ name: "created_at", comment: "생성 일시" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at", comment: "수정 일시" })
    updatedAt!: Date;
}
