const Behave = require('../models/behave-service-model')

const getBehaves = (req, res) => {
  Behave.find({})
    .then(behave => {
      if (!behave.length) {
        return res.status(400).json({
          message: '[Behave Service]: current collection is empty!',
        })
      }

      return res.status(200).json({
        message: '[Behave Service]: found & fetched the collections!',
        data: behave,
      })
    })
    .catch(error => {
      return res.status(400).json({
        message: "[Behave Service]: can't fetch the behaves collection!",
        error,
      })
    })
}

module.exports = getBehaves
