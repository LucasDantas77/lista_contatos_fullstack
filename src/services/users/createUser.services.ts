import { Repository } from "typeorm";
import { User } from "../../entities/user.entities";
import { iUserOmitPass } from "../../interfaces/user.interfaces";
import { AppDataSource } from "../../data-source";
import { passwordOmit } from "../../schemas/user.schemas";

const createUserService = async (userData: User): Promise<iUserOmitPass> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User = userRepository.create(userData);
  await userRepository.save(user);
  const newUser = passwordOmit.parse(user);
  return newUser;
};

export { createUserService };



// const updateUser = userRepository.merge(userToUpdate, userData)
//   if (userToUpdate.phone && typeof userToUpdate.phone === 'string') {
//     const parsedPhone = parseInt(userToUpdate.phone);
//     if (!isNaN(parsedPhone)) {
//       userToUpdate.phone = parsedPhone;
//     } else {
//       throw new AppError('Invalid phone number', 400);
//     }
//   }
