import UserModel from "../models/user.model.js";
import { createAccessToken, createRefreshToken, readRefreshToken,readAccessToken } from "../utils/auth.utils.js";
import bcrypt from "bcryptjs";


export const register=async(req,res)=>{
    const {email,name,password}=req.body;
    const isUserAlreadyAvailable=await UserModel.findOne({email})
    if(isUserAlreadyAvailable){
        return res.status(400).json({
            message:"User already exists with this email address",
            error:[
                {
                    field:"email",
                    message:"User already exists with this email address"
                }
            ]
        })

    }

    const user=await UserModel.create({
        email,
        name,
        passwordHash:await bcrypt.hash(password,12)
    })
    const accessToken=createAccessToken({
        role:user.role,
        userId:user._id
    })
    const refreshToken=createRefreshToken({
        role:user.role,
        userId:user._id
    })
    await UserModel.findOneAndUpdate({email},{refereshToken:refreshToken})
    res.cookie("refreshtoken",refreshToken,{httpOnly:true})
    res.status(200).json({
        message:"User created successfully",
        data:{
            user:{
                email,
                name,
                id:user._id
            },
            accessToken
        }
    })
}

export const login=async(req,res)=>{
    const {email,password}=req.body;
    const user=await UserModel.findOne({email})
    if(!user){
        return res.status(400).json({
            message:"Invalid email or password",
        })
    }
    const isPasswordValid=await bcrypt.compare(password,user.passwordHash);
    if(!isPasswordValid){
         return res.status(400).json({
            message:"Invalid email or password",
        })
    }
    const accessToken=createAccessToken(
        {
            role:user.role,
            userId:user._id
        }
    )
    const refreshToken=createRefreshToken(
        {
            role:user.role,
            userId:user._id
        }
    )
    await UserModel.findOneAndUpdate({email},{refereshToken:refreshToken})
    res.cookie("refreshtoken",refreshToken,{httpOnly:true})
    res.status(200).json({
        message:"User Logged In successfully",
        data:{
            user:{
                email:user.email,
                name:user.name,
                id:user._id
            },
            accessToken
        }
    })
}

export const refresh=async(req,res)=>{
    const refreshToken=req.cookies.refreshtoken
    if(!refreshToken){
       return res.status(401).json({
            message:"Refresh Token is required"
        })
    }
    try {
        const decoded=readRefreshToken(refreshToken)
       const {userId,role}=decoded
       const user= await UserModel.findById(userId)
      if(refreshToken!=user.refereshToken){
        await UserModel.findByIdAndUpdate(user._id,{refereshToken:null})
        return res.status(401).json({
            message:"RefreshToken Mismatch"
        })
      }
      const accessToken=createAccessToken({
       userId:user._id,
       role:user.role
     })
       const newRefreshToken = createRefreshToken({
            userId: user._id,
            role: user.role
        });

      await UserModel.findByIdAndUpdate(user._id,{refereshToken:newRefreshToken})
      res.cookie("refreshtoken",newRefreshToken,{httpOnly:true})
      res.status(200).json({
       message:"Tokens Refreshed",
        data:{
           user:{
             email:user.email,
                name:user.name,
                id:user._id
            },
            accessToken
        }
       })
    } catch (error) {
          return  res.status(401).json({
             message:"error in refresh api"
        })
    }
}

export const getMe=async(req,res)=>{
    const {userId,role}=req.user
    const user=await UserModel.findById(userId)
    res.status(200).json({
        message:"user data fetch successfully",
        data:{
            user:{
                id:user._id,
                email:user.email,
                name:user.name
            }

        }
    })
}