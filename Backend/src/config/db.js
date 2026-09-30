import mongoose from "mongoose"
import config from "./config.js"

const connectToDB=async()=>{
    await mongoose.connect(config.MONGODB_URI)
    console.log("DataBase Connected")
}

export default connectToDB