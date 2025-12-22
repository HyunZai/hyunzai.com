import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from "typeorm";

export enum AttachmentType {
    IMAGE = "IMAGE",
    FILE = "FILE",
    VIDEO = "VIDEO",
    PDF = "PDF"
}

@Entity("attachments")
@Index("idx_target", ["targetType", "targetId"])
@Index("idx_order", ["displayOrder"])
export class AttachmentEntity {
    @PrimaryGeneratedColumn({ type: "int", unsigned: true, comment: "파일 고유 식별자 (PK)" })
    id!: number;

    @Column({ name: "target_id", type: "int", unsigned: true, comment: "연결된 대상 테이블의 PK" })
    targetId!: number;

    @Column({ name: "target_type", length: 50, comment: "연결된 대상 구분 (예: PROJECT, CAREER, USER, MILESTONE)" })
    targetType!: string;

    @Column({ name: "file_url", length: 1024, comment: "파일 또는 이미지의 URL(경로)" })
    fileUrl!: string;

    @Column({ name: "file_type", type: "enum", enum: AttachmentType, default: AttachmentType.IMAGE, comment: "파일 형식 구분" })
    fileType!: AttachmentType;

    @Column({ name: "original_name", length: 255, nullable: true, comment: "사용자가 업로드한 실제 파일명" })
    originalName?: string;

    @Column({ name: "file_size", type: "int", unsigned: true, nullable: true, comment: "파일 용량 (Byte)" })
    fileSize?: number;

    @Column({ name: "display_order", type: "int", unsigned: true, default: 0, comment: "표시 순서" })
    displayOrder!: number;

    @CreateDateColumn({ name: "created_at", comment: "생성 일시" })
    createdAt!: Date;
}
