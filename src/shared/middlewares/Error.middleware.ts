import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";

function ErrorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) {
  global.circuitBreaker.fire(false);
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  return response.status(status).send({
    status,
    message,
  });
}

export default ErrorMiddleware;
