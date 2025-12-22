import { AttachmentType } from "@/entities/AttachmentEntity";
import { Expose } from "class-transformer";
export class AttachmentDto {
  @Expose()
  id!: number;

  @Expose()
  targetId!: number;

  @Expose()
  targetType!: string;

  @Expose()
  fileUrl!: string;

  @Expose()
  fileType!: AttachmentType;

  @Expose()
  originalName?: string;

  @Expose()
  fileSize?: number;

  @Expose()
  displayOrder!: number;


}
