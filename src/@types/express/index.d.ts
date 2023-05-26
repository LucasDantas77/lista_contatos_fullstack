import * as express from "express";
import { number } from "zod";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: number;
      };
    }
  }
}

export {};
