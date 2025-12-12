import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Career } from "./Career";
import { Project } from "./Project";
import { PersonalInfo } from "./PersonalInfo";
import { Milestone } from "./Milestone";

export enum Gender {
    M = "M",
    F = "F",
    O = "O"
}

@Entity("users")
export class User {
    @PrimaryGeneratedColumn({ type: "int", unsigned: true, comment: "사용자 고유 식별자 (PK)" })
    id!: number;

    @Column({ name: "name_ko", length: 255, comment: "사용자 실명(한국어)" })
    nameKo!: string;

    @Column({ name: "name_en", length: 255, comment: "사용자 실명(영어)" })
    nameEn!: string;

    @Column({ name: "sub_title_ko", type: "text", comment: "메인페이지 서브 문구(한국어)" })
    subTitleKo!: string;

    @Column({ name: "sub_title_en", type: "text", comment: "메인페이지 서브 문구(영어)" })
    subTitleEn!: string;

    @Column({ length: 255, unique: true, comment: "이메일 주소" })
    email!: string;

    @Column({ length: 100, comment: "깃허브 사용자 이름" })
    gitUsername!: string;

    @Column({ name: "image_url", length: 1024, comment: "프로필 이미지 URL" })
    imageUrl!: string;

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

    @OneToMany(() => Career, (career) => career.user)
    careers!: Career[];

    @OneToMany(() => Project, (project) => project.user)
    projects!: Project[];

    @OneToMany(() => PersonalInfo, (info) => info.user)
    personalInfos!: PersonalInfo[];

    @OneToMany(() => Milestone, (milestone) => milestone.user)
    milestones!: Milestone[];
}