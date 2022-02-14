import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../config";

export function JWTMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization) {
    return res.status(403).send({ Error: "Must be logged in" });
  }

  const token = req.headers.authorization.split(" ")[1];
  const prefix = req.headers.authorization.split(" ")[0];

  if (prefix !== "Bearer") {
    return res.status(401).json({
      mensaje: "Not authorized (Bearer)",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized",
      err: error.message,
    });
  }
}
