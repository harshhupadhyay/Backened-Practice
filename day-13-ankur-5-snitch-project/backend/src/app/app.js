import express from 'express'
import authRouter from '../routes/user.routes.js'
import cookiePraser from 'cookie-parser'
import productRouter from '../routes/product.route.js'

const app = express()
app.use(express.json())
app.use(cookiePraser())

app.use('/api/auth',authRouter)
app.use('/api/products',productRouter)



export default app
