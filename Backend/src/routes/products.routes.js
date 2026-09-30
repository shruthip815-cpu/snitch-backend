import { Router } from "express";
import { createProductsValidator,unListProductValidator,listProductValidator } from "../validations/products.validation.js";
import { authenticate,authenticateSeller } from "../middelwares/auth.middlewares.js";
import { createProduct,listAllProducts,unList,list,listAllProductsToSeller} from "../controller/products.controller.js";
import multer from "multer"

const upload=multer({
    storage:multer.memoryStorage(),
    limits:{
        files:5,
        fileSize:1*1024*1024
    }
})

const router=Router()

router.post("/",authenticate,authenticateSeller,upload.array("images"),
(req,res,next)=>{
   try {
      req.body?.prices && (req.body.prices=JSON.parse(req.body.prices))
      req.body?.sizes && (req.body.sizes=JSON.parse(req.body.sizes))
    next()
   } catch (error) {
      return res.status(400).json({
            message: "Invalid JSON format in price or sizes"
        });
   }
},createProductsValidator,createProduct)

router.get("/",authenticate,listAllProducts)
router.patch("/unlist/:id",authenticate,authenticateSeller,unListProductValidator,unList)
router.patch("/list/:id",authenticate,authenticateSeller,listProductValidator,list)
router.get("/seller",authenticate,authenticateSeller,listAllProductsToSeller)

export default router