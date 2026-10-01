import { Router } from "express";
import { authenticateMiddleware } from "../middleware/auth.middleware.js";
import { addToCart, getCart } from "../controllers/cart.controller.js";

const router = Router()

router.post('/', authenticateMiddleware,addToCart)
router.get('/',authenticateMiddleware,getCart)

export default router
