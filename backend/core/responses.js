import { schema } from './validator/express-ajv-validator'
import logger from '../core/logger'

export function created(res, data) {
  logger.info('returning 201 CREATED with data', data)
  if (typeof data === 'number') {
    return res.status(201).send(String(data))
  }
  return res.status(201).send(data)
}

export function badRequest(next, message) {
  return next({ status: 400, message })
}

export function unauthorized(next, message) {
  return next({ status: 401, message })
}

export function forbidden(next, message) {
  return next({ status: 403, message })
}

export function conflict(next, message) {
  return next({ status: 409, message })
}

export function validateAndSend(res, next, data, schemaId, responseCode) {
  const valid = schema.getValidator(schemaId)(data)
  if (!valid) {
    next({
      message: `data did not match schema ${schemaId}`,
      errors: schema.getValidator(schemaId).errors,
      data,
    })
    throw new Error(`data did not match schema ${schemaId}`)
  }
  return res.status(responseCode || 200).send(data)
}
