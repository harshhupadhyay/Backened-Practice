import bcrypt from 'bcryptjs';
import { Router } from "express";
import userModel from "../model/user.model.js";
import { generateToken, verifyAccessToken, verifyRefreshToken } from "../utils/auth.util.js";


export const router = Router()

router.post('/register', async (req, res) => {

  const { name, email, password } = req.body

  const userExist = await userModel.findOne({ email })

  if (userExist) {

    return res.status(400).json({
      messgae: "user already exist",
      error: {
        path: 'email',
        message: "please enter another email"
      }
    })

  }

  const user = await userModel.create({
    name,
    email,
    passwordHash: await bcrypt.hash(password, 12)
  })

  const { accessToken, refreshToken } = generateToken(user._id)

  user.refreshToken = refreshToken
  await user.save()

  res.cookie("refreshToken", refreshToken, {
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

router.get('/me', async (req, res) => {

  const authorization = req.headers.authorization

  if (!authorization) {
    return res.status(401).json({
      message: "access token is required"
    })
  }

  const accessToken = authorization.split(" ")[1]

  try {

    const decode = verifyAccessToken(accessToken)
    console.log(decode);


    const user = await userModel.findById(decode.id)
    console.log(user);


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

    console.log("JWT ERROR:", error)

    return res.status(401).json({
      messgae: "unauthroirzed, Invalid or expired access token"
    })
  }


})

router.post('/refresh', async (req, res) => {

  const refreshToken = req.cookies.refreshToken

  if (!refreshToken) {
    return res.status(404).json({
      message: "refresh token is invalid"
    })
  }
  try {

    const decode = verifyRefreshToken(refreshToken)
    const user = await userModel.findById(decode.id)

    if (refreshToken !== user.refreshToken) {
      user.refreshToken = null
      await user.save()

      return res.status(401).json({
        messgae: "refresh token is not found"
      })
    }

    const { accessToken, refreshToken: newRefreshToken } = generateToken(user._id)

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true
    })

    user.refreshToken = newRefreshToken
    await user.save()

    res.status(200).json({
      messgae: "refresh token refreshed successfully",
      accessToken
    })


  } catch (error) {
    console.log("error in refresh token ", error)
    res.status(401).json({
      messgae: "refresh token is invalid or in correct"
    })
  }

})
