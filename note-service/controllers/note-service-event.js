const onEvent = (req, res) => {
  res.status(200).json({
    message: '[Note Service]: received the Event package!',
    data: req.body,
  })
}

module.exports = onEvent
