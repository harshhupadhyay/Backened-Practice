import cartModel from "../models/cart.model.js"
import productModel from "../models/product.model.js"

export const addToCart = async (req, res) => {

  const { productId, quantity, size } = req.body

  const product = await productModel.findById(productId)

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

  if (selectedSize.stock < quantity) {
    return res.status(400).json({
      message: "Insufficient stock"
    })
  }

  const cart = (await cartModel.findOne({ user: req.user.userId }))
    ?? ((await cartModel.create({ user: req.user.userId })))


  const cartInProduct = cart.products.find(p => (p.product.toString() === productId) && (p.size === size))

  if (cartInProduct) {


    if ((cartInProduct.quantity + quantity) > selectedSize.stock) {
      return res.status(400).json({
        message: "Insufficient stock"
      })
    }

    await cartModel.updateOne({
      user: req.user.userId,
      "products.product": productId,
      "products.size": size
    },
      {

        $inc: {
          "products.$.quantity": quantity
        }

      }
    )
    return res.status(200).json({
      message: "Product quantity updated in cart"
    })


  }

  await cartModel.findOneAndUpdate(
    { user: req.body.userId },
    {
      $push:
      {
        products: {
          product: productId,
          quantity: quantity,
          size: size
        }
      }
    }
  )
  return res.status(200).json({
    message: "Product added to cart"
  })


}

export const getCart = async (req, res) => {

  const cart = (await cartModel.findOne({ user: req.user.userId })) ?? (await cartModel.create({ user: req.user.userId }))

  return res.status(200).json({
    message: "Cart retrieved successfully",
    data: {
      cart: cart
    }
  });



}
