const Ajv = require('ajv')

let ajv = new Ajv()

export const schemas = {}

export const initWithOptions = (options) => {
  ajv = new Ajv(options)
}

export const addSchema = (schemaId, schema) => {
  if (typeof schemas[schemaId] === 'object') {
    throw new Error(`JSON Schema '${schemaId}' is already registered.`)
  }

  schemas[schemaId] = {
    raw: schema,
  }

  ajv.addSchema(schema, schemaId)
}

export const getValidator = (schemaId) => {
  const schema = schemas[schemaId]

  if (!schema) {
    throw new Error(`JSON Schema '${schemaId}' isn't registered.`)
  }

  if (!schema.validator) {
    schema.validator = ajv.getSchema(schemaId)
  }

  return schema.validator
}

export const getSchema = (schemaId) => {
  const schema = schemas[schemaId]

  if (!schema) {
    throw new Error(`JSON Schema '${schemaId}' isn't registered.`)
  }

  return schema.raw
}

export const addKeyword = (keyword, definition) => {
  ajv.addKeyword(keyword, definition)
}

export const addFormat = (formatName, formatChecker) => {
  ajv.addFormat(formatName, formatChecker)
}
