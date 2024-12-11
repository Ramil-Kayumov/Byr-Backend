import { Router } from "express";
import userRouter from "./userRoutes.mjs";
import UslugiRouter from "./UslugiRouter.mjs";
import OrderRouter from "./orderRouter.mjs";

const router = Router();
router.use('/user',userRouter);
router.use('/uslugi',UslugiRouter);
router.use('/order',OrderRouter)

export default router;