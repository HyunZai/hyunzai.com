import { Gender } from "@/entities/UserEntity";
import { Expose, Transform, Type } from "class-transformer";
import { CareerDto } from "./CareerDto";
import { ProjectDto } from "./ProjectDto";
import { MilestoneDto } from "./MilestoneDto";
import { PersonalInfoDto } from "./PersonalInfoDto";
import { AttachmentDto } from "./AttachmentDto";

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
  gitUsername?: string;

  @Expose()
  gender!: Gender;

  @Expose()
  @Transform(({ value }) => {
    if (!value) return "";
    try {
      return value instanceof Date
        ? value.toISOString()
        : new Date(value).toISOString();
    } catch {
      return "";
    }
  })
  birthDate!: string;

  @Expose()
  address!: string;

  @Expose()
  @Type(() => CareerDto)
  careers!: CareerDto[];

  @Expose()
  @Type(() => ProjectDto)
  projects!: ProjectDto[];

  @Expose()
  @Type(() => MilestoneDto)
  milestones!: MilestoneDto[];

  @Expose()
  @Type(() => PersonalInfoDto)
  personalInfos!: PersonalInfoDto[];

  // Although attachments are polymorphic, we can list them here or map them to their parents.
  // For 'profile' image which was removed from User entity, it's now an attachment with targetType='USER' and targetId=user.id
  // We can include a general attachments list or specific ones.
  // Let's include a catch-all attachments list for now, or the service will map the profile image specifically.
  @Expose()
  @Type(() => AttachmentDto)
  attachments!: AttachmentDto[];
}
