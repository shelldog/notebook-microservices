const axios = require('axios')
const Note = require('../models/note-service-model')

const deleteNote = (req, res) => {
  const ID = req.params.id

  Note.findOneAndDelete({ _id: ID })
    .then(async note => {
      if (!note)
        return res.status(400).json({
          message: "[Note Service]: can't find the request note!",
        })

      await axios
        .post(
          `http://${process.env.EVENT_BUS_ROUTE}:${process.env.EVENT_BUS_PORT}/api/event`,
          {
            type: 'NoteDeleted',
            data: {
              noteid: ID,
            },
          },
        )
        .catch(error => {
          console.log('error when sending to event-bus: ', error)
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
