const { default: mongoose } = require("mongoose");

const NoteSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    minlength: [10, "minimun 10 characters are required!"],
    required: true
  }
})

const NoteAppModel = mongoose.model('NotesApp', NoteSchema)
module.exports = NoteAppModel
