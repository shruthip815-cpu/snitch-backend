
import {body,validationResult} from "express-validator"

export const registerValidator=[
      body("email")
        .trim()
        .exists().withMessage("Email is required").bail()
        .isEmail().withMessage("Enter valid email address").bail(),
     body("name")
      .exists().withMessage("Name is required").bail()
      .isString().withMessage("Name must be a String").bail()
      .trim()
      .isLength({min:2,max:20}).withMessage("Name length must be between 2 to 20").bail(),
     body("password")
      .exists().withMessage("Password is required").bail()
      .isString().withMessage("Password must be a String").bail()
      .trim()
      .isLength({min:6}).withMessage("Password  must have minimum 6 characters").bail(),
    (req,res,next)=>{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                message:"Invalid Request",
                errors:errors.array()
            
            })
        }
        next()
    }


]

export const loginValidator=[
    body("email")
        .trim()
        .exists().withMessage("Email is required").bail()
        .isEmail().withMessage("Enter valid email address").bail(),
    body("password")
      .exists().withMessage("Password is required").bail()
      .isString().withMessage("Password must be a String").bail()
      .trim()
      .isLength({min:6}).withMessage("Password  must have minimum 6 characters").bail(),
    (req,res,next)=>{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                message:"Invalid Request",
                errors:errors.array()
            
            })
        }
        next()
    }
]



