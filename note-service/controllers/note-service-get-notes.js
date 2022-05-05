const Note = require('../models/note-service-model')

const getNotes = (req, res) => {
  Note.find({})
    .then(notes => {
      if (!notes.length)
        return res.status(400).json({
          message: '[Note Service]: current collection is empty!',
        })

      return res.status(200).json({
        message: '[Note Service]: fetched all the records!',
        data: notes,
      })
    })
    .catch(error => {
      return res.status(400).json({
        message: "[Note Service]: can't get all notes!",
        error,
      })
    })
}

module.exports = getNotes
