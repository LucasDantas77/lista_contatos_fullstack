import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entities";
import { AppError } from "../../errors";

const deleteUserService = async (id: number): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const softUser = await userRepository.findOneBy({
    id: id,
  });
  
  if (!softUser) {
    throw new AppError("User not exist", 404);
  }

  await userRepository.remove(softUser);
};

export { deleteUserService };
