import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";


export const createProduct = async (req, res) => {

  console.log(req.body);
  console.log(req.files);

  let filesUrl = []

  for (let i = 0; i < req.files.length; i++) {

    const response = await uploadFile({
      buffer: req.files[i].buffer,
      fileName: req.files[i].originalname
    })

    filesUrl.push(response.url)
  }
  console.log('fileUrl response', filesUrl);

  const product = await productModel.create({
    title: req.body.title,
    description: req.body.description,
    price: {
      amount: req.body.price.amount,
      currency: req.body.price.currency,
    },
    sizes: req.body.sizes,
    images: filesUrl,
    seller: req.user.userId

  })

  return res.status(201).json({
    message: "Product created successfully",
    data: {
      product
    }
  })

}

export const listAllProducts = async (req, res) => {

  const product = await productModel.find({
    published: true
  })

  return res.status(200).json({
    message: "All product are fetched",
    data: product
  })
}

export const listAllProductToSeller = async (req, res) => {

  const product = await productModel.find({})

  return res.status(200).json({
    message: "All products fetched successfully",
    data: {
      product
    }
  })

}

export const unlistProduct = async (req, res) => {

  const { id } = req.params

  const product = await productModel.findOne(id)

  if (!product) {

    res.status(404).json({
      message: "product is not found by id"
    })
  }
  // –––––––––––––––––– make product unPublished –––––––––––––––––––––
  await productModel.findOneAndUpdate(id, {
    published: false
  })

  return res.status(200).json({
    message: "Product unpublished successfully"
  })

}

export const listProduct = async (req, res) => {

  const { id } = req.params

  const product = await productModel.findOne(id)

  if (!product) {
    return res.status(404).json({
      message: "product not found by id"
    })
  }

  await productModel.findOneAndUpdate(id, {
    published: true
  })

  return res.status(200).json({
    message: "Product published successfully"
  })



}
