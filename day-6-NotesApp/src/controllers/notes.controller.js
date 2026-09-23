const { message } = require("prompt-async");
const NoteAppModel = require("../models/notes.modle");


const CreateNotesContoller = async (req, res) => {

  try {
    let { title, description } = req.body
    let NewNote = await NoteAppModel.create({ title, description })

    res.status(201).send({
      success: "aa agya ladle",
      data: NewNote
    })


  } catch (error) {
    console.log('error in api', error.message);
    res.status(500).send({
      success: false,
      error: error.message
    })
  }

}

const GetNotesController = async (req, res) => {

  try {
    let getNotes = await NoteAppModel.find()
    res.status(200).json({
      message: "All notes Fetched",
      data: getNotes
    })

  } catch (error) {
    console.log('error in getting notes', error.message);

  }
}

const GetSingleNoteController = async (req, res) => {

  let noteId = req.params.id
  let note = await NoteAppModel.findById(noteId)

  res.status(200).json({
    message: "recevied one single  note",
    data: note
  })



}

const UpdateNoteController = async (req, res) => {

  try {
    let noteId = req.params.id
    let body = req.body
    let updatedNote =await NoteAppModel.findByIdAndUpdate(noteId, body,{new:true})

    return res.status(200).json({
      message: 'updated okay ',
      data: updatedNote
    })

  } catch (error) {
    return res.status(500).json({
      message: 'not able to get it ',

    })
  }
}

const UpdateSingleNoteController = async(req,res)=>{

  try {

    let noteId = req.params.id
    let body =req.body
    let NewNote = await NoteAppModel.findByIdAndUpdate(noteId,body,{new:true})

    res.status(200).json({
      message:"note singally updated",
      data: NewNote
    })


  } catch (error) {

    return req.status(500).json({
      message:"internal server error"
    })

  }
}



const DeleteNotesController = async (req, res) => {

  try {
    let noteId = req.params.id
    await NoteAppModel.findByIdAndDelete(noteId)

    res.status(200).json({
      message: "deleted"
    })

  } catch (error) {
    console.log('error in getting notes', error.message);

  }
}

module.exports = {
  CreateNotesContoller,
  GetNotesController,
  GetSingleNoteController,
  UpdateNoteController,
  UpdateSingleNoteController,
  DeleteNotesController
}
