import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, Index } from "typeorm";
import type { User } from "./User";

@Entity("careers")
export class Career {
    @PrimaryGeneratedColumn({ type: "int", unsigned: true, comment: "경력 고유 식별자 (PK)" })
    id!: number;

    @Column({ length: 255, comment: "직무 또는 역할" })
    position!: string;

    @Column({ length: 255, comment: "회사(조직)명" })
    company!: string;

    @Column({ name: "start_date", type: "date", comment: "경력 시작일" })
    @Index("idx_start_date")
    startDate!: string;

    @Column({ name: "end_date", type: "date", nullable: true, comment: "경력 종료일 (현재 재직 중이면 NULL)" })
    endDate?: string;

    @Column({ type: "text", comment: "주요 역할 및 성과 상세 설명" })
    description!: string;

    @Column({ name: "tech_stack", type: "text", nullable: true, comment: "해당 경력에서 사용된 주요 기술 스택" })
    techStack?: string;

    @Column({ type: "int", unsigned: true, comment: "사용자 외래 키 (FK)" })
    userId!: number;

    @ManyToOne("User", (user: User) => user.careers, { onDelete: "CASCADE" })
    user!: User;

    @CreateDateColumn({ name: "created_at", comment: "생성 일시" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at", comment: "수정 일시" })
    updatedAt!: Date;
}
