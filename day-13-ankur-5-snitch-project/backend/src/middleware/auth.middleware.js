import { readAccessToken } from "../utils/auth.js"

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
