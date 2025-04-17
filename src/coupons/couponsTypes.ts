import { Request } from "express";

export interface Address {
  text: string;
  isDefault: boolean;
}

export interface Coupons {
  title: string;
  code: string;
  discount: number;
  validUpto: Date;
  tenantId: string;
}

export interface CouponRequest extends Request {
  title: string;
  code: string;
  discount: number;
  tenantId: string;
  validUpto: Date;
}

export interface VerifyRequest extends Request {
  code: string;
  tenantId: string;
}
