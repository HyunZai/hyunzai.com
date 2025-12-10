import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class PersonalInfo {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    category!: string; // e.g., "Hobby", "TMI", "Skill"

    @Column("text")
    content!: string;

    @ManyToOne(() => User, (user) => user.personalInfos)
    user!: User;
}
