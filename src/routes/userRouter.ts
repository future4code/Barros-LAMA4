import { Request,Response} from "express";
import { UserController } from "../controller/UserController";
import { BandRController } from "../controller/BandRController";
import  express from "express"


export const userRouter = express.Router();

const userController = new UserController();
const bandRController = new BandRController();

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.post("/createBandRegister", bandRController.createBand);