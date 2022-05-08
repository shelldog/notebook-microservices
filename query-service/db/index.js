const mongoose = require('mongoose')

const CONFIG = Object.assign(
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  process.env.ENV !== 'production' && {
    authSource: 'admin',
    user: process.env.DB_USERNAME,
    pass: process.env.DB_PASSWORD,
  },
)

const DB_PATH = process.env.ENV !== 'production' ? `mongodb://${process.env.DB_PATH}/query-mongo` : `${process.env.DB_PATH}`;

mongoose
  .connect(DB_PATH, CONFIG)
  .then(() => {
    console.log('[MongoDB - QueryService]: running successfully!')
  })
  .catch(error => {
    console.log('[MongoDB - QueryService]: lauching failed!')
    console.error(error)
  })

const db = mongoose.connection

module.exports = db
