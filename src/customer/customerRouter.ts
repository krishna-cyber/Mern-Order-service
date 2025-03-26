import { Router } from "express";

const customerRouter = Router();

customerRouter.get("/", (req, res) => {
  res.json({
    success: true,
  });
});
