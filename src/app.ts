import express, { Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import routes from './routes/index'
import { errorHandler, notFoundHandler } from './middlewares/error'
import { requestLogger } from './middlewares/logger'
import { config } from './config/environment'

// TODO: Add request ID middleware for tracing
// TODO: Add request size limiting
// TODO: Add API rate limiting
// TODO: Add response time tracking

const app: Application = express()

// Security middleware
app.use(helmet())

// CORS configuration
app.use(
    cors({
        origin: config.corsOrigin,
        credentials: true,
    })
)

// Compression middleware
app.use(compression())

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Request logger middleware
app.use(requestLogger)

// API routes
app.use('/api', routes)

// 404 handler
app.use(notFoundHandler)

// Error handler (must be last)
app.use(errorHandler)

export default app
