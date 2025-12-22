import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  JoinColumn,
} from "typeorm";
import type { Relation } from "typeorm";
import type { CareerEntity } from "./CareerEntity";

@Entity("career_projects")
@Index("idx_career_project_date", ["careerId", "startDate"])
export class CareerProjectEntity {
  @PrimaryGeneratedColumn({
    type: "int",
    unsigned: true,
    comment: "경력 프로젝트 고유 식별자 (PK)",
  })
  id!: number;

  @Column({
    name: "career_id",
    type: "int",
    unsigned: true,
    comment: "경력 외래 키 (FK)",
  })
  careerId!: number;

  @Column({ length: 255, comment: "프로젝트 명" })
  title!: string;

  @Column({ type: "text", comment: "프로젝트 상세 설명 및 기여도" })
  description!: string;

  @Column({ length: 255, nullable: true, comment: "프로젝트 내 역할" })
  role?: string;

  @Column({
    name: "tech_stack",
    type: "text",
    nullable: true,
    comment: "프로젝트에 사용한 기술 스택",
  })
  techStack?: string;

  @Column({
    name: "start_date",
    type: "date",
    nullable: true,
    comment: "프로젝트 시작일",
  })
  startDate?: string;

  @Column({
    name: "end_date",
    type: "date",
    nullable: true,
    comment: "프로젝트 종료일",
  })
  endDate?: string;

  // 순환 참조 방지를 위해 type import와 문자열 관계 설정을 유지해야 합니다.
  @ManyToOne("CareerEntity", (career: CareerEntity) => career.careerProjects, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "career_id" })
  career!: Relation<CareerEntity>;

  @CreateDateColumn({ name: "created_at", comment: "생성 일시" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", comment: "수정 일시" })
  updatedAt!: Date;
}

Object.defineProperty(CareerProjectEntity, "name", {
  value: "CareerProjectEntity",
});
