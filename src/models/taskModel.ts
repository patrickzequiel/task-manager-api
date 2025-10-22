import mongoose, { Schema, Model } from 'mongoose'
import { TaskStatus } from '../types/taskTypes'

// ⚠️ DEPRECATED: This model is no longer used.
// Tasks are now embedded within the User model.
// This file is kept for reference and potential data migration.
// TODO: Remove this file after migrating existing task data to user documents

interface ITaskDocument extends mongoose.Document {
    title: string
    description: string
    status: TaskStatus
    createdAt?: Date
    updatedAt?: Date
}

export const taskSchema = new Schema<ITaskDocument>(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            maxlength: [100, 'Title cannot exceed 100 characters'],
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true,
            maxlength: [500, 'Description cannot exceed 500 characters'],
        },
        status: {
            type: String,
            enum: Object.values(TaskStatus),
            default: TaskStatus.TODO,
        },
    },
    {
        timestamps: true,
        versionKey: false,
        collection: 'tasks',
    }
)

// Indexes for better query performance
taskSchema.index({ status: 1 })
taskSchema.index({ createdAt: -1 })

const TaskModel: Model<ITaskDocument> = mongoose.model<ITaskDocument>(
    'Task',
    taskSchema
)

export default TaskModel
