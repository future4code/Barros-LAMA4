import express from "express"
import { ShowBusiness } from "../business/ShowBusiness"
import { ShowController } from "../controller/ShowController"
import { BandCreateDatabase } from "../data/BandCreateDataBase"
import { ShowsDatabase } from "../data/ShowDataBase"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"
import { CreateShowTime } from "../model/CreateShowTime"



export const showRouter = express.Router()

const showsDatabase = new ShowsDatabase()
const bandDatabase = new BandCreateDatabase()
const showBusiness = new ShowBusiness(showsDatabase, bandDatabase, new Authenticator(), new IdGenerator(), new CreateShowTime(showsDatabase))
const showController = new ShowController(showBusiness)

showRouter.post("/create", (req, res) => showController.createConcert(req, res))
showRouter.get("/", (req, res) => showController.getAllShows(req, res))