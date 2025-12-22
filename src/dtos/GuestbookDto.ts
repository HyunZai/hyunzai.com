import { Expose } from "class-transformer";

export class GuestbookDto {
  @Expose()
  id!: string;

  @Expose()
  nickname!: string;

  @Expose()
  content!: string;


}
