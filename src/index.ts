import { app } from "./app"
import { bandRouter } from "./routes/bandRouter"
import { userRouter } from "./routes/userRouter"




app.use("/users", userRouter)
app.use("/bands", bandRouter)