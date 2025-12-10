import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Career } from "./Career";
import { Project } from "./Project";
import { PersonalInfo } from "./PersonalInfo";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column("text", { nullable: true })
    bio!: string; // Biography

    @OneToMany(() => Career, (career) => career.user)
    careers!: Career[];

    @OneToMany(() => Project, (project) => project.user)
    projects!: Project[];

    @OneToMany(() => PersonalInfo, (info) => info.user)
    personalInfos!: PersonalInfo[];
}
