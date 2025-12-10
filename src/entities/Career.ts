import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Career {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    company!: string;

    @Column()
    startDate!: string;

    @Column({ nullable: true })
    endDate!: string;

    @Column("text")
    description!: string;
}
