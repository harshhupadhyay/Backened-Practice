import express from 'express'
import router from '../routes/url.route.js'
import userModel from '../models/url.model.js'

const app = express()
app.use(express.json())

app.use('/api/url',router)


//redirect and update count
app.get('/:code',async (req, res) =>{
  const {code} = req.params
  let urls = await userModel.findOneAndUpdate(

    {shortCode: code},
    {$inc :{clicks:1}}

  )

  res.redirect(302,urls.originalUrl)

})


export default app
