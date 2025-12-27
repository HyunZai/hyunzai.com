import { Expose, Transform } from "class-transformer";

export class InquiryDto {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  email!: string;

  @Expose()
  message!: string;

  @Expose()
  isResponded!: boolean;

  @Expose()
  @Transform(
    ({ value }) =>
      value &&
      (value instanceof Date
        ? value.toISOString()
        : new Date(value).toISOString())
  )
  createdAt!: string;
}
