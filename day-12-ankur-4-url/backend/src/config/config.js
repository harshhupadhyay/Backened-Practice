import dotEnv from 'dotenv'
dotEnv.config()

const configs ={
  Mongo_Url:process.env.MONGO_URL
}



export default configs
