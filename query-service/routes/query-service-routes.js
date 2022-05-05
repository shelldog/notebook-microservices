const express = require('express');
const onEvent = require('../controllers/query-service-event-controller');
const getQueries = require('../controllers/query-service-get-controller');

const router = express.Router();

router.post('/event', onEvent);
router.get('/queries', getQueries);

module.exports = router;
