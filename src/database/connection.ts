import mongoose from 'mongoose'
import { config } from '../config/environment'
import logger from '../utils/logger'

// TODO: Add connection pooling configuration
// TODO: Add retry logic for failed connections
// TODO: Add connection health checks
// TODO: Add support for read replicas

let isConnected = false

export const connect = async (): Promise<void> => {
    if (isConnected) {
        logger.info('Database already connected')
        return
    }

    try {
        await mongoose.connect(config.mongoUrl)
        isConnected = true
        logger.info('MongoDB connected successfully')

        mongoose.connection.on('error', (error) => {
            logger.error('MongoDB connection error:', error)
            isConnected = false
        })

        mongoose.connection.on('disconnected', () => {
            logger.info('MongoDB disconnected')
            isConnected = false
        })
    } catch (error) {
        logger.error('Failed to connect to MongoDB:', error)
        throw error
    }
}

export const disconnect = async (): Promise<void> => {
    if (!isConnected) {
        return
    }

    try {
        await mongoose.disconnect()
        isConnected = false
        logger.info('MongoDB disconnected successfully')
    } catch (error) {
        logger.error('Error disconnecting from MongoDB:', error)
        throw error
    }
}

export const getConnectionStatus = (): boolean => {
    return isConnected
}
