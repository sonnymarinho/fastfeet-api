import { Request, Response, NextFunction } from 'express'
import { InternalError } from '@errors/InternalError'

const internalErrorsHandler = (
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction
) => {
  if (error instanceof InternalError) {
    return response
      .status(error.status.code)
      .json({ status: error.status.title, message: error.message })
  }

  console.error(error)

  return response.status(500).json({
    status: 'Unknown Error',
    message: 'Internal Server Error',
  })
}

export { internalErrorsHandler }
