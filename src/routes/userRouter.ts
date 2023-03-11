import express from "express";
import { UserController } from "../controller/UserController";
import { BandRegisterController } from "../controller/BandRegisterController";


export const userRouter = express.Router();

const userController = new UserController();
const bandRegisterController = new BandRegisterController();

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.post("/createBandRegister",bandRegisterController );