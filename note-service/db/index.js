// modules
const mongoose = require('mongoose')

// config options

const CONFIGS = Object.assign(
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  process.env.ENV !== 'production' && {
    authSource: 'admin',
    user: process.env.DB_USERNAME,
    pass: process.env.DB_PASSWORD,
  }
)

const DB_PATH = process.env.ENV !== 'production' ? `mongodb://${process.env.DB_PATH}/note-mongo` : `${process.env.DB_PATH}`;

// mongodb connect
mongoose
  .connect(DB_PATH, CONFIGS)
  .then(() => {
    console.log(`[MongoDB]: is running successfully!`)
  })
  .catch(error => {
    console.error(error)
  })

const db = mongoose.connection

module.exports = db
