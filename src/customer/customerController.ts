import { NextFunction, Response } from "express";
import { AuthRequest } from "./customerTypes";
import { Request } from "express-jwt";
import Customer from "./customerModel";
import createHttpError from "http-errors";

class CustomerController {
  getCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.auth) {
        throw createHttpError(401, "Unauthorized");
      }
      const {
        sub: userId,
        email,
        firstName,
        lastName,
        addresses,
      } = req.auth as AuthRequest;

      //todo : implement services layer

      const customer = await Customer.findById(userId);

      if (!customer) {
        const newCustomer = await Customer.create({
          _id: userId,
          firstName,
          lastName,
          addresses: addresses ?? [],
          email,
        });

        //todo: logging after new customer create
        res.json(newCustomer);
        return;
      }
      res.json(customer);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  addAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.auth?.sub;

      if (!userId) {
        throw new Error("User ID is missing from the authentication payload.");
      }

      //todo: implement services layer
      const customer = await Customer.findByIdAndUpdate(
        userId,
        {
          $push: {
            addresses: {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              text: req.body.address,

              //implement is default in future
              isDefault: false,
            },
          },
        },
        { new: true }
      );

      //todo:logging

      res.json({
        success: true,
        customer,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default CustomerController;
