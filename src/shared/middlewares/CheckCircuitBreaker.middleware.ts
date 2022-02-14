import { NextFunction, Request, Response } from "express";

export function CheckCircuitBreakerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (
    "CLOSED" === global.circuitBreaker._state &&
    Date.now() < global.circuitBreaker.tryTriggerFromCloseAt!
  ) {
    return res.status(500).send({
      message: "Breaker is closed",
    });
  } else {
    global.circuitBreaker.fire(true);
  }

  next();
}
