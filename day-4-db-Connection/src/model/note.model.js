const { default: mongoose } = require("mongoose");

let noteSchema = new  mongoose.Schema({

  title :{
    type : String,
    required : true
  },
  description :{
    type : String,
    minlength : 10
  }

})

const NotesModel = mongoose.model('notes',noteSchema)
module.exports = NotesModel
