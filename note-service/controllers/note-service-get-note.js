const Note = require('../models/note-service-model')

const getNote = (req, res) => {
  const ID = req.params.id
  Note.findOne({ _id: ID })
    .then(note => {
      if (!note) {
        return res.status(400).json({
          message: '[Note Service]: not with this id is not found!',
        })
      }

      return res.status(200).json({
        message: '[Note Service]: found & fetched the request id',
        data: note,
      })
    })
    .catch(error => {
      return res.status(400).json({
        message: "[Note Service]: can't get the request note!",
        error,
      })
    })
}

module.exports = getNote
