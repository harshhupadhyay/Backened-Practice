import express from 'express'
import router from '../routes/user.routes.js'
import cookiePraser from 'cookie-parser'

const app = express()
app.use(express.json())
app.use(cookiePraser())

app.use('/api/auth',router)



export default app
