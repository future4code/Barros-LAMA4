import express from "express";
import { UserController } from "../controller/UserController";
import { BandRController } from "../controller/BandRController";


export const userRouter = express.Router();

const userController = new UserController();
const bandRController = new BandRController();

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.post("/createBandRegister",bandRController );