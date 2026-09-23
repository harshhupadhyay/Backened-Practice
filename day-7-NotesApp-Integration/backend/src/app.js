const express = require('express')
const connectDb = require('./config/db')
const Notesrouter = require('./routes/notes.route')
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173"
}))

connectDb()

app.get('/', (req, res) => {
  res.send('well working fine')
})

app.use('/notes', Notesrouter)

module.exports = app
