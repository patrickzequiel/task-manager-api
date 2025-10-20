import dotenv from 'dotenv'

dotenv.config()

// TODO: Add JWT secret and expiration config
// TODO: Add Redis connection config
// TODO: Add email service config (SMTP, SendGrid, etc.)
// TODO: Add file upload config (max size, allowed types)

interface EnvironmentConfig {
    port: number
    nodeEnv: string
    mongoUrl: string
    corsOrigin: string
}

const getEnvironmentConfig = (): EnvironmentConfig => {
    const requiredEnvVars = ['MONGO_URL']

    requiredEnvVars.forEach((envVar) => {
        if (!process.env[envVar]) {
            throw new Error(`Missing required environment variable: ${envVar}`)
        }
    })

    return {
        port: parseInt(process.env.PORT || '3000', 10),
        nodeEnv: process.env.NODE_ENV || 'development',
        mongoUrl: process.env.MONGO_URL!,
        corsOrigin: process.env.CORS_ORIGIN || '*',
    }
}

export const config = getEnvironmentConfig()
