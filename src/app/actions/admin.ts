"use server";

import { getRepository } from "@/lib/data-source";
import { InquiryEntity } from "@/entities/InquiryEntity";
import { GuestbookEntity } from "@/entities/GuestbookEntity";

import { instanceToPlain, plainToInstance } from "class-transformer";
import { InquiryDto } from "@/dtos/InquiryDto";
import { GuestbookDto } from "@/dtos/GuestbookDto";

export async function getInquiries() {
  const inquiryRepo = await getRepository(InquiryEntity);
  const inquiries = await inquiryRepo.find({
    order: { createdAt: "DESC" },
  });

  return instanceToPlain(
    plainToInstance(InquiryDto, inquiries, {
      excludeExtraneousValues: true,
    })
  ) as InquiryDto[];
}

export async function deleteInquiry(id: number) {
  try {
    const inquiryRepo = await getRepository(InquiryEntity);
    await inquiryRepo.delete(id);
    return { success: true };
  } catch (error) {
    console.error("Failed to delete inquiry:", error);
    return { success: false, error: "Failed to delete inquiry" };
  }
}

export async function getGuestbookEntries() {
  const guestbookRepo = await getRepository(GuestbookEntity);
  const entries = await guestbookRepo.find({
    order: { createdAt: "DESC" },
  });

  return instanceToPlain(
    plainToInstance(GuestbookDto, entries, {
      excludeExtraneousValues: true,
    })
  ) as GuestbookDto[];
}

export async function deleteGuestbookEntry(id: string) {
  try {
    const guestbookRepo = await getRepository(GuestbookEntity);
    await guestbookRepo.delete(id);
    return { success: true };
  } catch (error) {
    console.error("Failed to delete guestbook entry:", error);
    return { success: false, error: "Failed to delete guestbook entry" };
  }
}

export async function toggleInquiryStatus(id: number, isResponded: boolean) {
  try {
    const inquiryRepo = await getRepository(InquiryEntity);
    await inquiryRepo.update(id, { isResponded });
    return { success: true };
  } catch (error) {
    console.error("Failed to toggle inquiry status:", error);
    return { success: false, error: "Failed to toggle inquiry status" };
  }
}
