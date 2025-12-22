import { Expose, Transform } from "class-transformer";

export class ProjectDto {
  @Expose()
  id!: number;

  @Expose()
  title!: string;

  @Expose()
  description!: string;

  @Expose() 
  @Transform(({ value }) => value ? value.split(',').map((s: string) => s.trim()) : [])
  techStack!: string[];

  @Expose()
  demoLink?: string;

  @Expose()
  gitLink?: string;

  @Expose()
  @Transform(({ value }) => value && (value instanceof Date ? value.toISOString() : new Date(value).toISOString()))
  startDate?: string;

  @Expose()
  @Transform(({ value }) => value && (value instanceof Date ? value.toISOString() : new Date(value).toISOString()))
  endDate?: string;

  @Expose()
  displayOrder!: number;

  @Expose()
  @Transform(({ value }) => value && value instanceof Date ? value.toISOString() : value)
  hiddenAt?: string;

  @Expose()
  userId!: number;



  // Frontend helper prop for images that will be mapped from Attachments separately or handled here if we decide to nest them. 
  // But based on entity, Project has ManyToOne User, but Attachments have target_type/target_id. 
  // We will need to map attachments to project manually in the service or just return all attachments in UserDto and let frontend link them. 
  // For simplicity and circular dependencies, it is often easier to have a flat list of attachments in UserDto or nested here if we process it.
  // I will add an optional attachments array here as it's very convenient for the UI.
  @Expose()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attachments?: any[]; 
}
