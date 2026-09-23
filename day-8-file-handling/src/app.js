const express = require('express')
const router = require('./routes/app.route')

const app = express()
app.use(express.json())

app.get('/',(req,res)=>{
  res.send('working very well')
})
app.use('/app',router)




module.exports = app

