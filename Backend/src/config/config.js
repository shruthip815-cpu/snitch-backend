import dotenv from "dotenv"
dotenv.config()
const config={
   MONGODB_URI: process.env.MONGODB_URI,
   ACCESS_TOKEN:process.env.ACCESS_TOKEN,
   REFRESH_TOKEN:process.env.REFRESH_TOKEN,
   IMAGEKIT_PRIVATE_KEY:process.env.IMAGEKIT_PRIVATE_KEY,
   IMAGEKIT_PUBLIC_KEY:process.env.IMAGEKIT_PUBLIC_KEY,
   IMAGEKIT_URL_ENDPOINT:process.env.IMAGEKIT_URL_ENDPOINT
}


export default config