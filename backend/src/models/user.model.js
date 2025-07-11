import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
 clerkId:{
    type: String,
    required:true,
    unique:true
 },
 email: {
    type:String,
    required:true,
    unique:true,
     match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
 },
  firstName: {
    type:String,
    required:true,
 },
 lastName: {
    type:String,
    required:true,
 },
 userName: {
    type:String,
    required:true,
    unique:true,
     unique:true,
     minLength: 3,
     maxLength: 30,
     match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores']
 },
 profilePicture: {
    type:String,
    default: ""
 },
 bannarImage: {
    type:String,
    default: ""
 },
 bio: {
    type:String,
    default: "",
    maxLength: 160
 },
 location: {
    type:String,
    default:""
 },
 followers: [
    {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User"
    }
 ],
 following: [
    {
    type:mongoose.Schema.Types.ObjectId,
    ref: "User"
    }
 ]

},
{timestamps: true});
const User = mongoose.model("User", userSchema)
export default User