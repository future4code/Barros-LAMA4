import { Request, Response } from "express"
import express from "express"
import { ShowBusiness } from "../business/ShowBusiness"
import { ShowController } from "../controller/ShowController"
import { ShowDataBase } from "../data/ShowDataBase"


export const showRouter = express.Router()

const showDatabase = new ShowDataBase()
const showBusiness = new ShowBusiness()
const showController = new ShowController(showBusiness)

showRouter.post("/createShow", (req, res) => showController.createShow(req, res))
