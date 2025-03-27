import { NextFunction, Request, Response } from "express";

class CustomerController {
  getCustomer = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default CustomerController;
