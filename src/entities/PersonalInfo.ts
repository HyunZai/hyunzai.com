import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class PersonalInfo {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    category!: string; // e.g., "Hobby", "TMI", "Skill"

    @Column("text")
    content!: string;
}
