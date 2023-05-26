import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contacts } from "../../entities/contacts.entities";
import { User } from "../../entities/user.entities";
import { AppError } from "../../errors";

const listContactsService = async (userId: number): Promise<Contacts[]> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUser: User | null = await userRepository
    .createQueryBuilder("User")
    .where("User.id = :userId", { userId })
    .leftJoinAndSelect("User.contacts", "contacts")
    .getOne();

  if (!findUser) {
    throw new AppError("User not found", 400);
  }

  return findUser.contacts;
};

export { listContactsService };
