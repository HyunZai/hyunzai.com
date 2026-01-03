import { getRepository } from "@/lib/data-source";
import { GuestbookEntity } from "@/entities/GuestbookEntity";
import { GuestbookDto } from "@/dtos/GuestbookDto";

export async function getGuestbooks(
  limit: number = 20,
  offset: number = 0
): Promise<GuestbookEntity[]> {
  const repo = await getRepository(GuestbookEntity);

  return await repo.find({
    order: { createdAt: "DESC" },
    take: limit,
    skip: offset,
  });
}

export async function createGuestbook(
  data: GuestbookDto
): Promise<GuestbookEntity> {
  const repo = await getRepository(GuestbookEntity);
  const guestbook = repo.create(data);
  return await repo.save(guestbook);
}
