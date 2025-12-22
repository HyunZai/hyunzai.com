import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from "typeorm";

@Entity("guestbooks")
export class GuestbookEntity {
    @PrimaryGeneratedColumn({ type: "bigint", unsigned: true, comment: "방명록 고유 식별자 (PK)" })
    id!: string; // BIGINT in SQL returns string in JS usually, or string/number depending on driver config. TypeORM often handles BIGINT as string to avoid overflow.

    @Column({ length: 50, comment: "작성자 닉네임" })
    nickname!: string;

    @Column({ type: "text", comment: "방명록 내용" })
    content!: string;

    @Column({ name: "ip_address", length: 45, nullable: true, comment: "악성 도배 방지용 IP 주소" })
    ipAddress?: string;

    @CreateDateColumn({ name: "created_at", comment: "생성 일시" })
    @Index("idx_created_at")
    createdAt!: Date;
}
