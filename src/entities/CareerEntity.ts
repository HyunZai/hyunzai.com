import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";
import type { Relation } from "typeorm";
import type { UserEntity } from "./UserEntity";
import type { CareerProjectEntity } from "./CareerProjectEntity";

@Entity("careers")
@Index("idx_user_start_date", ["userId", "startDate"])
@Index("idx_company", ["company"])
export class CareerEntity {
  @PrimaryGeneratedColumn({
    type: "int",
    unsigned: true,
    comment: "경력 고유 식별자 (PK)",
  })
  id!: number;

  @Column({ length: 255, comment: "회사(조직)명" })
  company!: string;

  @Column({ length: 255, nullable: true, comment: "소속 부서" })
  department?: string;

  @Column({ name: "job_title", length: 100, comment: "직급" })
  jobTitle!: string;

  @Column({ name: "start_date", type: "date", comment: "경력 시작일" })
  startDate!: string;

  @Column({
    name: "end_date",
    type: "date",
    nullable: true,
    comment: "경력 종료일 (현재 재직 중이면 NULL)",
  })
  endDate?: string;

  @Column({
    type: "text",
    nullable: true,
    comment: "주요 역할 및 성과 상세 설명",
  })
  description?: string;

  @Column({
    name: "user_id",
    type: "int",
    unsigned: true,
    comment: "사용자 외래 키 (FK)",
  })
  userId!: number;

  // 순환 참조 방지를 위해 type import와 문자열 관계 설정을 유지해야 합니다.
  @ManyToOne("UserEntity", (user: UserEntity) => user.careers, {
    onDelete: "CASCADE",
  })
  user!: Relation<UserEntity>;

  @OneToMany("CareerProjectEntity", (cp: CareerProjectEntity) => cp.career)
  careerProjects!: Relation<CareerProjectEntity>[];

  @CreateDateColumn({ name: "created_at", comment: "생성 일시" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", comment: "수정 일시" })
  updatedAt!: Date;
}

Object.defineProperty(CareerEntity, "name", { value: "CareerEntity" });
