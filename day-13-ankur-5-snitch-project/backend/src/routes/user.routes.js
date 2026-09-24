import { Router } from "express";
import { getMe, login, refresh, register } from "../controllers/auth.controller.js";
import { registerValidator } from "../validators/registerValidator.js";
import { authenticateMiddleware } from "../middleware/auth.middleware.js";
import { loginValidator } from "../validators/loginValidator.js";

const router = Router() 


router.post("/register",registerValidator, register)
router.post('/login',loginValidator,login)
router.post('/refresh',refresh)
router.get('/getMe',authenticateMiddleware,getMe)




export default router
