import { Router } from "express";
import userModel from "../model/user.model.js";
import bcryptjs from 'bcryptjs'
import { generateTokens, verifyAccessToken, verifyRefreshToken, } from "../utils/auth.js";

const router = Router()


//register api
router.post('/register', async (req, res) => { 

  const { name, email, password } = req.body
  const isUserExit = await userModel.findOne({ email })

  if (isUserExit) {

    return res.status(400).json({
      message: "User already exist",
      errors: {
        path: "email",
        message: "email already exists"
      },
    })

  }

  const user = await userModel.create({
    name,
    email,
    passwordHash: await bcryptjs.hash(password, 12)

  })

  const { accessToken, refreshToken } = generateTokens(user._id)

  user.refreshToken = refreshToken
  await user.save()

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true
  })

  res.status(201).json({
    message: "user register successfully",
    data: {
      user: {
        name: user.name,
        email: user.email
      },
    },
    accessToken

  })





})

//get api
router.get('/me', async (req, res) => {

  const accessToken = req.headers.authorization.split(" ")[1]

  try {

    const decode = verifyAccessToken(accessToken)
    console.log(decode);

    const user = await userModel.findById(decode.id)


    res.status(200).json({
      message: "user fetched successfully",
      data: {
        user: {
          name: user.name,
          email: user.email
        }
      }
    })

  } catch (error) {

    return res.status(400).json({
      message: "Unathorized, Invalid or expired access token"
    })
  }

})

router.post('/refresh', async (req, res) => {

  const refreshToken = req.cookies.refreshToken

  if (!refreshToken) {
    return res.status(401).json({
      message: "Unauthorized, refresh token not found",
    })
  }

  try {

    const decode = verifyRefreshToken(refreshToken)
    const user = await userModel.findById(decode.id)

    if (refreshToken !== user.refreshToken) {
      user.refreshToken = null
      await user.save()

      return res.status(401).json({
        message: "Unauthorized, refresh token mismatch",
      })
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens({ userId: user._id })

    res.cookie("refreshToken", newRefreshToken, { httpOnly: true })

    user.refreshToken = newRefreshToken
    await user.save()

    res.status(200).json({
      message: "Tokens refreshed successfully",
      accessToken
    })



  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized, Invalid or expired refresh token",
    })
  }



})



export default router
