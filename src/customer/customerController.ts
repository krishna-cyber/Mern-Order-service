import { NextFunction, Response } from "express";
import { AuthRequest } from "./customerTypes";
import { Request } from "express-jwt";
import Customer from "./customerModel";

class CustomerController {
  getCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        sub: userId,
        email,
        firstName,
        lastName,
        addresses,
      } = req.auth as AuthRequest;

      console.log(req.auth);

      //todo : implement services layer

      const customer = await Customer.findOne({ userId });

      if (!customer) {
        const newCustomer = Customer.create({
          firstName,
          lastName,
          addresses: addresses || [],
          email,
        });

        //todo: logging after new customer create
        res.json(newCustomer);
        return;
      }
      res.json({
        success: true,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default CustomerController;
