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

mongoose
  .connect(process.env.DB_PATH, CONFIGS)
  .then(() => {
    console.log('[MongoDB]: is running successfully!')
  })
  .catch(error => {
    console.error(error)
  })

const db = mongoose.connection

module.exports = db
