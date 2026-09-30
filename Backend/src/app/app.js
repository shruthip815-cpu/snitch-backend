import express from "express"
import userRouter from "../routes/user.routes.js";
import cookieParser from "cookie-parser";
import productsRouter from "../routes/products.routes.js";
import cartRouter from "../routes/cart.routes.js";
const app=express();
app.use(express.json())
app.use(cookieParser());

app.use("/api/auth",userRouter)
app.use("/api/products", productsRouter)
app.use("/api/cart",cartRouter)

export default app;