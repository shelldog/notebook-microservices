const mongoose = require('mongoose')

const CONFIGS = Object.assign(
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  process.env.ENV !== 'production' && {
    authSource: 'admin',
    user: process.env.DB_USERNAME,
    pass: process.env.DB_PASSWORD,
  }
)

const DB_PATH = process.env.ENV !== 'production' ? `mongodb://${process.env.DB_PATH}/event-mongo` : `${process.env.DB_PATH}`

mongoose
  .connect(DB_PATH, CONFIGS)
  .then(() => {
    console.log('[MonoDB]: is running successfully!')
  })
  .catch(error => {
    console.log("[MongoDB]: can't be launched!")
    console.log(error)
  })

const db = mongoose.connection

module.exports = db
