import { Router } from "express";
import { register,login,refresh,getMe } from "../controller/user.controller.js";
import { registerValidator,loginValidator} from "../validations/auth.validations.js";
import { authenticate } from "../middelwares/auth.middlewares.js";

const router=Router();

router.post("/register",registerValidator,register)
router.post("/login",loginValidator,login)
router.post("/refresh",refresh)
router.get("/me",authenticate,getMe)


export default router