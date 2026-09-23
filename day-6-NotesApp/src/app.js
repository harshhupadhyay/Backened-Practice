const express = require('express')
const connectDb = require('./config/db')
const Notesrouter = require('./routes/notes.route')

const app = express()
app.use(express.json())
connectDb()

app.get('/', (req, res) => {
  res.send('well working fine')
})

app.use('/notes',Notesrouter)

module.exports = app
