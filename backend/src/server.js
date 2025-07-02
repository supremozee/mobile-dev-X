import express from "express"
import { ENV } from "./config/env.js"
import { connectDB } from "./config/db.js"
import cors from "cors"
import {clerkMiddleware} from "@clerk/express"
import UserRoute from "./routes/user.routes.js"
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(clerkMiddleware())
app.get("/", (req, res)=> res.send("Hello"))
app.use("/api/users", UserRoute)
const startServer = async()=> {
    await connectDB()
    app.listen(ENV.PORT, ()=> console.log(`server is up and running on port:${ENV.PORT}`))

}
startServer().catch((err) => {
    console.error(err);
    process.exit(1);
});
