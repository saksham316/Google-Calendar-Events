import { NextFunction, Request, RequestHandler, Response } from "express";

export const asyncErrorHandler = (func: RequestHandler) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ): void | Promise<void> => {
    Promise.resolve(func(req, res, next)).catch((error) => next(error));
  };
};
