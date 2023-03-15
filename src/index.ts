import { app } from "./app"
import { bandRouter } from "./routes/bandRouter"
import { showRouter } from "./routes/showRouter"
import { userRouter } from "./routes/userRouter"



app.use("/users", userRouter)
app.use("/bands", bandRouter)
app.use("/show", showRouter)