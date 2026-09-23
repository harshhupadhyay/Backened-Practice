const express = require('express')
const { CreateNotesContoller, GetNotesController, GetSingleNoteController, UpdateNoteController, DeleteNotesController, UpdateSingleNoteController } = require('../controllers/notes.controller')
const NoteAppModel = require('../models/notes.modle')


const router = express.Router()
//create
router.post('/create', CreateNotesContoller)
//read all
router.get('/allNotes', GetNotesController)
//read one
router.get('/:id', GetSingleNoteController)
//put
router.put('/:id', UpdateNoteController)
//patch
router.patch('/:id/single',UpdateSingleNoteController)

//delete
router.delete('/:id', DeleteNotesController)


module.exports = router
