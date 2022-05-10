const mongoose = require('mongoose')
const Query = require('../models/query-model')

const onEvent = (req, res) => {
  const { type, data } = req.body

  if (type === 'NoteCreated') {
    const { _id, content, status } = data

    const query = new Query({
      noteid: _id,
      behave: 'off',
      content,
      status,
    })

    return query
      .save()
      .then(() => {
        return res.status(201).json({
          message: '[QueryService]: created the request note!',
          type,
          data: query,
        })
      })
      .catch(error => {
        return res.status(400).json({
          message: '[QueryService]: failed to create the request node!',
          error,
        })
      })
  }

  if (type === 'NoteDeleted') {
    const { noteid } = data

    return Query.findOneAndDelete({ noteid: noteid }).then(query => {
      if (!query) {
        return res.status(400).json({
          message:
            "[QueryService]: the query collection can't find the request noteid!",
        })
      }

      return res.status(200).json({
        message: '[QueryService]: found & deleted the request query!',
        type,
        data: query,
      })
    })
  }

  if (type === 'BehaveUpdated') {
    const { noteid, behave } = data

    return Query.findOne({ noteid }).then(query => {
      if (!query) {
        return res.status(400).json({
          message:
            "[QueryService]: the query collection can't find the request noteid!",
        })
      }

      query.behave = behave
      query.save()

      return res.status(200).json({
        message: '[QueryService]: found & updated the request noteid!',
        type,
        data: query,
      })
    })
  }

  return res.status(200).json({
    message: '[QueryService]: fetched the event package!',
    type,
    data,
  })
}

module.exports = onEvent
