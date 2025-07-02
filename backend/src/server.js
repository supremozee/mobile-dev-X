import express from "express"
import { ENV } from "./config/env.js"
import { connectDB } from "./config/db.js"
import cors from "cors"
import {clerkMiddleware} from "@clerk/express"
import UserRoute from "./routes/user.routes.js"
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import notificationRoutes from "./routes/notification.route.js";

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(clerkMiddleware())
app.get("/", (req, res)=> res.send("Hello"))
app.use("/api/users", UserRoute)
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationRoutes);
const startServer = async()=> {
    await connectDB()
    if (ENV.NODE_ENV !== "production") {
      app.listen(ENV.PORT, () => console.log("Server is up and running on PORT:", ENV.PORT));
    }
}
startServer().catch((err) => {
    console.error(err);
    process.exit(1);
});
