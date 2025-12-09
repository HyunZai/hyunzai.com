import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column("text")
    description!: string;

    @Column("simple-array")
    techStack!: string[];

    @Column({ nullable: true })
    link!: string;

    @ManyToOne(() => User, (user) => user.projects)
    user!: User;
}
