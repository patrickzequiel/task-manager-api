import { Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/errors'
import { config } from '../config/environment'

interface ErrorResponse {
    success: false
    message: string
    stack?: string
    statusCode: number
}

export const errorHandler = (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    let statusCode = 500
    let message = 'Internal server error'

    if (err instanceof AppError) {
        statusCode = err.statusCode
        message = err.message
    } else if (err.name === 'ValidationError') {
        statusCode = 400
        message = err.message
    } else if (err.name === 'CastError') {
        statusCode = 400
        message = 'Invalid ID format'
    } else if (err.name === 'MongoServerError') {
        statusCode = 400
        message = 'Database operation failed'
    }

    const errorResponse: ErrorResponse = {
        success: false,
        message,
        statusCode,
    }

    if (config.nodeEnv === 'development') {
        errorResponse.stack = err.stack
        console.error('Error:', err)
    }

    res.status(statusCode).json(errorResponse)
}

export const notFoundHandler = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
        statusCode: 404,
    })
}
