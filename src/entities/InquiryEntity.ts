import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from "typeorm";

@Entity("inquiries")
export class InquiryEntity {
    @PrimaryGeneratedColumn({ type: "int", unsigned: true, comment: "문의 고유 식별자 (PK)" })
    id!: number;

    @Column({ length: 255, comment: "문의를 남긴 사용자 이름" })
    name!: string;

    @Column({ length: 255, comment: "문의를 남긴 사용자 이메일" })
    email!: string;

    @Column({ type: "text", comment: "문의 내용" })
    message!: string;

    @Column({ name: "is_responded", type: "tinyint", width: 1, default: 0, comment: "답변 완료 여부 (0:미답변, 1:답변 완료)" })
    @Index("idx_responded")
    isResponded!: boolean;

    @CreateDateColumn({ name: "created_at", comment: "문의 생성 일시" })
    @Index("idx_created_at")
    createdAt!: Date;
}