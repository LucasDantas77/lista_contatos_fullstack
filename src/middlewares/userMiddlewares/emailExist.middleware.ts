import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entities";
import { AppError } from "../../errors";

const emailExists = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const { email } = request.body;

  const existEmail = await userRepository.findOne({ where: { email } });

  if (existEmail) {
    throw new AppError("Email already exists", 409);
  }

  return next();
};

export { emailExists };
