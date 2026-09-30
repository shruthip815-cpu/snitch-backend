import { uploadFile } from "../../services/storage.service.js";
import ProductsModel from "../models/products.model.js";



export const createProduct=async(req,res)=>{
  console.log(req.body)
  console.log(req.files)
  // const fileUrls=[]
  //  for(let i=0;i<req.files.length;i++){
  //   const response = await uploadFile({
  //     buffer:req.files[i].buffer,
  //     fileName:req.files[i].originalname
  //   })
  //   fileUrls.push(response.url)
  // }
   const fileUrls = await Promise.all(
    req.files.map(async (file) => {
        const response = await uploadFile({
            buffer: file.buffer,
            fileName: file.originalname
        });

        return response.url;
    })
);
  console.log(fileUrls)
  const product=await ProductsModel.create({
    title:req.body.title,
    description:req.body.description,
    prices:{
      amount:req.body.prices.amount,
      currency:req.body.prices.currency
    },
    images:fileUrls,
    sizes:req.body.sizes,
    seller:req.user.userId
  })
  res.status(200).json({
    message:"Product created successfully",
    data:{
      product
    }
  })
}

export const listAllProducts=async(req,res)=>{
  const products=await ProductsModel.find({published:true})
  res.status(200).json({
    message:"Product data fetched successfully",
    data:{
      products
    }
  })

}
export const unList=async(req,res)=>{
    const {id}=req.params
    const product=await ProductsModel.findById(id)
    if(!product){
      return res.status(404).json({
        message:"Product not found"
      })
    }
    await ProductsModel.findByIdAndUpdate(id,{published:false})
    return res.status(200).json({
      message:"Product unpublished successfully"
    })
}

export const list=async(req,res)=>{
    const {id}=req.params
    const product=await ProductsModel.findById(id)
    if(!product){
      return res.status(404).json({
        message:"Product not found"
      })
    }
    await ProductsModel.findByIdAndUpdate(id,{published:true})
    return res.status(200).json({
      message:"Product published successfully"
    })
}
    
export const listAllProductsToSeller=async(req,res)=>{
  const products=await ProductsModel.find({})
  res.status(200).json({
    message:"Fetched all products from DB",
    data:{
      products
    }
  })
}
