import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  auth: jwt.JsonWebTokenError;
}

export interface AuthCookie {
  accessToken: string;
  refreshToken: string;
}
