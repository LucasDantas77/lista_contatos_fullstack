import { Request, Response } from "express";
import { login } from "../interfaces/login.interfaces";
import createLoginService from "../services/login/login.users.services";

const createLogincontroller = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const loginData: login = request.body;

  const token = await createLoginService(loginData);

  return response.json({
    token: token,
  });
};

export { createLogincontroller };
