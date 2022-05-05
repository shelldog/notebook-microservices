const express = require('express')
const createNode = require('../controllers/note-service-create')
const deleteNote = require('../controllers/note-service-delete')
const getNote = require('../controllers/note-service-get-note')
const updateNote = require('../controllers/note-service-update')
const getNotes = require('../controllers/note-service-get-notes')
const onEvent = require('../controllers/note-service-event');

// init router
const router = express.Router()

// configure the routes
router.post('/note', createNode)
router.delete('/note/:id', deleteNote)
router.get('/note/:id', getNote)
router.put('/note/:id', updateNote)
router.get('/notes', getNotes)
router.post('/event', onEvent)

module.exports = router
