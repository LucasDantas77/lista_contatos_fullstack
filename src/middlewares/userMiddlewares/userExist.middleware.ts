import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entities";
import { AppError } from "../../errors";

const userExist = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const existsUser = await userRepository.findOne({
    where: {
      id: request.user.id,
    },
  });

  if(!existsUser){
    throw new AppError("User not found", 404)
  }

  return next()
};


export{
    userExist
}