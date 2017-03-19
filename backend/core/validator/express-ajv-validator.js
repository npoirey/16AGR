const glob = require('glob')

const middleware = require('./middleware')
const schema = require('./schemas')
const logger = require('../logger')

schema.initWithOptions(
  { removeAdditional: true }
)
// load schemas files on init
const files = glob.sync('../schema/*.json')
files.forEach((file) => {
  const schemaName = file.substring(10, file.length - 5)
  // eslint-disable-next-line global-require, import/no-dynamic-require
  schema.addSchema(schemaName, require(`../../${file}`))
  logger.info(`Added schema ${schemaName} to validator`)
})

const validateAndFilter = (data, schemaId) => schema.getValidator(schemaId)(data)

module.exports = {
  validatorFactory: middleware.factory,
  defaultErrorHandler: middleware.errorHandler,
  schema,
  validateAndFilter,
}
