import { Router } from "express";
import CustomerController from "./customerController";

const customerRouter = Router();
const customerController = new CustomerController();

customerRouter.get("/", (req, res, next) =>
  customerController.getCustomer(req, res, next)
);

export default customerRouter;
