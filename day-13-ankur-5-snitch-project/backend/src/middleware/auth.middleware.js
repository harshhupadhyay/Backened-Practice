import { readAccessToken } from "../utils/auth.js"


//yeh bas check karega request ke andar valid request token hai ya nhi


export const authenticateMiddleware = async (req, res, next) => {


  const accessToken = req.headers.authorization?.split(" ")[1]

  if (!accessToken) {

    return res.status(401).json({
      message: "Access token not found in the request header"
    })
  }

  try {
    const decode = readAccessToken(accessToken)
    req.user = decode
    next()
  } catch (error) {

    res.status(401).json({
      message: "Invalid or expired access token"
    })

  }

}

export const authenticalSeller = (req, res, next) => {
    // agar  token seller ka token nhi hai toh  aage nhi jayega

    if (req.user.role !== "seller") {
      return res.status(403).json({
        message: "user is not authorized to  do this action"
      })
    }

    next()

  }
