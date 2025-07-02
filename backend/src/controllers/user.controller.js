import asynchHandler from "express-async-handler";
import User from "../models/user.model.js"
import Notification from "../models/notification.model.js"
import { clerkClient, getAuth } from "@clerk/express";


export const getUserProfile = asynchHandler(async (req, res)=> {
    const {username} = req.params;
    const user = await User.findOne({username})
    if(!user) return res.status(404).json({error: "User not found"})
    
    res.status(200).json({user})
})

export const updateProfile = asynchHandler(async (req, res)=> {
  const {userId} = getAuth(req)
  const user = await User.findOneAndUpdate({clerkId: userId}, req.body, {new: true})
  if(!user) return res.status(404).json({error: "user not found"})

    res.status(200).json({user});

})

export const syncUser = asynchHandler(async(req, res)=> {
    const {userId} = getAuth(req)
    const existingUser = await User.findOne({clerkId:userId})
    if(existingUser) {
        return res.status(200).json({user:existingUser, message: "User Already exist"})
    }

    const clerkUser = await clerkClient.users.getUser(userId)
    const userData = {
        clerkId:userId,
        email:clerkUser.emailAddresses[0].emailAddress,
        firstName:clerkUser.firstName || "",
        lastName: clerkUser.lastName || "",
        username: clerkUser.emailAddresses[0].emailAddress.split("@")[0],
        profilePicture: clerkUser.imageUrl || ""
    }
    const user = await User.create(userData)
    res.status(201).json({user, message: "User created successfully"})
})

export const getCurrentUser = asynchHandler(async (req, res)=> {
    const {userId} = getAuth(req)
    const user = await User.findOne({clerkId: userId})
    if(!user) return res.status(404).json({error: "User not found"})
    res.status(200).json({user});     
})

export const followUser = asynchHandler(async (req, res)=> {
    const {userId} = getAuth(req)
    const {targetUserId} = req.params;

    if(userId === targetUserId) return res.status(400).json({error: "You cannot follow yourself"})
     const currentUser = await User.findOne({clerkId: userId});
    const targetUser = await User.findById(targetUserId)
    if(!currentUser || !targetUser) return res.status(404).json({error: "User not found"})    
        const isFollwing = currentUser.following.includes(targetUserId)
    if(isFollwing) {
        await User.findByIdAndUpdate(currentUser._id, {
            $pull: {following: targetUserId},
        })
        await User.findByIdAndUpdate(targetUserId, {
            $pull: {followers:currentUser._id}
        })
    } else {
        await User.findByIdAndUpdate(currentUser._id, {
            $push: {following:targetUserId}
        });
        await User.findByIdAndUpdate(targetUserId, {
            $push: {followers:currentUser._id}
        })
        await Notification.create({
            from:currentUser._id,
            to:targetUserId,
            type: "follow"
        })
    }
    res.status(200).json({
        message: isFollwing ? "User unfollowed successfully": "User followed successfully"
    })
})