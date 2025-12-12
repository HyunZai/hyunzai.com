import { Gender } from "@/entities/User";
import { Expose, Transform } from "class-transformer";

export class UserDto {
  @Expose()
  id!: number;

  @Expose()
  nameKo!: string;

  @Expose()
  nameEn!: string;

  @Expose()
  subTitleKo!: string;

  @Expose()
  subTitleEn!: string;

  @Expose()
  email!: string;

  @Expose()
  gitUsername!: string;

  @Expose()
  imageUrl!: string;

  @Expose()
  gender!: Gender;

  @Expose()
  @Transform(({ value }) => {
    if (!value) return "";
    try {
      return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
    } catch {
      return "";
    }
  })
  birthDate!: string;

  @Expose()
  address!: string;
}