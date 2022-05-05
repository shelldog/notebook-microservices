const axios = require('axios');
const Behave = require('../models/behave-service-model');

const onEvent = async (req, res) => {
  const { type, data } = req.body;

  if (type === 'NoteCreated') {
    const behave = new Behave({
      noteid: data['_id'],
      behave: 'off',
      status: data['status']
    }) 

    behave.save()

    await axios.post(`http://${process.env.EVENT_BUS_ROUTE}:${process.env.EVENT_BUS_PORT}/api/event`, {
      type: 'BehaveCreated',
      data: behave
    });

    return res.status(201).json({
      message: "[Behave Service]: fetched the request behave!",
      data: behave
    })
  } 

  return res.status(200).json({
    message: '[Behave Service: received the event package!',
    data: req.body
  })
}

module.exports = onEvent 
