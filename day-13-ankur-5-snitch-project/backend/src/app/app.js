import express from 'express'
import router from '../routes/user.routes.js'
import cookiePraser from 'cookie-parser'
import productRoutes from '../routes/product.route.js'

const app = express()
app.use(express.json())
app.use(cookiePraser())

app.use('/api/auth',router)
app.use('api/product',productRoutes)



export default app
