import AsyncHandler from "express-async-handler"

export const protectedRoute = AsyncHandler( async(req, res, next)=> {
     if(!req.auth().isAuthenticated) {
        return res.status(401).json({message:"Unauthorised - you must be logged in"})
    }
    next()
})