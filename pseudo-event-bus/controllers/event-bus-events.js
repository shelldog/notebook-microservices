const Event = require('../models/event-bus-model')

const getEvents = (req, res) => {
  Event.find({})
    .then(eventbus => {
      return res.status(200).json({
        message: '[Event Bus]: found & fetched the event collection!',
        data: eventbus,
      })
    })
    .catch(error => {
      return res.status(400).json({
        message: '[Event Bus]: found some error!',
        error,
      })
    })
}

module.exports = getEvents
