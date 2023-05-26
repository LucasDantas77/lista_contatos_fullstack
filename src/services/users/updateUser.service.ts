import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entities";
import { iUserOmitPass } from "../../interfaces/user.interfaces";
import { passwordOmit } from "../../schemas/user.schemas";
import { AppError } from "../../errors";

const updateUserService = async (
  userData: Partial<User>,
  userId: number
): Promise<iUserOmitPass> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const oldUser: any = await userRepository.findOneBy({
    id: userId,
  });

  const user = userRepository.merge(oldUser, userData);
  if (oldUser.fone && typeof oldUser.fone === "string") {
    const parsedPhone = parseInt(oldUser.fone);
    if (!isNaN(parsedPhone)) {
      oldUser.fone = parsedPhone;
    } else {
      throw new AppError("Invalid phone number", 400);
    }
  }

  await userRepository.save(user);

  const userUpdate = passwordOmit.parse(user);

  return userUpdate;
};

export { updateUserService };
