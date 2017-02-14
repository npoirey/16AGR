/**
 * Created by jacek on 29.12.16.
 */

const validatorFactory = require('./validatorFactory')

const middlewareFactory = (schemaId) => {
  const validator = validatorFactory(schemaId)

  return (request, response, next) => {
    validator(request)
            .then(() => next())
            .catch(next)
  }
}

const errorHandler = (error, request, response, next) => {
  if (error.status && error.status === 400) {
    response.status(400).json(error.reason)
  }

  return next(error)
}

exports.factory = middlewareFactory
exports.errorHandler = errorHandler
