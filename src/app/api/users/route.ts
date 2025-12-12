import { NextResponse } from "next/server";
import { AppDataSource } from "@/lib/data-source";
import { User } from "@/entities/User";
import { UserDto } from "@/dtos/UserDto";
import { plainToInstance } from "class-transformer";

export async function GET() {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find({
      order: {
        updatedAt: "DESC",
      },
      take: 1,
    });
    const user = users[0];

    const userDto = plainToInstance(UserDto, user, {
      excludeExtraneousValues: true,
    });

    return NextResponse.json(userDto);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
