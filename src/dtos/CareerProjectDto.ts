import { Expose, Transform } from "class-transformer";

export class CareerProjectDto {
  @Expose()
  id!: number;

  @Expose()
  careerId!: number;

  @Expose()
  title!: string;

  @Expose()
  description!: string;

  @Expose()
  role?: string;

  @Expose()
  @Transform(({ value }) => value ? value.split(',').map((s: string) => s.trim()) : [])
  techStack?: string[];

  @Expose()
  @Transform(({ value }) => value && (value instanceof Date ? value.toISOString() : new Date(value).toISOString()))
  startDate?: string;

  @Expose()
  @Transform(({ value }) => value && (value instanceof Date ? value.toISOString() : new Date(value).toISOString()))
  endDate?: string;


}
