import { AppDataSource } from "@/lib/data-source";
import { InquiryEntity } from "@/entities/InquiryEntity";

interface SaveInquiryParams {
  name: string;
  email: string;
  message: string;
}

export async function saveInquiry(
  params: SaveInquiryParams
): Promise<InquiryEntity> {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const inquiryRepository = AppDataSource.getRepository(InquiryEntity);

  const newInquiry = new InquiryEntity();
  newInquiry.name = params.name;
  newInquiry.email = params.email;
  newInquiry.message = params.message;

  return await inquiryRepository.save(newInquiry);
}
