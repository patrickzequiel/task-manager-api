import { Router } from 'express'
import * as taskController from '../controllers/task'
import {
    validate,
    createTaskSchema,
    updateTaskSchema,
    taskIdSchema,
} from '../middlewares/validation'

// TODO: Add authentication middleware
// TODO: Add rate limiting middleware
// TODO: Add response caching
// TODO: Add HATEOAS links in responses

const router = Router()

router.get('/', taskController.getAllTasks)

router.get('/stats', taskController.getTaskStats)

router.get('/:id', validate(taskIdSchema), taskController.getTaskById)

router.post('/', validate(createTaskSchema), taskController.createTask)

router.put('/:id', validate(updateTaskSchema), taskController.updateTask)

router.delete('/:id', validate(taskIdSchema), taskController.deleteTask)

export default router
