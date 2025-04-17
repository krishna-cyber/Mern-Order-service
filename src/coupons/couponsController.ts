import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import createHttpError from "http-errors";
import Coupons from "./couponsModel";
import { CouponRequest, VerifyRequest } from "./couponsTypes";

class CouponController {
  createCoupon = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, code, tenantId, validUpto, discount } =
        req.body as CouponRequest;

      if (tenantId !== req.auth?.sub) {
        const err = createHttpError(401, "Not authorize to access resource");
        throw err;
      }

      const coupon = await new Coupons({
        title,
        code,
        discount,
        tenantId,
        validUpto,
      }).save();

      res.json({
        coupon,
        message: "Coupon created Successful",
      });
    } catch (error) {
      next(error);
    }
  };

  verify = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code, tenantId } = req.body as VerifyRequest;
      const coupon = await Coupons.findOne({ code, tenantId });

      // todo :use service system with dependency injection
      if (!coupon) {
        const err = createHttpError(400, "Token doesn't exist or expires");
        throw err;
      }
      const currentDate = new Date();
      const couponDate = new Date(coupon.validUpto);
      const isValid = currentDate > couponDate;

      if (!isValid) {
        const err = createHttpError(400, "Token doesn't exist or expires");
        throw err;
      }

      res.json({
        success: true,
        isValid,
        coupon,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default CouponController;
