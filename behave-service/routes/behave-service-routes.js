const express = require('express')
const updateBehave = require('../controllers/behave-service-update')
const onEvent = require('../controllers/behave-service-event')
const getBehaves = require('../controllers/behave-service-behaves');

const router = express.Router()

router.post('/behave/:id/update', updateBehave)
router.get('/behaves', getBehaves);
router.post('/event', onEvent)

module.exports = router
