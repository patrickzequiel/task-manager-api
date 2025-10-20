import app from './app'
import { config } from './config/environment'
import * as database from './database/connection'
import logger from './utils/logger'

// TODO: Add cluster mode for multi-core support
// TODO: Add process manager (PM2) configuration
// TODO: Add health check endpoint with DB status
// TODO: Add metrics collection (Prometheus)

const startServer = async (): Promise<void> => {
    try {
        // Connect to database
        await database.connect()

        // Start server
        const server = app.listen(config.port, () => {
            logger.info(`Server running on port ${config.port}`)
            logger.info(`Environment: ${config.nodeEnv}`)
            logger.info(`API available at http://localhost:${config.port}/api`)
        })

        // Graceful shutdown
        const gracefulShutdown = async (signal: string): Promise<void> => {
            logger.info(`${signal} received. Starting graceful shutdown...`)

            server.close(async () => {
                logger.info('HTTP server closed')

                try {
                    await database.disconnect()
                    logger.info('Database connection closed')
                    process.exit(0)
                } catch (error) {
                    logger.error('Error during shutdown:', error)
                    process.exit(1)
                }
            })

            // Force shutdown after 10 seconds
            setTimeout(() => {
                logger.error('Forced shutdown after timeout')
                process.exit(1)
            }, 10000)
        }

        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
        process.on('SIGINT', () => gracefulShutdown('SIGINT'))
    } catch (error) {
        logger.error('Failed to start server:', error)
        process.exit(1)
    }
}

startServer()
