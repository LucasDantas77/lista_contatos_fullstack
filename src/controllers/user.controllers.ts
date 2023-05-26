import { Request, Response } from "express";
import { createUserService } from "../services/users/createUser.services";
import { listUserService } from "../services/users/listUser.service";
import { updateUserService } from "../services/users/updateUser.service";
import { deleteUserService } from "../services/users/deleteUser.service";
import { AppError } from "../errors";

const createUserController = async (request: Request, response: Response) => {
  const userData = request.body;
  const newUserData = await createUserService(userData);
  return response.status(201).json(newUserData);
};

const listUserController = async (request: Request, response: Response) => {
  const userId = request.user.id;
  const userInfo = await listUserService(userId);
  return response.status(200).json(userInfo);
};

const updateUserController = async (request: Request, response: Response) => {
  const userData = request.body;
  const userId = request.user.id;

  const updateUser = await updateUserService(userData, userId);

  return response.json(updateUser);
};

const deleteUserController = async (request: Request, response: Response) => {
  try {
    const userId = request.user.id;
    await deleteUserService(userId);

    return response.status(204).send();
  } catch (error) {
    throw new AppError("User not exist", 400);
  }
};
export {
  createUserController,
  listUserController,
  updateUserController,
  deleteUserController,
};
