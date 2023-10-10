import mongoose from 'mongoose'
import { ITask } from '../types/tasks'

export const TaskSchema = new mongoose.Schema<ITask>({
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
})
