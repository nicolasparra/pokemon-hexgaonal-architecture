import { NextFunction, Request, Response } from "express";
import { API_KEY } from "../config";

export function ApiKeyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.headers["api-key"]) {
    return res.status(403).send({ Error: "api-key not found " });
  }

  if (req.headers["api-key"] == API_KEY) {
    next();
  } else {
    return res.status(403).send({ Error: "invalid api-key" });
  }
}
