import { getRepository } from "@/lib/data-source";
import { InquiryEntity } from "@/entities/InquiryEntity";

interface SaveInquiryParams {
  name: string;
  email: string;
  message: string;
}

export async function saveInquiry(
  params: SaveInquiryParams
): Promise<InquiryEntity> {
  const inquiryRepository = await getRepository(InquiryEntity);

  const newInquiry = new InquiryEntity();
  newInquiry.name = params.name;
  newInquiry.email = params.email;
  newInquiry.message = params.message;

  return await inquiryRepository.save(newInquiry);
}
