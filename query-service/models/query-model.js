const mongoose = require('mongoose');

const Schema = new mongoose.Schema(
  {
    noteid: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    behave: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Query = mongoose.model('query', Schema, 'queries');

module.exports = Query;
