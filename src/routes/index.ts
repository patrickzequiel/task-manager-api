import { Router, Request, Response } from 'express'
import taskRoutes from './taskRoutes';
import userRoutes from './userRoutes';
import { config } from '../config/environment'
import { authenticate } from '../middlewares/authenticate';

// TODO: Add API versioning (v1, v2)
// TODO: Add Swagger/OpenAPI documentation endpoint
// TODO: Add metrics endpoint for monitoring

const router = Router()

router.get('/', (_req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'Task Manager API',
        version: '1.0.0',
        endpoints: {
            tasks: '/api/tasks',
            health: '/api/health',
        },
    })
})

router.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        status: 'UP',
        timestamp: new Date().toISOString(),
        environment: config.nodeEnv,
    })
})

router.use('/tasks', taskRoutes)

router.use('/user', userRoutes)


export default router
