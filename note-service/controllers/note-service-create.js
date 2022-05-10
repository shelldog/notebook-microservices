const axios = require('axios')
const Note = require('../models/note-service-model')
const validate = require('../utils/validation')

// create node controller
const createNote = (req, res) => {
  const { content, status } = req.body

  const valid = validate({ content, status }, 'note')

  if (!valid) {
    return res.status(400).json({
      message: '[Note Service]: save note failed!',
      error: 'Invalid request fields || The request package is empty',
    })
  }

  const note = new Note({ content, status })

  note
    .save()
    .then(async () => {
      // after saving the request, sending this one to the event!
      await axios
        .post(
          `http://${process.env.EVENT_BUS_ROUTE}:${process.env.EVENT_BUS_PORT}/api/event`,
          {
            type: 'NoteCreated',
            data: note,
          },
        )
        .catch(error => {
          console.log('error when sending to event-bus: ', error)
        })

      return res.status(201).json({
        data: {
          id: note._id,
          content,
          status,
        },
        message: '[Note Service]: save note successfully!',
      })
    })
    .catch(error => {
      return res.status(400).json({
        message: '[Note Service]: save note failed!',
        error,
      })
    })
}

module.exports = createNote
