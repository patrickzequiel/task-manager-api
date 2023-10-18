import { Router } from 'express'
import Tasks from '../controller/tasks'

const router = Router()

const connectDB = async () => {
    const tasks = new Tasks()
    return tasks
}

router.get('/', async (req: any, res: any) => {
    const tasks = await connectDB()
    console.log(`connection made`);
    console.log(`start getTasks`);
     try {
        const allTasks =  await tasks.getTasks()
        return res.json(allTasks)
     } catch (error) {
        console.log(`ERROR `, error)
        return error
     }
})

router.post('/', async (req: any, res: any) => {
    const tasks = await connectDB()
    return res.json(tasks.create(req.body))
})

router.delete('/:id', async (req: any, res: any) => {
    const taskId = req.params.id // Access the id from the URL parameters
    const tasks = await connectDB()
    const result = await tasks.deleteOne(taskId)
    res.json(result)
})

router.put('/:id', async (req: any, res: any) => {
    const tasks = await connectDB()
    try {
        const result = await tasks.updateOne(req)
        if (result) {
            res.json(result)
        } else {
            res.status(404).json({ message: 'Task not found' })
        }
    } catch (error) {
        console.error('Error updating task:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

export default router
