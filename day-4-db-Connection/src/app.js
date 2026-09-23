const express = require("express")
const connectDb = require("./config/db")
const NotesModel = require("./model/note.model")

const app = express()
app.use(express.json())

connectDb()

app.get('/', (req, res) => {

  res.send('yes its working')
})

app.post('/create',async(req,res)=>{


  let {title,description} =req.body
  const NewNote = await NotesModel.create({title,description})

  res.send({
    success : "good job",
    data : NewNote
  })

})

module.exports = app
