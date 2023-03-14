import express from "express"
import { BandCreateBusiness } from "../business/BandCreateBusiness"
import { BandCreateController } from "../controller/BandCreateController"
import { BandCreateDatabase } from "../data/BandCreateDataBase"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"


export const bandRouter = express.Router()

const bandDatabase = new BandCreateDatabase()
const bandBusiness = new BandCreateBusiness(bandDatabase, new Authenticator(), new IdGenerator())
const bandController = new BandCreateController(bandBusiness)

bandRouter.post("/create", (req, res) => bandController.createBand(req, res))
bandRouter.get("/info", (req, res) => bandController.getBandInfo(req, res))