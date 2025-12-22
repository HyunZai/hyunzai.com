import { Expose, Type, Transform } from "class-transformer";
import { CareerProjectDto } from "./CareerProjectDto";

export class CareerDto {
  @Expose()
  id!: number;

  @Expose()
  company!: string;

  @Expose()
  department?: string;

  @Expose()
  jobTitle!: string;

  @Expose()
  @Transform(({ value }) => value && (value instanceof Date ? value.toISOString() : new Date(value).toISOString()))
  startDate!: string;

  @Expose()
  @Transform(({ value }) => value && (value instanceof Date ? value.toISOString() : new Date(value).toISOString()))
  endDate?: string;

  @Expose()
  description?: string;

  @Expose()
  userId!: number;

  @Expose()
  @Type(() => CareerProjectDto)
  careerProjects!: CareerProjectDto[];
}
