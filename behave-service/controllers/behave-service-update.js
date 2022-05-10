const axios = require('axios')
const Behave = require('../models/behave-service-model')

const updateBehave = (req, res) => {
  const data = {
    noteid: req.params.id,
    behave: req.body['behave'],
  }

  Behave.findOne({ noteid: data['noteid'] })
    .then(behave => {
      if (!behave) {
        return res.status(400).json({
          message: "[Behave Service]: can't find the request behave!",
        })
      }

      if (behave.behave === data['behave']) {
        return res.status(400).json({
          message: "[Behave Service]: can't progress the request behave!",
          error:
            'The behave request must be different with the current behave!',
        })
      }

      behave.behave = data['behave']

      behave
        .save()
        .then(async () => {
          await axios.post(
            `http://${process.env.EVENT_BUS_ROUTE}:${process.env.EVENT_BUS_PORT}/api/event`,
            {
              type: 'BehaveUpdated',
              data: behave,
            },
          )

          return res.status(200).json({
            message: '[Behave Service]: found & updated the request behave!',
            data: behave,
          })
        })
        .catch(error => {
          return res.status(400).json({
            message: "[Behave Service]: can't progress the request behave!",
            error,
          })
        })
    })
    .catch(error => {
      return res.status(400).json({
        message: "[Behave Service]: can't progress the request behave!",
        error,
      })
    })
}

module.exports = updateBehave
