import CartModel from "../models/cart.model.js"
import ProductsModel from "../models/products.model.js"

export const addToCart=async(req,res)=>{
    const {productId,quantity,size}=req.body
    const product=await ProductsModel.findById(productId)
    if(!product){
        return res.status(404).json({
            message:"Product not found",
        })
    }
    const selectedSize=product.sizes.find(s=>s.size==size)
    if(!selectedSize){
        return res.status(400).json({
            message:"Invalid Size"
        })
    }
    if(selectedSize.stock<quantity){
        return res.status(400).json({
            message:"Insufficient stock"
        }) 
    }
    const cart=(await CartModel.findOne({user:req.user.userId})) ?? (await CartModel.create({user:req.user.userId}))
    const productInCart=cart.products.find(p=>(p.product?.toString()===productId) && (p.size==size))
    if(productInCart){
      if((productInCart.quantity)+quantity>selectedSize.stock){
        return res.status(400).json({
            message:"Insufficient stock"
        })}
      await CartModel.findOneAndUpdate({
        user:req.user.userId,
        "products.product":productId,
        "products.size":size
      },{
        $inc:{
            "products.$.quantity":quantity
        }
      })
      return res.status(200).json({
        message:"Product quantity updated in cart"
      })
    
}
  await CartModel.findOneAndUpdate({user:req.user.userId},{
    $push:{
        products:{
            product:productId,
            quantity:quantity,
            size:size
        }
    }
  })

   return res.status(200).json({
        message:"Product added to cart",
       data:{
        cart
       }
      })

}
export const getCart=async(req,res)=>{
    const cart=(await CartModel.findOne({user:req.user.userId})) ?? (await CartModel.create({user:req.user.userId}))
     return res.status(200).json({
        message:"Product added to cart",
       data:{
        cart
       }
      })
}

