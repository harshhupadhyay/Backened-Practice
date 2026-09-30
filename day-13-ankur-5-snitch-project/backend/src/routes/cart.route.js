import { Router } from "express";
import { authenticateMiddleware } from "../middleware/auth.middleware.js";
import cartModel from "../models/cart.model.js";

const router = Router()

router.post('/', authenticateMiddleware, async (req, res) => {

  const { proudctId, quantity, size } = req.body

  const product = await cartModel.findById({ proudctId })

  if (!product) {
    return res.status(404).json({
      message: "Product is not found"
    })
  }

  const selectedSize = product.sizes.find(s => s.size === size)

  if (!selectedSize) {
    return res.status(400).json({
      message: "Invalid size"
    })
  }
  //user ne stock se jayda quantity select karli toh isliye yeh banaya hai

  if (selectedSize.stocks < quantity) {
    return res.status(400).json({
      message: "Insufficient stock"
    })
  }

  




})

export default router
