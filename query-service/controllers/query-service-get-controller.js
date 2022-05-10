const Query = require('../models/query-model')

const getQueries = (req, res) => {
  Query.find({})
    .then(query => {
      if (!query.length) {
        return res.status(400).json({
          message: '[QueryService]: the query collection is current empty!',
        })
      }

      return res.status(200).json({
        message:
          '[QueryService]: found & fetched all the queries in the collection!',
        data: query,
      })
    })
    .catch(error => {
      return res.status(400).json({
        message: '[QueryService]: failed at fetching the query collection!',
        error,
      })
    })
}

module.exports = getQueries
