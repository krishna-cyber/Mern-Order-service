import express, { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import logger from "./config/logger";
import customerRouter from "./customer/customerRouter";

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json());

app.use(morgan("dev"));

app.use("/customer", customerRouter);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, err.statusCode);
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    errors: [
      {
        type: err.name,
        message: err.message,
        path: "",
        location: "",
      },
    ],
  });
});

export default app;
