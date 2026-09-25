import { json, Router } from 'express'
import { authenticateMiddleware } from '../middleware/auth.middleware.js'
import { createProduct } from '../controllers/product.controller.js'
import multer from 'multer'
import { createProductValidator } from '../validators/productValidator.js'


const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 5,
    fileSize: 1 * 1024 * 1024   //1mb
  }
})



const routes = Router()

/**
 * @method POST
 * @route /api/products/
 * @description creates the product and save its data into the DB, images will be store on imagekit.
 * @access seller
 * req.body=>{title,description:price:{amount,currency},sizes:[{size,stock},{si–ze,stock}]}
 */
routes.post('/',

  // check if the user authenticated or not?
  authenticateMiddleware,


  (req, res, next) => {
    // agar  token seller ka token nhi hai toh  aage nhi jayega

    if (req.user.role !== "seller") {
      return res.status(403).json({
        message: "user is not authorized to create the product"
      })
    }

    next()
    // required for reading the data from req.body if the formate is form-data(multipart-form-data)
  }, upload.array("images"),

  (req, res, next) => {

    //Data quoted hoke aa rha tha in the form of objects and arrays usko sahi karne ke liye parse kardiya
    try {
      //If req.body.price exists, convert it from a JSON string into a JavaScript array.
      req.body?.price && (req.body.price = JSON.parse(req.body.price))
      
      //If req.body.sizes exists, convert it from a JSON string into a JavaScript array.
      req.body?.sizes && (req.body.sizes = JSON.parse(req.body.sizes))
      next()

    } catch (error) {
      res.status(400).json({ message: "Invalid price or sizes format" })
    }

  },
  createProductValidator,

  createProduct)




export default routes

