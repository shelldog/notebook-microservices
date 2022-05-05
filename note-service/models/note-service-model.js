// modules
const mongoose = require('mongoose')

const Schema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Note = mongoose.model('note', Schema, 'notes')

module.exports = Note
