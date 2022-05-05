const Note = require('../models/note-service-model')

const deleteNote = (req, res) => {
  const ID = req.params.id

  Note.findOneAndDelete({ _id: ID })
    .then(note => {
      if (!note)
        return res.status(400).json({
          message: "[Note Service]: can't find the request note!",
        })

      return res.status(200).json({
        message: '[Note Service]: deleted note successfully!',
        data: note,
      })
    })
    .catch(error => {
      return res.status(400).json({
        message: '[Note Service]: can not delete the requested note!',
        error,
      })
    })
}

module.exports = deleteNote
