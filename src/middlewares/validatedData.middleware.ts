import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";

const dataIsValidMiddleware =
  (schema: ZodTypeAny) =>
  (request: Request, response: Response, next: NextFunction) => {
    const validatedDate = schema.parse(request.body);

    request.body = validatedDate;

    return next();
  };

export { dataIsValidMiddleware };