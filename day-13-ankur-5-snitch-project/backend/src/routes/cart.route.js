import { Router } from "express";
import { authenticateMiddleware } from "../middleware/auth.middleware.js";
import cartModel from "../models/cart.model.js";

const router =Router()

router.post('/',authenticateMiddleware,async(req,res)=>{

  const {proudctId,quantity,size}= req.body

  const product =await cartModel.findById({proudctId})

  if(!product){
    return res.status(404).json({
      message:"Product is not  found"
    })
  }




})

export default router
