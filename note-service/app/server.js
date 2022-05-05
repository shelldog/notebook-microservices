const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')

// setup env file 
if (process.env.ENV) {
  require('dotenv').config()
} else {
  require('dotenv').config({ path: __dirname + '/./../env/dev.env'});
}

const db = require('../db')
const routes = require('../routes/note-service-routes')

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use('/api', routes)

app.listen(process.env.PORT, () => {
  console.log(
    `[Note Service]: is running on ${process.env.ENTRY_POINT}:${process.env.PORT}`,
  )
})
