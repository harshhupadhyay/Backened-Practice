import productModel from "../models/product.model.js";

export const createProduct= async(req,res)=>{

  console.log(req.body);
  console.log(req.files);
  

   return res.status(200).json({
    message:"dummy Response"
  })

}
