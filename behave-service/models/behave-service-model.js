const mongoose = require('mongoose')

const Schema = new mongoose.Schema(
  {
    noteid: {
      type: String,
      required: true,
    },
    behave: {
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

const Behave = mongoose.model('behave', Schema, 'behaves')

module.exports = Behave
