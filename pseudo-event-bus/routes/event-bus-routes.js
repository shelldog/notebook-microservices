const express = require('express');
const onEvent = require('../controllers/event-bus-handle');
const getEvents = require('../controllers/event-bus-events');

const router = express.Router();

router.post('/event', onEvent);
router.get('/events', getEvents);

module.exports = router;
