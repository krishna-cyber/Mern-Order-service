import mongoose from "mongoose";
import { Coupons } from "./couponsTypes";

const couponsSchema = new mongoose.Schema<Coupons>(
  {
    title: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      unique: true,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    validUpto: {
      type: Date,
      required: true,
    },
    tenantId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Create index for faster lookUp
couponsSchema.index({ tenantId: 1, code: 1 }, { unique: true });

const Coupons = mongoose.model("Coupons", couponsSchema);

export default Coupons;
