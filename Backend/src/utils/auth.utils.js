import config from "../config/config.js";
import jwt from "jsonwebtoken"

export const createAccessToken=({role,userId})=>{
    const accessToken=jwt.sign({role,userId},config.ACCESS_TOKEN,{expiresIn:"15Min"})
    return accessToken
}

export const createRefreshToken=({role,userId})=>{
    const refreshToken=jwt.sign({role,userId},config.REFRESH_TOKEN,{expiresIn:"7Days"})
    return refreshToken
}

export const readRefreshToken=(refreshToken)=>{
    return jwt.verify(refreshToken,config.REFRESH_TOKEN)
}

export const readAccessToken=(accessToken)=>{
    return jwt.verify(accessToken,config.ACCESS_TOKEN)
}