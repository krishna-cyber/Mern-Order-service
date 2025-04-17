import { NextFunction, Response } from "express";

import createHttpError from "http-errors";
import { AuthRequest } from "../customer/customerTypes";

export default function canAccess(roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { role } = req.auth as AuthRequest;

      if (!roles.includes(role)) {
        const err = createHttpError(
          403,
          "You do not have permission to access this resource"
        );
        next(err);
      }
      next();
    } catch (error) {
      next(error);
      return;
    }
  };
}
