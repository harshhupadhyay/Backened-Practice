import express from "express"
import jwt from 'jsonwebtoken'
import userModel from "../models/user.model.js"
import { authenticate } from "../middleware/auth.middleware.js"
import dotenv from 'dotenv'
import bcrypt from "bcryptjs"

dotenv.config()



const app = express()
app.use(express.json())

app.get('/api', (req, res) => {
  res.status(200).json({
    message: "hell harsh its working"
  })
})

app.post('/api/register', async (req, res) => {

  try {

    let { name, email, password } = req.body

    const user = await userModel.create({
      name, email, password: await bcrypt.hash(password, 10)
    })


    const token = jwt.sign({
      id: user._id
    },
      process.env.JWS_SCERET
    )

    res.status(201).json({
      message: "successfully created ",
      data: {
        user: {
          name,
          email,
          id: user._id
        }
      },
      token

    })


  } catch (error) {
    return res.status(401).json({
      message: "internal server error"
    })
  }
})

app.get('/api/me', authenticate, async (req, res) => {

  console.log(req.user);

  res.status(200).json({
    data: {
      user: req.user
    }
  })



})


app.post('/api/login', async (req, res) => {

  const { email, password } = req.body
  const user = await userModel.findOne({
    email
  })

  const isValidPassword = await bcrypt.compare(password, user.password)

  if (!isValidPassword) {
    return res.status(400).json({
      message: "your email or  password is wrong try again later"
    })
  }

  const token = jwt.sign({
    id: user._id
  }, process.env.JWS_SCERET)

  res.status(200).json({
    message: "welcome to ypur profile",
    data: {
      name: user.name,
      email: user.email
    },
    token
  })

})


export default app
