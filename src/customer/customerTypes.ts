import { JwtPayload } from "jsonwebtoken";

export interface Address {
  text: string;
  isDefault: boolean;
}

export interface Customer {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  addresses: Address[];
  createdAt: Date;
  updatedAt: Date;
}
export interface AuthRequest extends JwtPayload, Customer {
  role: string;
}
