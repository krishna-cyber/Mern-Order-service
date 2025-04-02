import { Response } from "express";
import { Request } from "express-jwt";
import Customer from "./customerModel";
import { AuthRequest } from "./customerTypes";

class CustomerController {
  getCustomer = async (req: Request, res: Response) => {
    const {
      sub: userId,
      email,
      firstName,
      lastName,
      tenantId,
    } = (req.auth as AuthRequest) || {};
    if (!userId) {
      return res.status(400).json({ success: false, message: "Invalid token" });
    }

    //todo : implement service layer
    const customer = await Customer.findOne({ userId });

    if (!customer) {
      const newCustomer = Customer.create({
        userId,
        firstName,
        lastName,
        email,
        tenantId,
        addresses: [],
      });

      //todo: logging customer create
      return res.json(newCustomer);
    }

    res.json({
      success: true,
    });
  };
}

export default CustomerController;
