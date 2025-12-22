import { MilestoneType } from "@/entities/MilestoneEntity";
import { Expose, Transform } from "class-transformer";

export class MilestoneDto {
  @Expose()
  id!: number;

  @Expose()
  type!: MilestoneType;

  @Expose()
  title!: string;

  @Expose()
  @Transform(({ value }) => value && (value instanceof Date ? value.toISOString() : new Date(value).toISOString()))
  startDate!: string;

  @Expose()
  @Transform(({ value }) => value && (value instanceof Date ? value.toISOString() : new Date(value).toISOString()))
  endDate?: string;

  @Expose()
  organization?: string;

  @Expose()
  description?: string;

  @Expose()
  displayOrder!: number;

  @Expose()
  userId!: number;


}
