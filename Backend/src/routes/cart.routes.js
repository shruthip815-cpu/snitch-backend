import {Router} from 'express'
import { addToCart,getCart} from '../controller/cart.controller.js'
import { cartValidation } from '../validations/cart.validation.js'
import { authenticate } from '../middelwares/auth.middlewares.js'


const router=Router()

router.post("/add",authenticate,cartValidation,addToCart)
router.get("/",authenticate,getCart)
export default router

