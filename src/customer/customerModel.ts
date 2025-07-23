import mongoose from "mongoose";
import { Address, Customer } from "./customerTypes";

const addressSchema = new mongoose.Schema<Address>(
  {
    text: {
      type: String,
      required: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false, timestamps: true }
);

const customerSchema = new mongoose.Schema<Customer>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
    },

    addresses: {
      type: [addressSchema],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
