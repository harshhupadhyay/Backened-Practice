import bcrypt from 'bcryptjs'
import userModel from '../models/user.model.js'
import { createAccessToken, createRefreshToken, readRefreshToken } from '../utils/auth.js'




/**
 * @description Register an user and save the data from req.body
* @param req express.Request
* @param req.body Object
* @param req.body.email String
* @param req.body.name String
* @param req.body.password String
 */

export const register = async (req, res) => {

  const { email, name, password } = req.body
  const userExist = await userModel.findOne({ email })

  if (userExist) {
    return res.status(400).json({
      message: "user already exist with this email",
      error: [
        {
          path: "email",
          message: "User already exists with this email address"
        }
      ]
    })
  }

  const user = await userModel.create({
    email,
    name,
    passwordHash: await bcrypt.hash(password, 12)
  })

  const accessToken = createAccessToken({
    userId: user._id,
    role: user.role
  })
  console.log(accessToken);


  const refreshToken = createRefreshToken({
    userId: user._id,
    role: user.role
  })

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true
  })

  await userModel.findByIdAndUpdate(user._id, {
    refreshToken
  })

  return res.status(202).json({
    message: "User register  successfully",
    data: {
      user: {
        email: user.email,
        name: user.name,
        id: user._id
      },
      accessToken
    }
  })


}

/**
 * @description Login a user and create new set of accessToken and refreshToken
* @param req.body.email String
* @param req.body.password String
 */
export const login = async (req, res) => {

  const { email, password } = req.body
  const user = await userModel.findOne({ email })

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password"
    })
  }

  const ispasswordValid = await bcrypt.compare(password, user.passwordHash)

  if (!ispasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password"
    })
  }

  const accessToken = createAccessToken({
    userId: user._id,
    role: user.role
  })

  const refreshToken = createRefreshToken({
    userId: user._id,
    role: user.role
  })

  await userModel.findOneAndUpdate(
    { email }, { refreshToken }
  )

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true

  })

  res.status(200).json({
    message: "login successfully",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      accessToken
    }
  })



}

export const refresh = async (req, res) => {

  const refreshtoken = req.cookies.refreshToken
  if (!refreshtoken) {
    return res.status(401).json({
      message: "Request token  is required"
    })
  }

  try {

    const decode = readRefreshToken(refreshtoken)

    const { userId, role } = decode

    const user = await userModel.findById(userId)

    if (refreshtoken != user.refreshToken) {

      await userModel.findByIdAndUpdate(user._id,
        {
          refreshToken: null
        }
      )
      return res.status(401).json({
        message: "Refresh tokne is mismatched"
      })
    }

    const accessToken = createAccessToken({
      userId, role
    })

    const newRefreshToken = createRefreshToken({
      userId, role
    })

    await userModel.findByIdAndUpdate(user._id,
      { refreshToken: newRefreshToken }
    )

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true
    })

    res.status(200).json({
      message: "Tokens rotated successfully.",
      data: {
        user: {
          email: user.email,
          name: user.name,
          id: user._id
        },
        accessToken
      }
    })




  } catch (error) {
    console.log('refresherror', error.message);

    return res.status(401).json({
      message: "Invalid refresh token"
    })

  }
}

//get me api  for fetching all

export const getMe =async(req,res)=>{

  const {userId,role} = req.user

  const user = await userModel.findById(userId)

  res.status(200).json({
    message:"user fetched successfully",
    data:{
      user:{
        name: user.name,
        email:user.email,
        id : user._id
      }
    }
  })


}


