import { Expose } from "class-transformer";

export class PersonalInfoDto {
  @Expose()
  id!: number;

  @Expose()
  category!: string;

  @Expose()
  keyName!: string;

  @Expose()
  content!: string;

  @Expose()
  userId!: number;


}
