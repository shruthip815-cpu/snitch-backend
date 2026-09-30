import ImageKit from "imagekit";
import config from "../src/config/config.js";


const client=new ImageKit({
    publicKey: config.IMAGEKIT_PUBLIC_KEY,
    privateKey:config.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint:config.IMAGEKIT_URL_ENDPOINT
});


export const uploadFile= async({buffer,fileName})=>{
    const response=await client.upload({
        file:buffer,
        fileName:fileName,
        folder:"snitch"
    
    })
    return response
}