import { Router } from "express";
import userModel from '../models/url.model.js'
import generateCode from "../utils/generateCode.js";
import urlModel from "../models/url.model.js";


const router = Router()

//created
router.post('/', async (req, res) => {

  const { url } = req.body

  if (!url) {
    return res.status(400).json({
      error: "Please enter a URL"
    })
  }
  if (url.startsWith('http://') == false && url.startsWith('https://') == false) {
    return res.status(400).json({
      error: "Please Please enter a valid URL starting with http:// or https:// a URL"
    })
  }

  if (url.length > 2048) {
    return res.status(400).json({
      error: "URL is too long"
    })
  }

  let code = generateCode()
  let longUrl = url

  let urls = await userModel.create({
    originalUrl: longUrl,
    shortCode: code
  })

  return res.status(201).json({
    message: "Urls are created successfully",
    data: {
      originalUrl: urls.originalUrl,
      shortCode: urls.shortCode
    }
  })

})
//get all
router.get('/', async (req, res) => {

  let urls = await userModel.find()

  return res.status(200).json({
    message: "urls fetched successfully",
    data: urls
  })

})

//deleted
router.delete('/:id', async (req, res) => {

  const { id } = req.params
  let url = await urlModel.findById(id)

  if (!url) {
    return res.status(404).json({
      error: "url not found"
    })
  }

  await urlModel.findByIdAndDelete({
    _id: id
  })

  return res.status(200).json({
    message: " this url is deleted you can't access anymore",
    data: {
      deleted: url.originalUrl,
    }
  })

})



export default router
