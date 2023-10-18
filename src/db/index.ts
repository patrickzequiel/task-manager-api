import { Model, Document, Types } from 'mongoose'
import mongoose from 'mongoose'
import { TaskSchema } from '../schemas/tasks'
import { ITask } from '../types/tasks'

const TaskModel: Model<ITask> = mongoose.model<ITask>('Task', TaskSchema)

class Tasks {
    constructor() {
        this.connectToDatabase()
    }

    async connectToDatabase() {
        const uri = process.env.MONGO_URL || ''
        try {
            const options = {} // Add any required options
            await mongoose.connect(uri, options)
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async getTasks() {
        const tasks = await TaskModel.find({}).exec()
        return tasks
    }

    async create(task: ITask) {
        const result = await TaskModel.create(task)
        console.log(result)
        return 'worked'
    }
}

export default Tasks
