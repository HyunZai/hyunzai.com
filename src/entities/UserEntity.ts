import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import type { Relation } from "typeorm";
import type { CareerEntity } from "./CareerEntity";
import type { ProjectEntity } from "./ProjectEntity";
import type { PersonalInfoEntity } from "./PersonalInfoEntity";
import type { MilestoneEntity } from "./MilestoneEntity";

export enum Gender {
  M = "M",
  F = "F",
  O = "O",
}

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn({
    type: "int",
    unsigned: true,
    comment: "사용자 고유 식별자 (PK)",
  })
  id!: number;

  @Column({ name: "name_ko", length: 255, comment: "사용자 실명(한국어)" })
  nameKo!: string;

  @Column({ name: "name_en", length: 255, comment: "사용자 실명(영어)" })
  nameEn!: string;

  @Column({
    name: "sub_title_ko",
    type: "text",
    comment: "메인페이지 서브 문구(한국어)",
  })
  subTitleKo!: string;

  @Column({
    name: "sub_title_en",
    type: "text",
    comment: "메인페이지 서브 문구(영어)",
  })
  subTitleEn!: string;

  @Column({ length: 255, unique: true, comment: "이메일 주소" })
  email!: string;

  @Column({
    name: "git_username",
    length: 100,
    nullable: true,
    comment: "GitHub Contributions 출력을 위한 GitHub 사용자 이름",
  })
  gitUsername?: string;

  @Column({ type: "enum", enum: Gender, comment: "성별 (M:남, F:여, O:기타)" })
  gender!: Gender;

  @Column({ name: "birth_date", type: "date", comment: "생년월일" })
  birthDate!: string;

  @Column({ length: 255, comment: "거주 지역 또는 주소" })
  address!: string;

  @CreateDateColumn({ name: "created_at", comment: "생성 일시" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", comment: "수정 일시" })
  updatedAt!: Date;

  // 순환 참조 방지를 위해 type import와 문자열 관계 설정을 유지해야 합니다.
  @OneToMany("CareerEntity", (career: CareerEntity) => career.user)
  careers!: Relation<CareerEntity>[];

  @OneToMany("ProjectEntity", (project: ProjectEntity) => project.user)
  projects!: Relation<ProjectEntity>[];

  @OneToMany("PersonalInfoEntity", (info: PersonalInfoEntity) => info.user)
  personalInfos!: Relation<PersonalInfoEntity>[];

  @OneToMany("MilestoneEntity", (milestone: MilestoneEntity) => milestone.user)
  milestones!: Relation<MilestoneEntity>[];
}

Object.defineProperty(UserEntity, "name", {
  value: "UserEntity",
});
