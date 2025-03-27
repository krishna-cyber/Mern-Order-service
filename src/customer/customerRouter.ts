import { Router } from "express";
import CustomerController from "./customerController";
import authenticate from "../middlewares/authenticate";

const customerRouter = Router();
const customerController = new CustomerController();

customerRouter.get("/", authenticate, (req, res, next) =>
  customerController.getCustomer(req, res, next)
);

export default customerRouter;
