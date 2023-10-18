import { Router } from 'express'
import Tasks from '../controller/tasks'

const router = Router()

const connectDB = async () => {
    const tasks = new Tasks()
    return tasks
}

router.get('/', async (req: any, res: any) => {
    try {
        const tasks = await connectDB()
        const allTasks = await tasks.getTasks()
        return res.json(allTasks)
    } catch (error) {
        console.error('Error handling GET request:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
})

router.post('/', async (req: any, res: any) => {
    try {
        const tasks = await connectDB();
        const result = await tasks.create(req.body);
        return res.json(result);
    } catch (error) {
        console.error('Error handling POST request:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
})

router.delete('/:id', async (req: any, res: any) => {
    try {
        const taskId = req.params.id;
        const tasks = await connectDB();
        const result = await tasks.deleteOne(taskId);
        res.json(result);
    } catch (error) {
        console.error('Error handling DELETE request:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

router.put('/:id', async (req: any, res: any) => {
    try {
        const tasks = await connectDB();
        const result = await tasks.updateOne(req);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        console.error('Error handling PUT request:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

export default router