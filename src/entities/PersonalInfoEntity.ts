import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  Index,
} from "typeorm";
import type { Relation } from "typeorm";
import type { UserEntity } from "./UserEntity";

@Entity("personal_infos")
@Unique("uk_user_info", ["userId", "category", "keyName"])
export class PersonalInfoEntity {
  @PrimaryGeneratedColumn({
    type: "int",
    unsigned: true,
    comment: "개인 정보 고유 식별자 (PK)",
  })
  id!: number;

  @Column({ length: 50, comment: "정보 대분류 (ex. SKILL, LIFESTYLE, TMI)" })
  @Index("idx_category")
  category!: string;

  @Column({
    name: "key_name",
    length: 100,
    comment: "정보 세부 항목명 (ex. Height, Favorite_Food, Main_Stack)",
  })
  keyName!: string;

  @Column({ type: "text", comment: "정보 내용 (값)" })
  content!: string;

  @Column({
    name: "user_id",
    type: "int",
    unsigned: true,
    comment: "사용자 외래 키 (FK)",
  })
  userId!: number;

  // 순환 참조 방지를 위해 type import와 문자열 관계 설정을 유지해야 합니다.
  @ManyToOne("UserEntity", (user: UserEntity) => user.personalInfos, {
    onDelete: "CASCADE",
  })
  user!: Relation<UserEntity>;

  @CreateDateColumn({ name: "created_at", comment: "생성 일시" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", comment: "수정 일시" })
  updatedAt!: Date;
}

Object.defineProperty(PersonalInfoEntity, "name", {
  value: "PersonalInfoEntity",
});
