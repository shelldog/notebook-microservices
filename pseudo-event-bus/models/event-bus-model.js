const mongoose = require('mongoose')

const Schema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  {
    timestamps: true,
  },
)

const Event = mongoose.model('event', Schema, 'events')

module.exports = Event
