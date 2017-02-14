const getValidator = require('./schemas').getValidator

const factory = (schemaId) => {
  const validator = getValidator(schemaId)

  return (req) => {
    if (req.method in { GET: true, HEAD: true }) {
      return Promise.resolve(null)
    }

    return new Promise((resolve, reject) => {
      if (!validator(req.body)) {
        return reject({
          status: 400,
          reason: validator.errors,
        })
      }

      return resolve(true)
    })
  }
}

module.exports = factory
