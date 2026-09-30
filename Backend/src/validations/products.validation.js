import {body,param,validationResult} from "express-validator"
export const createProductsValidator=[
    body("title")
    .exists().withMessage("Title is required").bail()
    .isString().withMessage("Title must be string").bail()
    .trim()
    .isLength({min:2,max:100}).withMessage("Title length must be between 2 to 100 characters ")
    .isAlpha("en-US",{ignore:" -"}).withMessage("Title must contain only uppercase and lowercase english characters "),
   body("description")
     .exists().withMessage("Description is required").bail()
     .isString().withMessage("Description must be string").bail()
     .trim()
     .isLength({min:20,max:500}).withMessage("Description length must be between 20 to 500 characters "),
    body("prices.amount")
      .exists().withMessage("Price Amount is required").bail()
      .isFloat({min:0}).withMessage("Price Amount must be a floating number").bail(),
    body("prices.currency")
      .exists().withMessage("Price Currency is required").bail()
      .isString().withMessage("Price Currency must be a string").bail()
      .isIn(["INR","USD"]).withMessage("Currency either be INR or USD"),
    body("sizes")
      .exists().withMessage("Sizes is required").bail()
      .isArray().withMessage("Size must be an array of objects").bail(),
    body("sizes.*.size")
      .exists().withMessage("Sizes must present in every entry of sizes array").bail()
      .isString().withMessage("size must be a string").bail()
      .trim()
      .isIn(["XS","S","M","L","XL","XXL"]).withMessage("Size must be any one of these XS,S,M,L,XL,XXL"),
    body("sizes.*.stock")
       .exists().withMessage("Stock must present in every entry of sizes array").bail()
       .isInt({min:0}).withMessage("Stock must be a integer value"),

  (req,res,next)=>{
        const errors=validationResult(req)
        console.log(errors)
        if(!errors.isEmpty()){
          return res.status(400).json({
            message:"invalid request",
            errors:errors.array()
          })
        }
        next()
      }
       
]

export const unListProductValidator=[
    param("id")
     .exists().withMessage("Product id is required").bail()
     .isMongoId().withMessage("Product id must be a valid Mongo object id"),
      (req,res,next)=>{
        const errors=validationResult(req)
        console.log(errors)
        if(!errors.isEmpty()){
          return res.status(400).json({
            message:"invalid Data",
            errors:errors.array()
          })
        }
        next()
      }
       
]

export const listProductValidator=[
   param("id")
     .exists().withMessage("Product id is required").bail()
     .isMongoId().withMessage("Product id must be a valid Mongo object id"),
      (req,res,next)=>{
        const errors=validationResult(req)
        console.log(errors)
        if(!errors.isEmpty()){
          return res.status(400).json({
            message:"invalid Data",
            errors:errors.array()
          })
        }
        next()
      }
       
]