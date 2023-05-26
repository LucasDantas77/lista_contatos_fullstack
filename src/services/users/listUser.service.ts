import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entities";
import { UserAll } from "../../interfaces/user.interfaces";
import { AppError } from "../../errors";

const listUserService = async (userId: number): Promise<UserAll> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const userFind: User | null = await userRepository
    .createQueryBuilder("User")
    .where("User.id = :id", { id: userId })
    .leftJoinAndSelect("User.contacts", "contacts")
    .getOne();

  if (!userFind) {
    throw new AppError("User not found", 404);
  }
  return userFind;
};

export { listUserService };
