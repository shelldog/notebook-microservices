const axios = require('axios')
const Behave = require('../models/behave-service-model')

const onEvent = async (req, res) => {
  const { type, data } = req.body

  if (type === 'NoteCreated') {
    const behave = new Behave({
      noteid: data['_id'],
      behave: 'off',
      status: data['status'],
    })

    behave.save()

    await axios.post(
      `http://${process.env.EVENT_BUS_ROUTE}:${process.env.EVENT_BUS_PORT}/api/event`,
      {
        type: 'BehaveCreated',
        data: behave,
      },
    )

    return res.status(201).json({
      message: '[Behave Service]: fetched the request behave!',
      data: behave,
    })
  }

  if (type === 'NoteDeleted') {
    return Behave.findOneAndDelete({ noteid: data.noteid })
      .then(async behave => {
        if (!behave) {
          return res.status(400).json({
            message: "[Behave Service]: can't find the deleted behave!",
          })
        }

        await axios.post(
          `http://${process.env.EVENT_BUS_ROUTE}:${process.env.EVENT_BUS_PORT}/api/event`,
          {
            type: 'BehaveCreated',
            data: behave,
          },
        )

        return res.status(200).json({
          message: '[Behave Service]: deleted the behave successfully!',
          data: behave,
        })
      })
      .catch(error => {
        return res.status(400).json({
          message: "[Behave Service]: can't not delete the deleted behave!",
          error,
        })
      })
  }

  return res.status(200).json({
    message: '[Behave Service: received the event package!',
    data: req.body,
  })
}

module.exports = onEvent
