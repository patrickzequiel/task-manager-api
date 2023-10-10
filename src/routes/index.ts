import { Router } from 'express'

const router = Router()

import tasks from './tasks'

const port = process.env.PORT || 3000

router.get('/', (req: any, res: any) => {
    res.json({
        task: `http://localhost:${port}/task`,
    })
})

router.use('/tasks', tasks)

export default router
