import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, Unique, Index } from "typeorm";
import { User } from "./User";

@Entity("personal_infos")
@Unique("uk_user_info", ["userId", "category", "keyName"])
export class PersonalInfo {
    @PrimaryGeneratedColumn({ type: "int", unsigned: true, comment: "개인 정보 고유 식별자 (PK)" })
    id!: number;

    @Column({ length: 50, comment: "정보 대분류 (ex. SKILL, LIFESTYLE, TMI)" })
    @Index("idx_category")
    category!: string;

    @Column({ name: "key_name", length: 100, comment: "정보 세부 항목명 (ex. Height, Favorite_Food, Main_Stack)" })
    keyName!: string;

    @Column({ type: "text", comment: "정보 내용 (값)" })
    content!: string;

    @Column({ type: "int", unsigned: true, comment: "사용자 외래 키 (FK)" })
    userId!: number;

    @ManyToOne(() => User, (user) => user.personalInfos, { onDelete: "CASCADE" })
    user!: User;

    @CreateDateColumn({ name: "created_at", comment: "생성 일시" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at", comment: "수정 일시" })
    updatedAt!: Date;
}
