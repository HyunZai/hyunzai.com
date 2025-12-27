import { AppDataSource } from "@/lib/data-source";
import { GuestbookEntity } from "@/entities/GuestbookEntity";
import { GuestbookDto } from "@/dtos/GuestbookDto";

export async function getGuestbooks(
  limit: number = 20,
  offset: number = 0
): Promise<GuestbookEntity[]> {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  const repo = AppDataSource.getRepository(GuestbookEntity);

  return await repo.find({
    order: { createdAt: "DESC" },
    take: limit,
    skip: offset,
  });
}

export async function createGuestbook(
  data: GuestbookDto
): Promise<GuestbookEntity> {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  const repo = AppDataSource.getRepository(GuestbookEntity);
  const guestbook = repo.create(data);
  return await repo.save(guestbook);
}
