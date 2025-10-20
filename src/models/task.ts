import mongoose, { Schema, Model } from 'mongoose'
import { ITaskDocument, TaskStatus } from '../types/task'

// TODO: Add compound indexes for common queries
// TODO: Add soft delete support (deletedAt field)
// TODO: Add task priority field (low, medium, high)
// TODO: Add due date field with reminders

const taskSchema = new Schema<ITaskDocument>(
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
