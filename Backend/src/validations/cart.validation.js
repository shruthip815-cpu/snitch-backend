import {body, validationResult} from 'express-validator'

export const cartValidation=[
    body("productId")
      .exists().withMessage("Product Id is required").bail()
      .isString().withMessage("Product Id must be a String").bail()
      .isMongoId().withMessage("Product Id must be a valid Mongo Id"),
    body("quantity")
      .exists().withMessage("Quantity is required").bail()
      .isInt({min:1}).withMessage("Quantity must be an interger greater than 0"),
    body("size")
      .exists().withMessage("Size is required").bail()
      .isString().withMessage("Size must be a String").bail()
      .isIn(["XS","S","M","L","XL","XXL"]).withMessage("Size must be any one of these XS,S,M,L,XL,XXL"),
      (req,res,next)=>{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                message:"Validation failed",
                errors:errors.array()
            })
        }
        next()
      }
      
]
