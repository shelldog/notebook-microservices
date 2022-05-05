const Note = require('../models/note-service-model')
const validate = require('../utils/validation')

const updateNote = (req, res) => {
  const ID = req.params.id

  const data = {
    content: req.body.content,
    status: req.body.status,
  }

  const valid = validate(data, 'note')

  if (!valid) {
    return res.status(400).json({
      message: '[Note Service]: update note failed!',
      error: 'Invalid request fields || The request package is empty',
    })
  }

  Note.findOne({ _id: ID })
    .then(note => {
      if (!note) {
        return res.status(400).json({
          message: "[Note Service]: can't find the request note!",
        })
      }

      note.content = data['content']
      note.status = data['status']
      note
        .save()
        .then(() => {
          return res.status(200).json({
            message: '[Note Service]: found & updated the request note!',
            data: note,
          })
        })
        .catch(error => {
          return res.status(400).json({
            message: '[Note Service]: update failed!',
            error,
          })
        })
    })
    .catch(error => {
      return res.status(400).json({
        message: '[Note Service]: update failed!',
        error,
      })
    })
}

module.exports = updateNote
