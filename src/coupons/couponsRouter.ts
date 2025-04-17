import { RequestHandler, Router } from "express";
import CouponController from "./couponsController";
import authenticate from "../middlewares/authenticate";
import canAccess from "../middlewares/canAccess";

const couponRouter = Router();
const couponController = new CouponController();

couponRouter.post(
  "/",
  authenticate,
  canAccess(["admin", "manager"]) as unknown as RequestHandler,
  (req, res, next) => couponController.createCoupon(req, res, next)
);
couponRouter.post("/verify", authenticate, (req, res, next) =>
  couponController.verify(req, res, next)
);

export default couponRouter;
