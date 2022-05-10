const axios = require('axios')
const Event = require('../models/event-bus-model')

const onEvent = async (req, res) => {
  const { type, data } = req.body

  const eventbus = new Event({ type, data })
  eventbus.save()

  // return the fallback event request
  await axios.post(
    `http://${process.env.NOTE_EVENT_ROUTE}:${process.env.NOTE_EVENT_PORT}/api/event`,
    {
      type,
      data,
    },
  )

  await axios.post(
    `http://${process.env.QUERY_EVENT_ROUTE}:${process.env.QUERY_EVENT_PORT}/api/event`,
    {
      type,
      data,
    },
  )

  await axios.post(
    `http://${process.env.BEHAVE_EVENT_ROUTE}:${process.env.BEHAVE_EVENT_PORT}/api/event`,
    {
      type,
      data,
    },
  )

  return res.status(200).json({
    message: '[Event Bus]: received the package!',
    type,
    data,
  })
}

module.exports = onEvent
