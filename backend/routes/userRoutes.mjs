import { Router } from "express";
import UserController from "../controllers/userController.mjs";

const userRouter = Router();
userRouter.post('/create',UserController.create);
userRouter.post('/login',UserController.login);
userRouter.get('/getAll',UserController.getAll);
userRouter.get('/getByUsername/:username',UserController.getByUsername);
userRouter.patch('/update/:id',UserController.update);
userRouter.delete('/delete/:id',UserController.delete);

export default userRouter;