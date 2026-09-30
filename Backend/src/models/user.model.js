import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
    },
    passwordHash:{
        type:String,
        required:true,
        minLength:[6,"Password must have minimum 6 characters"]
    },
    role:{
        type:String,
        default:"user",
        enum:["user","seller"]
    },
    refereshToken:{
        type:String,
    }

})

const UserModel=mongoose.model("users",userSchema)

export default UserModel